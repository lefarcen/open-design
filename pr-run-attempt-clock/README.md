Screenshots for open-design PR "fix(runs): measure the elapsed clock per attempt, not per run".

Both captured from the same scenario (attempt 0 stalls and is automatically
retried, attempt 1 runs normally) at the same point in the run:

- before-main.png — origin/main: the clock reads the cumulative time.
- after-fix.png   — fix branch: the clock reads the current attempt, with the
                    attempt number and cumulative time as secondary info.
