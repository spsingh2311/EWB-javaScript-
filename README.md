# JavaScript Assignments & Capstone Mini Project

A beginner-friendly, GitHub-ready solution to the six JavaScript assignments and the capstone project described in the supplied curriculum PDF.

## Contents

- `assignments/assignment-01-variables.html` — variables, data types, `typeof`, console output
- `assignments/assignment-02-operators.html` — prompts, numeric conversion, arithmetic and formatted output
- `assignments/assignment-03-conditionals.html` — `if...else`, `switch`, ternary operator
- `assignments/assignment-04-loops.html` — `for`, `while`, `break`, `do...while`, `continue`
- `assignments/assignment-05-functions-scope.html` — regular and arrow functions, default parameters, scope
- `assignments/assignment-06-arrays-objects.html` — objects, `forEach()`, `filter()`, `map()`
- `mini-project/` — Interactive Product Inventory & Analytics Dashboard

## How to run

1. Download and extract the ZIP.
2. Open any assignment HTML file in a modern browser.
3. Open Developer Tools (`F12` on most desktop browsers) and select **Console** to view the assignment output.
4. Assignment 2 asks for a subtotal and tip percentage. Assignment 3 asks for a score. Cancelled or invalid inputs are handled.
5. For the mini project, open `mini-project/index.html`. Add products, review inventory analytics, and use the **Run console demo** button to print a sample report in the browser console.

No installation, server, API key, or external library is required.

## Mini project features

- Add a product using a name and numeric price
- Validate missing, invalid, negative, and non-finite values
- Categorize products as **Budget** (under $50), **Standard** ($50–$199.99), or **Premium** ($200 and above)
- Calculate inventory value, tax, and discount using functions
- Search and filter the inventory
- Use `forEach()`, `filter()`, and `map()` for reporting
- Display a formatted inventory sheet and analytics summary

## Example mini-project data

The initial inventory includes Laptop ($800) and Mouse ($25). Adding Monitor ($150) gives:

- Total inventory value: **$975**
- Affordable items under $200: **Mouse, Monitor**
- Formatted report: **LAPTOP: $800**, **MOUSE: $25**, **MONITOR: $150**

## Suggested GitHub upload

Create a new public or private repository, for example `javascript-assignments-mini-project`. Upload the extracted files (or use **Add file → Upload files** on GitHub). Keep this README at the repository root.

## Learning note

The code is intentionally written in clear, readable JavaScript and includes comments. Review each file and make sure you can explain the purpose of every concept during a practical assessment or viva.
