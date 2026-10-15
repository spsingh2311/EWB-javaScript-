// Product Inventory & Analytics Dashboard - vanilla JavaScript
"use strict";
(function () {
  const STORAGE_KEY = "satyam-js-inventory-v1";
  const DEFAULT_PRODUCTS = [
    { id: 1, name: "Laptop", category: "Electronics", price: 800, quantity: 1, sku: "EL-001", notes: "Work laptop" },
    { id: 2, name: "Mouse", category: "Accessories", price: 25, quantity: 2, sku: "AC-002", notes: "Wireless mouse" },
    { id: 3, name: "Keyboard", category: "Accessories", price: 45, quantity: 1, sku: "AC-003", notes: "Mechanical keyboard" }
  ];
  let products = loadProducts();
  let editingId = null;
  const $ = id => document.getElementById(id);
  const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value) || 0);
  const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const categoryForPrice = price => Number(price) < 50 ? "Budget" : Number(price) < 500 ? "Standard" : "Premium";
  function loadProducts() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_PRODUCTS.map(p => ({ ...p }));
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : DEFAULT_PRODUCTS.map(p => ({ ...p }));
    } catch (_) { return DEFAULT_PRODUCTS.map(p => ({ ...p })); }
  }
  function saveProducts() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); }
    catch (_) { showNotice("Could not save to browser storage. You can still use the current session.", "error"); }
  }
  function showNotice(message, type = "success") {
    const box = $("notice");
    box.textContent = message; box.className = `notice show ${type}`;
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => { box.className = "notice"; }, 3500);
  }
  function totals() {
    return products.reduce((acc, p) => {
      acc.units += Number(p.quantity) || 0;
      acc.value += (Number(p.price) || 0) * (Number(p.quantity) || 0);
      return acc;
    }, { units: 0, value: 0 });
  }
  function renderStats() {
    const t = totals();
    $("stat-products").textContent = products.length;
    $("stat-units").textContent = t.units;
    $("stat-value").textContent = money(t.value);
    $("stat-affordable").textContent = products.filter(p => Number(p.price) < 200).length;
  }
  function renderTable() {
    const query = $("search").value.trim().toLowerCase();
    const category = $("filter-category").value;
    const sort = $("sort-by").value;
    let visible = products.filter(p => {
      const matches = `${p.name} ${p.sku} ${p.category} ${p.notes || ""}`.toLowerCase().includes(query);
      return matches && (category === "all" || categoryForPrice(p.price) === category);
    });
    visible.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
    $("product-count").textContent = `${visible.length} shown`;
    if (!visible.length) {
      $("products-body").innerHTML = '<tr><td colspan="6"><div class="empty-state">No products match. Try another search or add a product.</div></td></tr>';
      return;
    }
    $("products-body").innerHTML = visible.map(p => {
      const tier = categoryForPrice(p.price);
      return `<tr><td><div class="product-name">${escapeHtml(p.name)}</div><div class="product-sku">${escapeHtml(p.sku || "NO-SKU")}</div></td><td>${escapeHtml(p.category)}</td><td><span class="pill pill-${tier.toLowerCase()}">${tier}</span></td><td>${money(p.price)}</td><td>${Number(p.quantity) || 0}</td><td><div class="row-actions"><button type="button" data-edit="${p.id}" aria-label="Edit ${escapeHtml(p.name)}">Edit</button><button type="button" data-delete="${p.id}" aria-label="Delete ${escapeHtml(p.name)}">Delete</button></div></td></tr>`;
    }).join("");
  }
  function renderAll() { renderStats(); renderTable(); }
  function resetForm() {
    $("product-form").reset(); $("product-id").value = ""; editingId = null;
    $("form-title").textContent = "Add a product"; $("save-button").textContent = "Add product";
    $("product-quantity").value = "1";
  }
  function handleSubmit(event) {
    event.preventDefault();
    const name = $("product-name").value.trim();
    const category = $("product-category").value;
    const price = Number($("product-price").value);
    const quantity = Number($("product-quantity").value);
    const sku = $("product-sku").value.trim();
    const notes = $("product-notes").value.trim();
    if (!name) return showNotice("Please enter a product name.", "error");
    if (!Number.isFinite(price) || price < 0) return showNotice("Price must be a valid non-negative number.", "error");
    if (!Number.isInteger(quantity) || quantity < 0) return showNotice("Quantity must be a whole number (0 or more).", "error");
    const duplicateSku = sku && products.some(p => String(p.sku).toLowerCase() === sku.toLowerCase() && p.id !== editingId);
    if (duplicateSku) return showNotice("That SKU already exists. Please use a unique SKU.", "error");
    if (editingId !== null) {
      products = products.map(p => p.id === editingId ? { ...p, name, category, price, quantity, sku, notes } : p);
      showNotice(`${name} updated successfully.`);
    } else {
      const id = products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;
      products.push({ id, name, category, price, quantity, sku: sku || `SKU-${String(id).padStart(3, "0")}`, notes });
      showNotice(`${name} added to inventory.`);
    }
    saveProducts(); resetForm(); renderAll();
  }
  function editProduct(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
    editingId = id; $("product-id").value = id;
    $("product-name").value = p.name; $("product-category").value = p.category;
    $("product-price").value = p.price; $("product-quantity").value = p.quantity;
    $("product-sku").value = p.sku || ""; $("product-notes").value = p.notes || "";
    $("form-title").textContent = "Edit product"; $("save-button").textContent = "Save changes";
    $("product-name").focus(); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function deleteProduct(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
    if (!window.confirm(`Delete "${p.name}" from inventory?`)) return;
    products = products.filter(item => item.id !== id);
    if (editingId === id) resetForm();
    saveProducts(); renderAll(); showNotice(`${p.name} deleted.`);
  }
  function exportCsv() {
    const header = ["Name", "Category", "Price", "Quantity", "SKU", "Notes", "Price tier", "Stock value"];
    const rows = products.map(p => [p.name, p.category, p.price, p.quantity, p.sku, p.notes, categoryForPrice(p.price), p.price * p.quantity]);
    const csv = [header, ...rows].map(row => row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = "satyam-product-inventory.csv"; a.click(); URL.revokeObjectURL(url);
    showNotice("CSV export downloaded.");
  }
  function runAnalytics() {
    const taxRate = Number($("tax-rate").value), discountRate = Number($("discount-rate").value);
    if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100 || !Number.isFinite(discountRate) || discountRate < 0 || discountRate > 100) {
      showNotice("Tax and discount rates must each be between 0 and 100.", "error"); return;
    }
    const base = totals().value, discount = base * discountRate / 100, taxable = base - discount, tax = taxable * taxRate / 100, final = taxable + tax;
    $("analytics-output").innerHTML = `<div class="result-box"><div class="result-line"><span>Inventory value</span><strong>${money(base)}</strong></div><div class="result-line"><span>Discount (${discountRate}%)</span><strong>− ${money(discount)}</strong></div><div class="result-line"><span>Taxable amount</span><strong>${money(taxable)}</strong></div><div class="result-line"><span>Tax (${taxRate}%)</span><strong>+ ${money(tax)}</strong></div><div class="result-line final-line"><span>Estimated total</span><strong>${money(final)}</strong></div></div>`;
  }
  function resetSampleData() {
    if (!window.confirm("Replace your current inventory with the original sample products?")) return;
    products = DEFAULT_PRODUCTS.map(p => ({ ...p })); saveProducts(); resetForm(); renderAll(); showNotice("Sample inventory restored.");
  }
  $("product-form").addEventListener("submit", handleSubmit);
  $("cancel-edit").addEventListener("click", resetForm);
  $("search").addEventListener("input", renderTable);
  $("filter-category").addEventListener("change", renderTable);
  $("sort-by").addEventListener("change", renderTable);
  $("products-body").addEventListener("click", event => {
    const editButton = event.target.closest("[data-edit]"), deleteButton = event.target.closest("[data-delete]");
    if (editButton) editProduct(Number(editButton.dataset.edit));
    if (deleteButton) deleteProduct(Number(deleteButton.dataset.delete));
  });
  $("export-csv").addEventListener("click", exportCsv);
  $("calculate-analytics").addEventListener("click", runAnalytics);
  $("reset-sample").addEventListener("click", resetSampleData);
  renderAll(); runAnalytics();
})();