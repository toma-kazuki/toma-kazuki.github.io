# habitat-dx — final presentation direction

**Date:** 2026-11-03
**Status:** Agreed storyline for the conference talk. Slides are to be renewed to match this file; current slide wording is not binding.
**Supersedes:** the RQ1/RQ2/RQ3 framing in `c03-objective.html` and `b2-validation-plan.html`, and the takeaway in `c11-synthesis.html`.

---

## 1. Primary claim

Full autonomy for a future space habitat requires **separately developed modules to be integrated into one end-to-end anomaly responder**. Whether such a responder works is a property of the integration, not of any single module.

The talk leads with the **scientific question** (section 2). habitat-dx is the **evaluation method** that makes the question answerable: a closed loop decomposed into replaceable modules, plus a protocol for comparing module combinations end to end. Current results answer the question partially; the talk says so openly rather than shrinking the question.

"Evaluation method" means **testbed + protocol**, not software alone:

- **Testbed:** six modular stages, a coordinator that schedules stages (stages never call each other), stage methods selected by JSON combination, HERA-31 scenarios, a ground-truth referee.
- **Protocol:** what is held fixed, what is swapped, which metrics are primary (end-to-end) and which are explanatory (stage-local), how combinations are screened and compared (section 5).

## 2. Research question

**Lead question:**

> How do the quality and timing of the information an autonomous habitat generates, and the policy that decides when and what to act on, jointly determine whether — and how fast — an anomaly is resolved without humans?

**Sub-questions:**

| | Sub-question | Factors swapped |
|---|---|---|
| SQ1 | Do gains at one stage (faster detection, more accurate diagnosis) carry through to end-to-end outcomes? | Detector, diagnosis pipeline |
| SQ2 | Given the same information, how do the gate (*when* to act) and the ordering (*what* to try first) trade speed against wrong actions? | Gate, ordering |
| SQ3 | Which combinations fail to close the loop, exposing where human reasoning is still needed? | All |

Mapping from the old framing: old RQ1 (agent interaction) becomes SQ1 + SQ2; old RQ2 (autonomy / human intervention) becomes SQ3, measured quantitatively as loop closure; old RQ3 (compare methods) becomes the *means*, not a question.

## 3. Problem statement

1. **Need.** Deep-space habitats must turn telemetry into consequential recovery actions without continuous crew or ground supervision (dormancy, communication delay). ISS-style supervision does not scale.
2. **Knowledge gap.** Detection, diagnosis and recovery methods are developed and scored in isolation with stage-local metrics (detection F1, diagnosis accuracy, recovery success given the true fault). How information quality and timing combine with a decision policy to determine whether a fault is actually resolved — or whether the loop closes at all — is unknown.
3. **Capability gap.** No testbed closes the loop while allowing one information or decision component to be swapped with everything else held fixed.

Point 2 is the gap the talk leads with. Point 3 is why habitat-dx exists.

## 4. Proposed method

- **Architecture as a hypothesis.** An autonomous responder decomposes into information-generating stages (detection, hypothesis generation, evaluation, prognosis), a decision stage, and execution. Daphne-AT, PRIDE and CRAFTSMAN are the source of this decomposition.
- **habitat-dx puts it into practice** as a closed loop: detection → hypothesis generation → evaluation → prognosis → decision → execution → verification from telemetry → fault removed or not.
- **Decision-making carries the autonomy.** The decision stage encodes *when* to act (gate: `none`, `timed`, `confidence`, `confidence-smoothed`), *what* to act on (ordering: P/T, Highest P, Shortest T, Random), and *based on which information* (evaluator score distribution; alarm levels during verification; eliminate and re-rank on failure).
- **Execution is a surrogate** for what the robotics agent and crew would do. This is a design choice, not a missing piece: it removes physical-execution complexity so that differences come only from information generation and decision-making.
- **Ground truth is used only by the referee.** Agents act on what they observe; timing gates anchor to first detection, never to injection time.

"Closed" means: the fault is removed only when the decision stage chooses a procedure that addresses the true fault, and the agent itself verifies resolution from telemetry.

### Surrogate assumptions (locked)

| Assumption | Rationale |
|---|---|
| Correct procedure always succeeds (reliability 1.0) | Execution reliability is not the focus; keeps "which fault was targeted" as the sole determinant of success |
| Duration fixed at the KG catalog ETR | No downstream cognitive stage reasons about duration variance, so varying it adds noise, not insight |
| Wrong procedure costs time only | Matches what was observed in human-subject experiments |
| Verification is alarm-based (60 s window) | Adequate for now; detailed resolution judgment is future work |
| Agents never see ground truth | Prevents information leakage |

