// Assignment 06: Product objects and array methods
"use strict";
const sampleProducts = [
  { name: "Laptop", price: 800, tags: ["computer", "work"] },
  { name: "Mouse", price: 25, tags: ["accessory", "wireless"] },
  { name: "Keyboard", price: 45, tags: ["accessory", "typing"] }
];
function getProductReport(products = sampleProducts) {
  const all = [];
  products.forEach(p => all.push(`${p.name}: $${p.price}`));
  const affordable = products.filter(p => p.price < 50).map(p => p.name);
  const uppercaseTags = products.map(p => ({ name: p.name, tags: p.tags.map(t => t.toUpperCase()) }));
  return { all, affordable, uppercaseTags };
}
if (typeof module !== "undefined" && module.exports) module.exports = { sampleProducts, getProductReport };
