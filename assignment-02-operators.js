// Assignment 02: Tip calculator
"use strict";
function calculateBill(subtotal, tipPercent) {
  const bill = Number(subtotal), tip = Number(tipPercent);
  if (!Number.isFinite(bill) || bill < 0) throw new Error("Subtotal must be a non-negative number.");
  if (!Number.isFinite(tip) || tip < 0 || tip > 100) throw new Error("Tip percentage must be between 0 and 100.");
  const tipAmount = bill * tip / 100;
  return { subtotal: bill, tipPercent: tip, tipAmount, total: bill + tipAmount };
}
function formatMoney(value) { return `$${value.toFixed(2)}`; }
if (typeof module !== "undefined" && module.exports) module.exports = { calculateBill, formatMoney };
