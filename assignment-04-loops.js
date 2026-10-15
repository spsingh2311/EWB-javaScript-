// Assignment 04: Loops, break and continue
"use strict";
function multiplicationTable(number = 5, limit = 5) {
  const lines = [];
  for (let i = 1; i <= limit; i++) lines.push(`${number} x ${i} = ${number * i}`);
  return lines;
}
function firstDivisibleBySixOverTen() {
  let n = 1;
  while (true) {
    n++;
    if (n > 10 && n % 6 === 0) break;
  }
  return n;
}
function doWhileContinueDemo(limit = 5) {
  const values = [];
  let i = 0;
  do { i++; if (i === 3) continue; values.push(i); } while (i < limit);
  return values;
}
if (typeof module !== "undefined" && module.exports) module.exports = { multiplicationTable, firstDivisibleBySixOverTen, doWhileContinueDemo };
