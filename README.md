# Advent of Code 2021

Finally, on day 9, I have a minute to write some things down.

Last year I started off in Julia and lasted until Day 4 I think... it was kind of the same this year. Except not with Julia.

I decided to try using JavaScript this year, partly because I've been addicted to Daniel Shiffman's awesome [Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw) videos, which mostly use the p5 JavaScript library for dynamic graphics in the browser. I know AoC puzzles can often be visualized, and I'd love to do more science that way too, so I thought it'd be fun to try.

But! Although I've stuck it out longer than Julia, I have just not had quality time for AoC this year, especially as the JS solutions take me at least twice as long as in Python (even though I'm using NumPy etc this year, something I don't normally do). Hence taking until Day 9 to even put anything on GitHub...

## Notes

- **Day 1** &mdash; I really like arrow functions (lambdas basically) in JavaScript: a nice way to do the discrete derivative. Wrote my own convolution function for part 2, then chipped away at it over a few days to mimic NumPy's `convolve()`. Didn't even use convlution in the Python solution, which was barely more than a couple of lines of code per problem.
- **Day 2** &mdash; Started making a `submarine` class then dumped it and just solved directly. Feels like there should be a nice way to generalize it, but left it at two clunky loops with lots of if/elif. Much terser in Python, with the old complex-numbers-as-coordinates trick.
- **Day 3** &mdash; One of those binary ones. Quite good fun, lots of arrow functions again. I was so infected with them that my Python solution today has 7 one-line functions (and is therefore super-hard to follow!).
- **Day 4** &mdash; I didn't even think about trying this in JS, although I'm sure some nice visualizations would be possible. Just wanted the comfort of NumPy, with the boards a single 3D array.
- **Day 5** &mdash; Back to JS, and quite pleased with a solution that passes the tests but produces wrong answers: compute the Chebyshev (L-infinity) distance between each pair of points, and then do linear interpolation to get the points on the line. So reverted to ugliness and got it working eventually.
- **Day 6** &mdash; Could see where this was going: one of those computationally intractable exponential functions. Have a feeling there's a clever analytic solution, and tried something with factorials, but Part 2 might be beyond me. Have not tried Part 2 in Python.
- **Day 7** &mdash; Python: a one-liner for Part 1, and what I thought was a cunning use of outer-subtraction for part 2. No time to do today in JS.
- **Day 8** &mdash; Part 1 was straightforward, Part 2 seems quite tricky. I like the idea of it, but staring at it for 10 minutes didn't get me much past knowing a few of the digits. Have not really tried putting code on paper.
- **Day 9** &mdash; I liked this one, although it's quite a quick one if you allow yourself to use image processing tools. Could immediately see a solution in Python (using `scipy.ndimage`) so went straight to it. Have not tried in JavaScript... Part 1 will be simple enough, Part 2 a little fiddly.

No time over the weekend, so here I am on Monday, late as usual.

- **Day 13** &mdash; I really liked this one. Thought about affine transforms, as I've been using those a bit lately. Then I thought about just computing the new position of every point. But in the end went for slicing and flipping NumPy arrays. Part 2 was the easiest so far, thank goodness.
