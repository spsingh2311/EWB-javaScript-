// Assignment 01: Variables and data types
"use strict";
const studentName = "Alice";
let studentAge = 25;
var isStudent = true;
const skills = ["JavaScript", "HTML", "CSS"];

function getVariableReport() {
  return [
    `Name: ${studentName}`,
    `Age: ${studentAge}`,
    `Is student: ${isStudent}`,
    `Type of name: ${typeof studentName}`,
    `Type of age: ${typeof studentAge}`,
    `Type of isStudent: ${typeof isStudent}`,
    `Skills: ${skills.join(", ")}`
  ];
}
if (typeof module !== "undefined" && module.exports) module.exports = { getVariableReport };
