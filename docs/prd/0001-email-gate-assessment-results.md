# Email-gate the assessment results

## Problem Statement

A user completes the seven-question assessment, gets their archetype and dimension breakdown on screen, and then has nothing to take away. If they close the tab they lose the result; if they want to revisit it they have to retake the quiz. The bonus Road to Financial Freedom PDF is offered as an optional side-trade, so most completers leave without giving their email, without a durable record of their result, and with no path back to it.

## Solution

After answering the last question, the user lands on the results page and sees an immediate archetype reveal — the icon, name, and one-line headline of their archetype. To unlock the full breakdown (radial gauge, overall score, dimension radar, dimension breakdown, insights, share card, and the secondary CTA), they enter their email. The submit also tags them in the ESP, which fires a welcome email containing two things: a personalised "View your results" link back to their own result page (with a token that skips the gate on the device they read the email on), and the Road to Financial Freedom bonus PDF. A separately-presented checkbox lets them also subscribe to Investor's Daily; ticking it isn't required to receive the welcome email or unlock the results. A user who has already submitted an email on this device skips the gate automatically on every subsequent visit.

## User Stories

1. As a quiz-completer, I want to see my archetype name and headline the moment I finish the assessment, so that I get the emotional payoff of completing it.
2. As a quiz-completer, I want it to be obvious what unlocks the rest of my result, so that I'm not confused about why parts of the page are missing.
3. As a quiz-completer, I want to enter my email and immediately see my full breakdown, so that I get what I was promised in exchange.
4. As a quiz-completer, I want a copy of my result delivered to my inbox, so that I have a durable record I can return to days later.
5. As a quiz-completer, I want the welcome email to include a link back to my own personalised result, so that I can revisit the dimension breakdown and insights without retaking the quiz.
6. As a quiz-completer, I want the Road to Financial Freedom bonus PDF to arrive in the same email, so that I'm not asked for my email a second time for the bonus.
7. As a quiz-completer, I want the option to subscribe to Investor's Daily during email submission, so that I can opt in to ongoing content from Southbank if I want it.
8. As a quiz-completer who doesn't want Investor's Daily, I want to be able to untick the box and still unlock my results, so that the gate isn't tied to a marketing commitment.
9. As a quiz-completer on a flaky connection, I want a clear submitting state and a disabled submit button while in flight, so that I don't double-submit my email.
10. As a quiz-completer whose submission fails because the email service has a hiccup, I want a clear error message and the ability to retry without re-entering everything, so that the failure isn't punishing.
11. As a returning user on the same device, I want to skip the email step on subsequent visits, so that I'm not re-asked for an email I already gave.
12. As a user clicking the "View your results" link in my welcome email on a different device than where I took the quiz, I want to see my full results without re-entering my email, so that the email's promise is honoured across devices.
13. As a recipient of a shared `/results` link from a friend, I want to see what archetype they got and be invited to take the quiz myself, so that the share path is viral.
14. As a user reviewing the Investor's Daily opt-in copy, I want it clearly labelled as a separate marketing choice, so that I can make an informed decision and untick if I disagree.
15. As a screen-reader user, I want the gate to be reachable in the tab order, errors to be announced, and the unlocked content to be perceivable after a successful submission, so that the experience is accessible.
16. As a quiz-completer who enters an invalid email format, I want validation feedback before submit, so that I'm not surprised by a server-side rejection.
17. As a quiz-completer, I want my submitted email to be treated privately and only used per my consent, so that I can trust the brand.
18. As a quiz-completer who has unlocked their results, I want to retake the assessment without re-entering my email when I return to the gate, so that experimenting with the quiz is friction-free.
19. As a quiz-completer on a Southbank white-label surface (different active brand), I want the gate's copy and styling to follow the active brand, so that nothing looks off-brand.
20. As a marketing operator at Southbank, I want every assessment-completer who submits the gate to be tagged in our ESP with their archetype, so that we can segment future campaigns by risk profile.
21. As a marketing operator, I want each lead's personalised results URL to be available as a merge field in the welcome email template, so that the "View your results" link lands them on their own result.
22. As a developer maintaining the codebase, I want the gate logic isolated in one component with a clear contract, so that the rest of the results page stays focused on rendering content.
23. As a developer reading the unlock-token code, I want it obviously not a security boundary, so that I don't accidentally treat it as authentication when adding future features.

