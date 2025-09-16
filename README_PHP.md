# Bucks2Bar2 - PHP endpoints (Quick start)

This project contains simple PHP 8 endpoints that replicate server-side logic from the original `src/js/main.js`:

- `src/php/process.php` — accepts POST form data or a JSON body with keys like `income-january`, `expenses-february` and returns JSON arrays for `income` and `expenses`.
- `src/php/validate.php` — accepts `username` via POST or JSON and returns whether it passes validation rules.

How to run a quick local PHP server (from project root):

```powershell
php -S 127.0.0.1:8000 -t src
```

Examples

1) POST JSON to `process.php`:

```javascript
fetch('http://127.0.0.1:8000/php/process.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 'income-january': 1000, 'expenses-january': 200 })
})
  .then(r => r.json())
  .then(data => console.log(data));
```

2) Validate username:

```javascript
fetch('http://127.0.0.1:8000/php/validate.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'Abel$123' })
})
  .then(r => r.json())
  .then(data => console.log(data));
```

Notes

- These endpoints are meant to be called from client-side code (JS) or from server-side forms.
- The interactive parts (Chart.js, DOM events, canvas downloads) must remain client-side. Use these endpoints to store or validate data server-side, or to return prepared datasets for chart rendering.
