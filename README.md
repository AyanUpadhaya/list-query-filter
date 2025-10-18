# list-query-filter

A simple, lightweight query builder for filtering, sorting, paginating, and projecting arrays of objects — ORM-style, using pure JavaScript.

---

### 🚀 Installation

```bash
npm install list-query-filter
```

# Usage

### Simple with sort and limit

```js
import { query, CONDITIONS } from "list-query-filter";

const books = [
  { title: "1984", author: "George Orwell", publishedYear: 1949 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 },
  { title: "Atomic Habits", author: "James Clear", publishedYear: 2018 },
];

const results = query(books)
  .filter({
    publishedYear: { condition: CONDITIONS.greaterThan, value: 1950 },
  })
  .sort("publishedYear", "desc")
  .limit(2)
  .select(["title", "publishedYear"])
  .get();

console.log(results);
```

### Complex Filter with AND/OR

```js
const results = query(books)
  .filter({
    publishedYear: { condition: CONDITIONS.greaterThan, value: 1950 },
  })
  .sort("publishedYear", "desc")
  .limit(3)
  .select(["title", "publishedYear"])
  .get();

console.log("Recent Books:", results);
```

### Complex Filter with AND/OR

```js
const filtered = query(books)
  .filter({
    AND: [
      { publishedYear: { condition: CONDITIONS.greaterThan, value: 1950 } },
      {
        OR: [
          { title: { condition: CONDITIONS.includes, value: "The" } },
          { author: { condition: CONDITIONS.startsWith, value: "J" } },
        ],
      },
    ],
  })
  .get();

console.log("Complex Filter:", filtered);
```

### Pagination Example (skip + limit)

```js
const page2 = query(books)
  .sort("publishedYear", "asc")
  .skip(2)
  .limit(2)
  .select(["title", "publishedYear"])
  .get();

console.log("Page 2:", page2);
```

### Use Custom Predicate

```js
const evenYearBooks = query(books)
  .filter({
    publishedYear: { condition: (year) => year % 2 === 0 },
  })
  .get();

console.log("Even Year Books:", evenYearBooks);
```

### Just simple use case

```js
const { query, CONDITIONS } = require("list-query-filter");

const books = [
  { title: "1984", author: "George Orwell", publishedYear: 1949 },
  { title: "Atomic Habits", author: "James Clear", publishedYear: 2018 },
  { title: "The Alchemist", author: "Paulo Coelho", publishedYear: 1988 },
];

const results = query(books)
  .filter({
    publishedYear: { condition: CONDITIONS.greaterThan, value: 2000 },
  })
  .select(["title", "publishedYear"])
  .get();

console.log("Recent Books:", results);
```

✨ Features

- AND / OR nested filtering
- Custom predicate functions
- Sorting, skip, limit, and projection
- Lightweight — no dependencies