Operator approval and robotic inspection feedback are **not** part of this talk's loop. They are abstracted by the decision stage and the execution surrogate respectively. Future work may raise the surrogate's fidelity.

## 5. Validation method

### Factor grid

| Factor | Levels |
|---|---|
| Detector | threshold limits · LSTM-binary (60 s × 68; symptoms stay threshold-sourced, so this factor changes *when* diagnosis triggers, not *what* it sees) |
| Diagnosis pipeline (hypothesis generation + evaluation, paired) | KG + cardinality · HSS31 + TS-single · HSS31 + TS-multi · Bayes + Bayes |
| Gate | none · timed (60 s) · confidence · confidence-smoothed |
| Ordering | P/T · Highest P · Shortest T · Random (5 seeds) |

The grid is 2 × 4 × 4 × 4 = 128 combinations (256 runs including Random seeds), each over 31 scenarios. Every combination uses one shared protocol: the same injection time, time horizon, dt and scenario set. The current split between studies (inject 80 s / scripted recovery at 180 s for detection and diagnosis; inject 20 s / 3600 s closed loop for recovery) is retired.

**Reference chain:** threshold → KG + cardinality → timed → P/T, which matches the current deck. It appears on every phase 2 figure.

### Phase 1 — screening: does the loop close?

Every scenario run ends in exactly one terminal outcome (the **loop-closure funnel**):

1. Never detected
2. Detected, but never acted (gate never opened)
3. Acted, but not recovered within the horizon
4. Recovered after wrong procedures
5. Recovered on the first procedure

**Closure rate** = share of the 31 scenarios ending in outcome 4 or 5. Outcomes 1–3 are where human reasoning would still be needed (SQ3).

**Figures:**

- Closure heatmap: rows = detector × diagnosis pipeline (8); columns = gate × ordering (16); cell = closure rate.
- Funnel bars for representative failing combinations, showing where each breaks. Funnel position points to the bottleneck stage: outcome 1 = detection, outcome 2 = evaluator–gate pairing, outcome 3 = evaluator–ordering pairing or horizon.

### Down-selection

A closure-rate threshold selects the combinations that go to phase 2. The value is decided later, subject to these rules:

- Fix it before inspecting the heatmap, or tie it to a stated requirement (e.g. "resolves ≥ 90 % of faults autonomously").
- Show robustness: mark which combinations pass at several thresholds (e.g. 80 / 90 / 100 %).
- Avoid survivorship bias: report phase 2 metrics both over all 31 scenarios (unresolved counted as censored at the horizon) and over the scenarios every finalist resolved.

### Phase 2 — system-level comparison of survivors

**Metrics:**

- Time to resolution (from injection, measured by the referee)
- Wrong procedures attempted
- First-try rate
- Time decomposition: detection latency → gate wait (diagnosis-to-action) → time on wrong procedures → correct procedure ETR

**Phase 2 size is decided after phase 1**, together with the visualization:

| Survivors | Presentation |
|---|---|
| Few (≲ 6) | Every finalist shown: stacked time-decomposition bars, Pareto plot (time to resolution vs wrong procedures), scenario × finalist matrix |
| Moderate (≈ 7–20) | One Pareto scatter with factors encoded (color = diagnosis pipeline, marker = gate, label = ordering); frontier highlighted; decomposition bars for frontier + reference chain only |
| Many (≳ 20) | Factor-effect and interaction plots (e.g. mean time to resolution by gate, one line per diagnosis pipeline; crossing lines = interaction) instead of listing combinations |

### Role of stage-local metrics