## Implementation Decisions

- **Result Gate is the lifting of the existing EmailCapture into a self-contained gating component.** It owns the email input, the pre-checked Investor's Daily opt-in tickbox, client-side validation, the submit call to `/api/subscribe`, the submitting / success / error states, and the "block on error, retry possible" behaviour. Inputs to the component: the current archetype ID and the URL-encoded result string. On a successful submit it flips the store's `emailSubmitted` flag.

- **ProfileCard is split into a headline portion and a score portion.** The headline portion (archetype icon, archetype name, headline copy) renders unconditionally above the gate so the completion reveal is preserved. The score portion (radial gauge, animated overall numeric score) renders behind the gate. The split is semantic — these two halves now belong to different visibility tiers — not cosmetic.

- **The `/results` page becomes a conditional layout.** Render order: headline portion → Result Gate (when not unlocked) → score portion → DimensionRadar → DimensionBreakdown → Insights → email-bonus block (now reframed as part of the unlocked page rather than the gate itself) → secondary CTA → ShareCard → retake → disclaimer. Everything from the score portion onwards is hidden when the gate is active.

- **The Zustand store gains one new mutator: `markUnlockedViaToken()`.** Sets `emailSubmitted = true` without touching `submittedEmail`. Distinct from the existing `markEmailSubmitted(email)` so the two unlock paths are legible. `reset()` continues to clear both. Persistence (`partialize`) is unchanged.

- **The `?unlock=1` query param is the cross-device bypass.** The welcome email's results link includes it. On first arrival, the `/results` page reads it, calls `markUnlockedViaToken()`, and immediately strips the param from the URL via `history.replaceState` so reloading or sharing the URL doesn't propagate the token. The token is not authentication — the encoded result payload is already in the URL — purely a convenience flag.

- **`/api/subscribe` accepts a new `encodedResult` string field in the request body.** It's forwarded to each ESP as a per-provider merge or custom field alongside the existing `archetype`: Mailchimp adds `RESULT` to `merge_fields`, ConvertKit adds `result` to `fields`, Beehiiv adds a `result` entry to `custom_fields`. The webhook and Investor's Daily fall-throughs are unchanged. Validation: same length-cap pattern as the existing string fields; no schema validation beyond presence.

- **The ESP welcome-email template work is outside this codebase.** The template author (whoever owns Mailchimp/ConvertKit/Beehiiv configuration) adds a "View your results" button using the new merge tag — `https://<host>/results?r={{RESULT}}&unlock=1`. This PR ships the codebase plumbing; the template change is a separate operational task.

- **The Investor's Daily opt-in tickbox is pre-checked by default.** This reverses the prior in-code stance documented in `EmailCapture.tsx`. Recorded explicitly in ADR-0002 with the UK PECR/GDPR caveat. Reverting the default is a single-line change if legal sign-off lands differently.

- **Result Gate copy leads with the results, not the bonus.** The primary headline is the archetype-specific result, the input prompt invites the user to "see the rest of your profile" (or similar), and the Road to Financial Freedom bonus is reframed as a secondary inclusion ("you'll also receive ...") rather than the primary offer.

- **The gate blocks the user on `/api/subscribe` failure.** Mirrors the current EmailCapture pattern: error state surfaces the message, gate stays up, retry is enabled. No unlock-on-failure escape hatch. ESP downtime is now a critical-path issue and worth monitoring.

