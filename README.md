This is a comparison of using emerging super fast tools vs defacto tools in our ecosystem.

The following setup hasn't been optimized in any way and it shows that we can have huge performance boosts by challenging the status quo.

I didn't do anything special here except collecting pieces of the puzzle. And all the credit goes to the brains behind these amazing projects:
- [esbuild](https://esbuild.github.io/) ±100x faster than other bundlers
- [uvu](https://github.com/lukeed/uvu) way faster and simpler (loc) but also less feature rich (that's one more feature) than other testing libraries
- [linkedom](https://github.com/WebReflection/linkedom) ±10x faster than JSDOM.

The fastest way to try this setup is through [repl.it](https://repl.it/@abdellah/linkedom-test)

Here are the detailed results of this benchmark without using npm:
## uvu + linkeDOM + esbuild
```
➜  linkedom-test git:(main) /usr/bin/time node_modules/.bin/uvu src/__tests__ -r esbuild-register
counter.tsx
• • • •   (4 / 4)

  Total:     4
  Passed:    4
  Skipped:   0
  Duration:  48.68ms

        0.34 real         0.27 user         0.07 sys
```

## jest + jsdom + babel
```
➜  linkedom-test git:(main) /usr/bin/time node_modules/.bin/jest
 PASS  src/__jest__tests__/counter.test.tsx
  TEST
    ✓ should render with "5" by default (31 ms)
    ✓ should accept custom `count` prop (9 ms)
    ✓ should increment count after `button#incr` click (22 ms)
    ✓ should decrement count after `button#decr` click (19 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.736 s, estimated 2 s
Ran all test suites.
        2.40 real         2.43 user         0.43 sys
```
Comparison table
|                          | Real (s) | User (s) | Sys (s)    |
|--------------------------|------|------|--------|
| Jest + jsdom + babel     | 2.40 | 0.40 | 0.43   |
| uvu + linkedom + esbuild | 0.34 | 0.27 | 0.04   |
| Comparison               | x7   | x1.4 | x10.75 |


These results are the best over 3 runs on a tired Macbook Air
```
MacBook Air (13-inch, Early 2015)
2.2 GHz Dual-Core Intel Core i7
8 GB 1600 MHz DDR3
```
