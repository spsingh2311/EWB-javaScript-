// Assignment 05: Functions and scope
"use strict";
function rectangleArea(width = 5, height = 4) {
  const w = Number(width), h = Number(height);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w < 0 || h < 0) throw new Error("Dimensions must be non-negative numbers.");
  return w * h;
}
const customRectangleArea = (width, height) => rectangleArea(width, height);
function demonstrateBlockScope() {
  if (true) { let blockVar = "I live inside this block"; }
  try { return blockVar; } catch (error) { return `${error.name}: blockVar is not accessible outside the block`; }
}
if (typeof module !== "undefined" && module.exports) module.exports = { rectangleArea, customRectangleArea, demonstrateBlockScope };
