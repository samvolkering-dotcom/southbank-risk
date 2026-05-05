import { NextResponse } from "next/server";

interface SubscribeBody {
  email?: string;
  optInDaily?: boolean;
  archetype?: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: SubscribeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const optInDaily = Boolean(body.optInDaily);
  const archetype = (body.archetype ?? "").slice(0, 64);
  const source = (body.source ?? "risk-assessor").slice(0, 64);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }

  const provider = process.env.EMAIL_PROVIDER;

  try {
    if (provider === "mailchimp") {
      await sendToMailchimp({ email, optInDaily, archetype, source });
    } else if (provider === "convertkit") {
      await sendToConvertKit({ email, optInDaily, archetype, source });
    } else if (provider === "beehiiv") {
      await sendToBeehiiv({ email, optInDaily, archetype, source });
    } else if (provider === "webhook") {
      await sendToWebhook({ email, optInDaily, archetype, source });
    } else {
      // No provider configured yet — log so deploys don't lose leads silently.
      console.log("[subscribe] (no provider configured)", {
        email,
        optInDaily,
        archetype,
        source,
        at: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error("[subscribe] provider error", err);
    return NextResponse.json(
      { error: "Could not save your email. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

interface ProviderArgs {
  email: string;
  optInDaily: boolean;
  archetype: string;
  source: string;
}

async function sendToMailchimp({ email, optInDaily, archetype, source }: ProviderArgs) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const dailyTag = process.env.MAILCHIMP_DAILY_TAG ?? "investors-daily";
  const reportTag = process.env.MAILCHIMP_REPORT_TAG ?? "road-to-financial-freedom";
  if (!apiKey || !listId) throw new Error("Mailchimp env vars missing");

  const dc = apiKey.split("-")[1];
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const tags = [reportTag, `archetype-${archetype}`, `source-${source}`];
  if (optInDaily) tags.push(dailyTag);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      tags,
      merge_fields: { ARCHETYPE: archetype },
    }),
  });

  if (!res.ok && res.status !== 400) {
    // 400 often means "already subscribed" — treat as success
    throw new Error(`Mailchimp ${res.status}: ${await res.text()}`);
  }
}

async function sendToConvertKit({ email, optInDaily, archetype, source }: ProviderArgs) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const reportFormId = process.env.CONVERTKIT_REPORT_FORM_ID;
  const dailyFormId = process.env.CONVERTKIT_DAILY_FORM_ID;
  if (!apiKey || !reportFormId) throw new Error("ConvertKit env vars missing");

  const formIds = [reportFormId];
  if (optInDaily && dailyFormId) formIds.push(dailyFormId);

  await Promise.all(
    formIds.map((formId) =>
      fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          fields: { archetype, source },
        }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`ConvertKit ${r.status}: ${await r.text()}`);
      })
    )
  );
}

async function sendToBeehiiv({ email, optInDaily, archetype, source }: ProviderArgs) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) throw new Error("Beehiiv env vars missing");

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: source,
        custom_fields: [
          { name: "archetype", value: archetype },
          { name: "investors_daily_optin", value: optInDaily ? "true" : "false" },
        ],
      }),
    }
  );

  if (!res.ok) throw new Error(`Beehiiv ${res.status}: ${await res.text()}`);
}

async function sendToWebhook(args: ProviderArgs) {
  const url = process.env.SUBSCRIBE_WEBHOOK_URL;
  if (!url) throw new Error("SUBSCRIBE_WEBHOOK_URL missing");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });

  if (!res.ok) throw new Error(`Webhook ${res.status}: ${await res.text()}`);
}