Current detection, diagnosis and recovery results (c08–c10) become **attribution evidence**: they explain why a combination ranks where it does end to end (e.g. TS-multi's 0 wrong diagnoses → no wrong-procedure time). They are not the scoreboard.

## 6. Case study — HERA-31

**Why HERA:**

- A real analog habitat: 68 telemetry parameters with caution / warning limits; 31 life-support anomaly scenarios across CO₂ removal, O₂ generation, fans / TCCS, fuel cells and power, water pressure and leaks, trace contaminants.
- A procedure catalog with ETR in the knowledge graph, giving the execution surrogate a grounded time cost.
- Continuity with Daphne-AT human-subject experiments, where wrong procedures were observed to cost time.

**What it cannot claim:**

- **Same generator for training and test.** Telemetry is deterministic linear ramps; the LSTM and time-series templates come from the same family. Absolute detection and diagnosis performance is optimistic.
- **Single fault per scenario.** No cascades, no concurrent faults.
- **Small sample (31).** Report counts and distributions, not significance claims; seeds only where the method itself is stochastic.
- **Surrogate execution.** Physical execution risk is out of scope by design.

**Claim boundary:** relative comparisons and interaction structure only.
**One-liner:** HERA-31 grounds the loop in a real habitat's telemetry and procedures; it supports comparing combinations, not certifying them.

## 7. Results → research question mapping

The talk sentences below are **hypotheses until phase 1 and phase 2 run**. If the data disagrees, the lead question stays and the sentences change.

| Question | Answered by | Talk sentence it supports |
|---|---|---|
| SQ3 | Phase 1 closure heatmap + funnel bars | "Some combinations never close the loop; *where* they break shows what human reasoning still supplies." |
| SQ1 | Phase 2 time decomposition (does the LSTM's detection advantage survive end to end?); stage-local vs end-to-end rank comparison | "Faster or more accurate stages don't automatically make a better responder." |
| SQ2 | Phase 2 Pareto plot; interaction plots if many survivors | "Gate and ordering trade speed against wrong actions, and the trade depends on the information quality behind them." |
| Lead question | All of the above | "Anomaly resolution is determined by the information–decision coupling, not by any single stage." |
| Attribution | Current c08–c10 stage-local results | Why a combination ranks where it does |

Expectation to test, not assume: ETRs are on the order of minutes, while the LSTM gains seconds at detection, so the detection advantage may nearly vanish end to end while gate wait and wrong procedures dominate.

## 8. Implications for slides

| Slide | Action |
|---|---|
| `c01-title` | Keep; consider a title that names the information–decision question |
| `c02-motivation` | Keep the need (dormancy, delay, ISS won't scale). Reframe the agent bullets as "separately developed modules that must be integrated" |
| `c03-objective` | **Rewrite:** lead question + SQ1–SQ3; habitat-dx named as the evaluation method |
| `c04-architecture` | Keep as the source of the decomposition. The robot–diagnosis bidirectional feedback becomes future work, not a current claim |
| `c05-framework` | Keep the six stages. Group them as information stages / decision stage / surrogate execution. Remove the dashed robotics arrow (or mark it future). Add the "closed" definition and one line of surrogate assumptions |
| `c06-sandbox` | Keep HERA; add the claim boundary line (relative comparison only) |
| `c07-studies` | **Replace** with the validation design: factor grid, two phases, loop-closure funnel |
| `c08`–`c10` | **Demote** to attribution: compress into one "stage-local view" slide, or move to backup |
| New | Phase 1 result: closure heatmap + funnel (SQ3) |
| New | Phase 2 result: format depends on survivor count (SQ1, SQ2) |
| `c11-synthesis` | **Rewrite** around the information–decision coupling; drop "operator + robotics in the closed loop" as an open item; open items become hold-out generator, higher-fidelity execution surrogate, resolution judgment |
| `b2-validation-plan` | **Rewrite** to match section 5 |
| `29-conclusion` (legacy) | Leave as legacy; not used in the conference deck |

## 9. Open items before renewing slides

1. Build the factor grid and a single shared protocol (injection time, horizon, dt).
2. Implement terminal-outcome classification (funnel outcomes 1–5) and the time decomposition in the analysis layer.
3. Run phase 1. Runtime is dominated by the diagnosis pipeline. Timing on 31 scenarios, 3600 s horizon, dt = 1 s, one process each:
   - `kg-priority` (closed loop): 237 s
   - `lstm-binary-kg-open` (LSTM detection + KG): 241 s, so the LSTM adds little
   - `physics-based-multi` (TS-multi, fault never removed): ≈ 5.5 min per scenario, ≈ 2.8 h per combination. This is a worst case: in closed-loop runs the fault is removed after recovery, which should shorten evaluation, but that is not yet measured

   With 64 of the 128 combinations using a time-series pipeline, the grid needs process-level parallelism, caching of evaluator work across combinations that share detector + diagnosis pipeline, or a shorter horizon justified by the procedure ETRs.
4. Fix the closure threshold (rules in section 5), then run phase 2 and choose its visualization.
5. Renew slides per section 8.
