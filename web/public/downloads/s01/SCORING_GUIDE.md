# BuildArena S01 scorer

Lightweight scoring runtime with fixed configurations. No tests, examples, participant
submissions, conversations, evidence or saved results are included. Input/review files
are empty templates, not approvals. Supply your own complete inputs to calculate scores.

## Setup and run

Use Python 3.12 or newer:

```sh
python -m pip install -r requirements.txt
python score.py --help
python score.py --input MY_INPUTS --rebuild-source PATH_TO_OFFICIAL_S01_V2_0_1
```

Keep independent submission folders in `MY_INPUTS`, plus `projects_index.json`:

```json
[{"directory":"my_submission","team_name":"My team","project_title":"My machine","writeup_url":""}]
```

Each submission needs its machine BSG, build history, full history, process text and
Tracker trajectory. Resolve ambiguous artifact roles in `rules/bindings.json`.
Declare Autopilot in `rules/modes.csv`; undeclared mode defaults to Copilot.

Reconstruction needs the official S01 v2.0.1 builder (commit
`fc5ef3bd6be30a69bb7bc7b0c1f2b53ea794ddbc`), its dependencies and game mesh/collider
assets, matching `rules/release.json`. Once valid reconstruction evidence exists,
omit `--rebuild-source`. Missing evidence does not pass validation.

Results: `results/corrected/result.json` and `results/corrected/index.html`.
An empty input produces an empty ranking, not the competition leaderboard.
`python score.py --input MY_INPUTS --verify` checks saved results; it does not
re-extract trajectories. Ordinary scoring reads telemetry without launching Besiege.

RAR inputs need native libarchive (set `LIBARCHIVE` if needed). tiktoken may fetch
tokenizer data on first use. Preserve frozen configuration bytes and line endings;
their SHA-256 hashes are checked automatically. Do not run with Python `-O`.
