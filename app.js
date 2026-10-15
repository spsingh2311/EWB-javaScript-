// Interactive Product Inventory & Analytics Dashboard
// All data is kept in memory; refreshing the page restores the demo inventory.

"use strict";

const initialProducts = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Mouse", price: 25 }
];
let products = initialProducts.map(product => ({ ...product }));
let nextId = 3;
let currentFilter = "all";

const form = document.querySelector("#product-form");
const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const message = document.querySelector("#message");
const searchInput = document.querySelector("#search");
const inventoryBody = document.querySelector("#inventory-body");
const emptyState = document.querySelector("#empty-state");
const report = document.querySelector("#report");

// A switch statement assigns a category based on an if...else threshold check.
function getCategory(price) {
  if (price < 50) return "Budget";
  if (price < 200) return "Standard";
  let category;
  switch (true) {
    case price >= 200:
      category = "Premium";
      break;
    default:
      category = "Standard";
  }
  return category;
}

// Regular function with default parameters.
function calculateTax(amount, rate = 0.08) {
  return amount * rate;
}

// Arrow function with a default discount rate.
const applyDiscount = (amount, rate = 0.10) => amount * (1 - rate);

// Arrow function: reduce() totals the inventory value.
const getInventoryValue = (items = products) =>
  items.reduce((total, item) => total + item.price, 0);

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function getVisibleProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = products;
  if (currentFilter === "affordable") {
    visible = visible.filter(product => product.price < 200);
  }
  if (query) {
    visible = visible.filter(product => product.name.toLowerCase().includes(query));
  }
  return visible;
}

function renderInventory() {
  const visibleProducts = getVisibleProducts();
  inventoryBody.replaceChildren();

  // Loop and continue demonstrate flow control for invalid roster entries.
  for (const product of visibleProducts) {
    if (!product || typeof product.name !== "string") continue;
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");

    nameCell.textContent = product.name;
    priceCell.textContent = formatMoney(product.price);
    const categoryBadge = document.createElement("span");
    categoryBadge.className = "badge";
    categoryBadge.textContent = getCategory(product.price);
    categoryCell.append(categoryBadge);

    removeButton.type = "button";
    removeButton.className = "secondary";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${product.name}`);
    removeButton.addEventListener("click", () => {
      products = products.filter(item => item.id !== product.id);
      message.textContent = `${product.name} removed from inventory.`;
      message.className = "success";
      render();
    });
    actionCell.append(removeButton);
    row.append(nameCell, priceCell, categoryCell, actionCell);
    inventoryBody.append(row);
  }

  emptyState.hidden = visibleProducts.length > 0;
}

function renderAnalytics() {
  const total = getInventoryValue();
  document.querySelector("#product-count").textContent = String(products.length);
  document.querySelector("#total-value").textContent = formatMoney(total);
  document.querySelector("#tax-value").textContent = formatMoney(calculateTax(total));
  document.querySelector("#discount-value").textContent = formatMoney(applyDiscount(total));
}

function createReport(items = products) {
  const affordable = items.filter(product => product.price < 200);
  const formatted = items.map(product => `${product.name.toUpperCase()}: ${formatMoney(product.price)}`);
  const lines = [
    "--- Processing Inventory Roster (forEach) ---",
    ...items.map(product => `* Item: ${product.name} (${formatMoney(product.price)}) -> Category: ${getCategory(product.price)}`),
    "",
    "--- Financial Analytics ---",
    `Total Inventory Value: ${formatMoney(getInventoryValue(items))}`,
    `Filtered Affordable Items (Under $200): ${JSON.stringify(affordable.map(product => product.name))}`,
    `Formatted Report List: ${JSON.stringify(formatted)}`
  ];

  // Also use forEach() explicitly to print each product to the console.
  console.log("--- Processing Inventory Roster (forEach) ---");
  items.forEach(product => console.log(`* Item: ${product.name} (${formatMoney(product.price)}) -> Category: ${getCategory(product.price)}`));
  console.log("--- Financial Analytics ---");
  console.log(`Total Inventory Value: ${formatMoney(getInventoryValue(items))}`);
  console.log("Filtered Affordable Items (Under $200):", affordable.map(product => product.name));
  console.log("Formatted Report List:", formatted);
  return lines.join("\n");
}

function render() {
  renderInventory();
  renderAnalytics();
  if (report.textContent === "Reports will appear here.") {
    report.textContent = "Add a product or choose a report action to generate a summary.";
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const rawPrice = priceInput.value;
  const price = Number(rawPrice);

  if (!name) {
    message.textContent = "Please enter a product name.";
    message.className = "error";
    return;
  }
  if (rawPrice.trim() === "" || !Number.isFinite(price) || price <= 0) {
    message.textContent = "Please enter a valid price greater than zero.";
    message.className = "error";
    return;
  }

  // The loop checks for a duplicate name; break stops at the first match.
  let duplicate = false;
  for (const product of products) {
    if (product.name.toLowerCase() === name.toLowerCase()) {
      duplicate = true;
      break;
    }
  }
  if (duplicate) {
    message.textContent = "A product with this name already exists. Use a different name.";
    message.className = "error";
    return;
  }

  products.push({ id: nextId++, name, price });
  message.textContent = `${name} added successfully as ${getCategory(price)}.`;
  message.className = "success";
  form.reset();
  render();
});

searchInput.addEventListener("input", renderInventory);
document.querySelector("#show-affordable").addEventListener("click", () => {
  currentFilter = "affordable";
  report.textContent = createReport(products.filter(product => product.price < 200));
  renderInventory();
});
document.querySelector("#show-all").addEventListener("click", () => {
  currentFilter = "all";
  report.textContent = createReport(products);
  renderInventory();
});
document.querySelector("#console-demo").addEventListener("click", () => {
  // Match the PDF's example by adding Monitor at $150 if it is not already present.
  const monitorExists = products.some(product => product.name.toLowerCase() === "monitor");
  if (!monitorExists) products.push({ id: nextId++, name: "Monitor", price: 150 });
  currentFilter = "all";
  report.textContent = createReport(products);
  message.textContent = monitorExists
    ? "Console report printed using the current inventory."
    : "Demo Monitor ($150) added. Console report printed.";
  message.className = "success";
  render();
});
document.querySelector("#reset-button").addEventListener("click", () => {
  products = initialProducts.map(product => ({ ...product }));
  nextId = 3;
  currentFilter = "all";
  searchInput.value = "";
  message.textContent = "Demo inventory restored.";
  message.className = "success";
  render();
});

render();
