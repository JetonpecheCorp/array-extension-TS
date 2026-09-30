# LINQ for TypeScript Arrays

A TypeScript library that brings LINQ (Language Integrated Query) capabilities directly to standard JavaScript/TypeScript arrays.

## What is LINQ? (For non-C# developers)

In languages like C#, LINQ allows you to query, filter, and transform collections using a readable, SQL-like fluent syntax.

Instead of chaining multiple `.filter()` and `.map()` calls—which immediately create intermediate array copies in memory at every single step—this library introduces two types of operations:

```
[ Your Array ] ───▶ where() / whereOr() ───▶ select() / sum() / firstOrDefault()
                      (Deferred queue)              (Immediate execution)
```

### 1. Intermediate Operations (Deferred / Lazy):
Methods like `where()` and `whereOr()` do not filter the array right away. They register rules in a queue without duplicating data.

### 2. Terminal Operations (Immediate Execution):
Methods like `select()`, `sum()`, `orderBy()`, or `firstOrDefault()` trigger the execution, apply all queued filters in a single pass, and return the final result.

## Table of Contents
- [Quick Start](#quick-start)
    - [Simple example](#simple-example)
    - [Real-World Chained Example](#real-world-chained-example)
- [How Filters Work (where vs whereOr)](#how-filters-work-where-vs-whereor)
- [Method Reference](#method-reference)
    - [1. Data Extraction & Projections](#data-extraction--projections)
    - [2. Calculations & Aggregations](#calculations--aggregations)
    - [3. Ordering and Slicing](#ordering-and-slicing)
    - [4. Grouping and Deduplication](#grouping-and-deduplication)
    - [5. Boolean Conditions](#boolean-conditions)
    - [6. In-Place Array Mutations](#in-place-array-mutations)
    - [7. Static Factory Methods](#static-factory-methods)

## Quick Start

### Simple example
```ts
import "./Linq";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Step 1: Queue a filter (not executed yet)
const query = numbers.where(n => n % 2 === 0);

// Step 2: Terminal method triggers the filter and maps the output
const results = query.select(n => n * 10);

console.log(results);
// Output: [20, 40, 60, 80, 100]
```

### Real-World Chained Example
Querying a list of employees with nested collections, sorting, and aggregation:

```ts
import "./Linq";

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  skills: string[];
}

const employees: Employee[] = [
  { id: 1, name: "Alice", department: "IT", salary: 95_000, skills: ["TypeScript", "Go"] },
  { id: 2, name: "Bob", department: "IT", salary: 70_000, skills: ["Go", "Docker"] },
  { id: 3, name: "Charlie", department: "Design", salary: 65_000, skills: ["Figma"] },
  { id: 4, name: "David", department: "Marketing", salary: 80_000, skills: ["SEO"] },
  { id: 5, name: "Eve", department: "IT", salary: 110_000, skills: ["TypeScript", "Kubernetes"] }
];

// Complex query:
// - IT staff OR employees earning >= 80,000
// - Sorted by salary descending
// - Take only the top 2 records
const highEarners = employees
  .whereOr(e => e.department === "IT")
  .whereOr(e => e.salary >= 80_000)
  .orderByDesc(e => e.salary)
  .take(2);

console.log(highEarners.select(e => `${e.name}: ${e.salary}€`));
// Output: ['Eve: 110000€', 'Alice: 95000€']

// Flatten child collections and deduplicate
const uniqueSkills = employees
  .where(e => e.department === "IT")
  .selectMany(e => e.skills)
  .distinct();

console.log(uniqueSkills);
// Output: ['TypeScript', 'Go', 'Docker', 'Kubernetes']
```

## How Filters Work (`where` vs `whereOr`)
Both methods queue conditions that are evaluated together when a terminal method is called:

- `where()`: represents a logical **AND**
- `whereOr()`: represents a logical **OR**

```ts
// Rule: (age > 18) AND (country === "FR" OR country === "BE")
users
  .where(u => u.age > 18)
  .whereOr(u => u.country === "FR")
  .whereOr(u => u.country === "BE")
  .select(u => u.name);
```

## Method Reference

### Data Extraction & Projections
Terminal methods that apply queued filters and transform the output shape:
| Method | Description |
|:--- |:--- |
| `select(selector)` | Maps each item to a new format (similar to `.map()`) |
| `selectMany(listSelector, resultSelector?)` | Flattens nested arrays/iterables into a single array |
| `firstOrDefault(predicate?)` | Returns the first matching element, or `null` if not found |
| `lastOrDefault(predicate?)` | Returns the last matching element, or `null` if not found |
| `elementAtOrDefault(index)` | Retrieves the element at a specific index, or `null` |
| `toArray()` | Evaluates queued filters and returns the resulting elements as a new array |
| `toJson()` | Converts the filtered array into a JSON string |

```ts
const orders = [
  { id: 101, customer: "Alice", items: ["Book", "Pen"] },
  { id: 102, customer: "Bob", items: ["Laptop"] },
  { id: 103, customer: "Charlie", items: ["Coffee", "Mug"] }
];

// ---------------------- select: Extract specific properties ----------------------
orders.select(o => o.customer);
// ['Alice', 'Bob', 'Charlie']

// ---------------------- selectMany: Flatten nested items across orders ----------------------
orders.selectMany(o => o.items);
// ['Book', 'Pen', 'Laptop', 'Coffee', 'Mug']

// selectMany with projection: combine parent and child info
orders.selectMany(o => o.items, (order, item) => `${order.customer} bought ${item}`);
// ['Alice bought Book', 'Alice bought Pen', 'Bob bought Laptop', ...]

// ---------------------- firstOrDefault & lastOrDefault: Safe extraction without throw ----------------------
orders.firstOrDefault(o => o.customer.startsWith("B")); // { id: 102, ... }
orders.firstOrDefault(o => o.customer === "David");     // null
orders.lastOrDefault();                                     // { id: 103, ... }

// ---------------------- elementAtOrDefault: Index-based safe access ----------------------
orders.elementAtOrDefault(1); // { id: 102, ... }
orders.elementAtOrDefault(9); // null

// ---------------------- toJson: Serialize query result ----------------------
orders.where(o => o.id === 101).toJson();
// '[{"id":101,"customer":"Alice","items":["Book","Pen"]}]'

orders.where(o => o.id === 101).toArray();
// [{"id":101,"customer":"Alice","items":["Book","Pen"]}]
```

### Calculations & Aggregations
Compute summary metrics directly across values or selected properties:

| Method | Description |
|:--- |:--- |
| `sum(selector?)` | Calculates total sum of numeric values |
| `average(selector?)` | Computes arithmetic mean |
| `min()` / `max()` | Finds smallest/largest primitive value |
| `minBy(selector)` / `maxBy(selector)` | Returns the object with the lowest/highest value for a key |

```ts
// Working on primitive numbers
const scores = [10, 20, 30];
scores.sum();     // 60
scores.average(); // 20
scores.min();     // 10
scores.max();     // 30

// Working on objects
const products = [
  { name: "Keyboard", price: 50, rating: 4.5 },
  { name: "Mouse", price: 25, rating: 4.8 },
  { name: "Monitor", price: 200, rating: 4.2 }
];

// ---------------------- Sum & Average with selector ----------------------
products.sum(p => p.price);     // 275
products.average(p => p.price); // ~91.67

// ---------------------- minBy & maxBy: returns the full matched object ----------------------
products.minBy(p => p.price);   // { name: "Mouse", price: 25, rating: 4.8 }
products.maxBy(p => p.rating);  // { name: "Mouse", price: 25, rating: 4.8 }
```

### Ordering and Slicing
Partition and sort collections:
| Method | Description |
|:--- |:--- |
| `orderBy(selector)` | Sorts ascending by `string`, `number`, or `Date` |
| `orderByDesc(selector)` | Sorts descending by `string`, `number`, or `Date` |
| `take(count)` | Takes the first `N` elements |
| `takeLast(count)` | Takes the last `N` elements |
| `skip(count)` | Skips `N` elements from the beginning |
| `skipLast(count)` | Skips `N` elements from the end |
| `chunk(size)` | Splits the array into chunks of a given maximum size |

```ts
const athletes = [
  { name: "Zack", points: 85 },
  { name: "Alex", points: 95 },
  { name: "Emma", points: 90 }
];

// Sorting by string or number
athletes.orderBy(a => a.name);      // Alex, Emma, Zack
athletes.orderByDesc(a => a.points); // Alex (95), Emma (90), Zack (85)

// Pagination pattern (skip + take)
const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
alphabet.skip(2).take(3); // ['C', 'D', 'E']

// End-based slicing
alphabet.takeLast(2); // ['F', 'G']
alphabet.skipLast(2); // ['A', 'B', 'C', 'D', 'E']

// Chunking for batch processing
const ids = [1, 2, 3, 4, 5, 6, 7];
ids.chunk(3); 
// [[1, 2, 3], [4, 5, 6], [7]]
```

### Grouping and Deduplication
Organize, count, and remove duplicates:

| Method | Description |
|:--- |:--- |
| `groupBy(selector)` | Groups elements into `{ key: string, value: T[] }[]` |
| `countBy(selector)` | Counts occurrences per key: `{ key: U, value: number }[]` |
| `distinct()` | Removes duplicate items using deep object comparison |
| `distinctBy(selector)` | Removes duplicates based on a selected property |
| `union(otherList)` | Combines two arrays and removes duplicates |
| `unionBy(otherList, selector)` | Combines two arrays and deduplicates by key |
| `zip(otherList, selector?)` | Pairs elements with another array by index |

> **Deep Object Equality Note for `distinct()` and `union()`:**  
> Unlike standard JavaScript where object references are compared (`{}` !== `{}`), deduplication uses deterministic structural serialization.  
> Object property order **does not matter**. For example:  
> `{ id: 2, city: "Lyon" }` and `{ city: "Lyon", id: 2 }`  
> are considered identical duplicates, so only the first occurrence is kept.

```ts
// ---------------------- 1. Deduplication (distinct & distinctBy) ----------------------
[1, 2, 2, 3].distinct(); // [1, 2, 3]

const users = [
  { id: 2, city: "Lyon" },
  { city: "Lyon", id: 2 }, // Deep duplicate: ignored
  { id: 3, city: "Paris" }
];
users.distinct(); // [{ id: 2, city: "Lyon" }, { id: 3, city: "Paris" }]
users.distinctBy(u => u.city); // [{ id: 2, city: "Lyon" }, { id: 3, city: "Paris" }]

// ---------------------- 2. Combining sets (union & unionBy) ----------------------
[1, 2].union([2, 3]); // [1, 2, 3]

const store = [{ id: 101, label: "Keyboard" }, { id: 102, label: "Mouse" }];
const warehouse = [{ id: 102, label: "Mouse Pro" }, { id: 103, label: "Screen" }];
store.unionBy(warehouse, p => p.id);
// [{ id: 101, label: "Keyboard" }, { id: 102, label: "Mouse" }, { id: 103, label: "Screen" }]

// ---------------------- 3. Pairing sequences (zip) ----------------------
const names = ["Alice", "Bob", "Charlie", "David"];
const scores = [15, 20, 18]; // David is dropped (stops at shortest length)

names.zip(scores); 
// [{ "0": "Alice", "1": 15 }, { "0": "Bob", "1": 20 }, { "0": "Charlie", "1": 18 }]

names.zip(scores, (name, score) => `${name}: ${score}/20`);
// ['Alice: 15/20', 'Bob: 20/20', 'Charlie: 18/20']
```

### Boolean Conditions
Verify conditions across elements: 

| Method | Description |
|:--- |:--- |
| `any(predicate?)` | Returns `true` if at least one element matches the condition |
| `all(predicate?)` | Returns true if every element matches the condition |
| `count()` | Returns the number of elements matching the queued filters |

```ts
const tasks = [
  { id: 1, done: true, priority: "high" },
  { id: 2, done: false, priority: "low" },
  { id: 3, done: true, priority: "high" }
];

// any: Check presence or match
tasks.any();                             // true (array is not empty)
tasks.any(t => t.priority === "urgent"); // false
tasks.any(t => !t.done);                 // true

// all: Complete verification
tasks.all(t => t.done);                  // false (task 2 is false)
tasks.all(t => t.id > 0);                // true

// count: Count matching records
tasks.where(t => t.done).count();        // 2
```

### In-Place Array Mutations

> **Warning:** Unlike projection methods, these mutate the source array directly.

| Method | Description |
|:--- |:--- |
| `insert(index, item)` | Inserts an item or array of items at a specified position |
| `remove(predicate?)` | Deletes matching items from the current array |
| `update(partial)` | Mutates matching items with new property values |
| `updateMany(selector, partial)` | Mutates nested sub-collections inside matching items |

```ts
const players = [
  { id: 1, score: 10, badges: [{ name: "Bronze" }] },
  { id: 2, score: 20, badges: [{ name: "Silver" }] }
];

// 1. insert: Add at position 1
players.insert(1, { id: 3, score: 15, badges: [] });

// 2. update: Mutate matching objects in-place
players.where(p => p.id === 1).update({ score: 100 });
// players[0].score is now 100

// 3. updateMany: Mutate nested collections in-place
players.updateMany(p => p.badges, { name: "Gold" });
// All badge names are updated to "Gold"

// 4. remove: Delete items matching condition
players.remove(p => p.score < 20); // deletes player with id 3
```

### Static Factory Methods
Utility methods available directly on `Array`:

```ts
// Generate sequential numbers
Array.range(1, 5);  // [1, 2, 3, 4, 5]
Array.range(-2, 4); // [-2, -1, 0, 1]

// Repeat a value multiple times
Array.repeat("LINQ", 3);       // ['LINQ', 'LINQ', 'LINQ']
Array.repeat({ active: true }, 2); // [{ active: true }, { active: true }]
```