- **No new infrastructure.** No transactional email sender, no database, no per-user PDF generation, no object storage. The personalised content lives in the URL; the static bonus PDF is already hosted on Southbank's server.

- **Brand-aware styling continues to flow through the existing `brand-config` tokens.** The gate inherits the active brand's accent colour, text variables, and any brand-specific copy hooks added on the way.

## Testing Decisions

- **A good test exercises observable behaviour at the module's external boundary** — what the consumer sees when they call the module — not internal state transitions or implementation details. For a Zustand store, that means asserting state-after-action, not which set call ran. For an API route, that means asserting the outbound request shape, not the internal helper that built it. For a component, that means asserting what the user can see and interact with, not which hooks fired.

- **No tests are added in this PR.** The project currently has no test framework configured (`package.json` has no Vitest, Jest, React Testing Library, or Playwright dependencies). Introducing one is its own decision — framework choice, CI wiring, naming and structure conventions — and the team has chosen to defer it. The change is manually verifiable in the dev server.

- **Manual verification posture for this PR:** complete the assessment end-to-end with the dev server running; confirm only the archetype icon, name, and headline are visible on `/results` before submission; confirm submitting the form with a valid email unlocks the score, radar, breakdown, insights, share card, and CTA; confirm `/api/subscribe` is called with the new `encodedResult` field in the network panel; confirm an intentional ESP error (e.g. invalid Mailchimp key) keeps the gate up with the error visible; confirm a same-device reload of `/results` skips the gate; confirm appending `&unlock=1` to a fresh `/results?r=…` URL unlocks immediately and the param is stripped from the address bar.

- **Prior art:** none. The first test-introducing PR — whenever it lands — should target `/api/subscribe` (provider-forwarding behaviour) and `useAssessment` (state transitions including `markUnlockedViaToken`) first, as the most logic-dense surfaces in the project.

## Out of Scope

- The tracking event for "user submitted the gate" — explicitly a separate PR per the original brief.
- Authoring or designing a new PDF asset — the existing Road to Financial Freedom is reused without changes.
- ESP welcome-email template changes (the "View your results" button copy, layout, and merge-tag wiring) — happens in each ESP's dashboard, not in code.
- Adding a transactional email sender (SendGrid / Postmark / Resend / Mandrill).
- Server-side persistence of assessment results or leads (no database).
- Authentication or any real access control beyond the convenience-flag `?unlock=1` token.
- Per-user PDF generation. The PDF stays static.
- Introducing a test framework.
- A/B testing of the gate's visible-content scope (archetype-headline vs hard wall vs blurred preview). The chosen variant ships; the rejected alternatives are recorded in ADR-0002 for future iteration.
- Decoupling the Investor's Daily opt-in from the welcome-email PDF flow — they remain on the same surface.

## Further Notes

- **ADR-0002** records the architectural decision, the four rejected alternatives (mandatory opt-in, hard wall, transactional sender, server-side claim), and the consequence flags. Read it before changing the gate's scope, the opt-in tickbox default, or the unlock-token model.
- **`CONTEXT.md`** has been updated with the new vocabulary — **Result Gate**, **Unlock Token**, **Welcome Email** — and an existing ambiguity note ("email-gated account") has been tightened. Use these terms consistently in code, copy, and review comments.
- **The pre-checked Investor's Daily opt-in is a deliberate reversal of the previously documented in-code stance.** The PR description should call this out so reviewers see it, and the team should confirm legal sign-off on the consent stance under UK PECR/GDPR.
- **The gate becomes the team's only lead-capture surface for assessment-completers.** Previously, lead capture was a side-effect of the bonus block; now it's the primary mechanism. Watch `/api/subscribe` error rates and ESP availability post-launch — outages affect the user's primary experience, not just a bonus.
- **Completion-bounce at the gate is the headline metric to watch post-launch.** If it spikes, the visible-above-the-gate content (the archetype name and headline copy) is the cheapest lever before relaxing the gate scope itself.
