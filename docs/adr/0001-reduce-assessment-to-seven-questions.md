# Reduce assessment to seven questions

To improve completion rate, we cut the assessment from 12 questions to 7 by dropping **Q4, Q7, Q10, Q11, and Q12**. The surviving questions are **Q1, Q2, Q3, Q5, Q6, Q8, Q9**, giving a dimension distribution of **Capacity 2 / Attitude 2 / Composure 2 / Need 1**. Need is deliberately the only dimension reduced to a single question; its band is hidden in the UI to avoid implying measured precision where none exists.

## Considered options

We hit "7 questions" three different ways before settling:

1. **Original proposal — cut Q4, Q6, Q7, Q9, Q10** (distribution 2/3/1/1). Rejected: leaves both Composure *and* Need at n=1. Composure is the most predictive dimension in a risk profile; dropping it to n=1 (and specifically losing Q6, the "markets crashed 15%, what do you do?" scenario) gives up too much signal for the asymmetric protection of Attitude.

2. **Cut Q4, Q12, Q6, Q9, Q10** (distribution 2/2/2/1, Need at n=1, **Q11 as Need's survivor**). Rejected: Q11 is a binary would-you-rather (values 3 or 9 only). With it as sole carrier of Need, the dimension's middle band ("On Track") becomes structurally unreachable — every user lands in either "Surplus" or "Significant Gap". Q9 is a 4-option scenario card that spans the full score range, so it carries Need more honestly.

3. **Chosen — cut Q4, Q7, Q10, Q11, Q12** (distribution 2/2/2/1, Need at n=1, **Q9 as Need's survivor**). Composure keeps Q6 (the crash-scenario behavioural question, the highest-signal question in the quiz) and Q8 (regret counterfactual). Attitude keeps Q3 (animated-chart) and Q5 (drag-allocate). Need's surviving Q9 can produce all three bands. The "calibration slot" Q12 is despite its name not special in scoring — dropping it is structurally safe.

## Consequences

- **Penalty rule sensitivity.** `scoring.ts:130` reduces the overall score when `attitude ≥ 7 && composure ≤ 4`. This was tuned for n=3 Composure; with n=2, a single low Composure answer moves the average more, so this penalty fires on more users. Threshold may need tuning (e.g. `composure ≤ 3.5`).
- **Need band hidden in the UI.** Because Need rests on a single answer, displaying it as `"7.0 / 10 ON TRACK"` would imply more measurement than exists. The Need dimension card on the results page renders the user's answer in plain language ("You said you have a meaningful gap to close") rather than a numeric score + band. The other three dimensions are unaffected.
- **Overall score still uses Need's numeric value (weighted 25%).** Hiding the band is a UI-only change; the scoring math is unchanged.
- **Randomisation pool shrinks.** Cut slots lose their variants entirely; surviving slots retain their two-variant randomisation.
