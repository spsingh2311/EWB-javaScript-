// Assignment 03: Conditionals and grade evaluation
"use strict";
function evaluateScore(score) {
  const n = Number(score);
  if (!Number.isFinite(n) || n < 0 || n > 100) throw new Error("Score must be between 0 and 100.");
  let message;
  if (n >= 90) message = "Excellent";
  else if (n >= 80) message = "Very good";
  else if (n >= 70) message = "Good";
  else if (n >= 60) message = "Keep practising";
  else message = "Needs improvement";
  let grade;
  switch (true) {
    case n >= 90: grade = "A"; break;
    case n >= 80: grade = "B"; break;
    case n >= 70: grade = "C"; break;
    case n >= 60: grade = "D"; break;
    default: grade = "F";
  }
  return { score: n, message, grade, result: n >= 40 ? "Passed" : "Failed" };
}
if (typeof module !== "undefined" && module.exports) module.exports = { evaluateScore };
