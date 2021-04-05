# Using BETWEEN and IN instead of AND and OR

### BETWEEN and AND

```sql
SELECT first_name, age FROM person
WHERE age >=6 AND age <=15;
```

This query can be minified using`BETWEEN` operator.

```sql
SELECT first_name FROM person
WHERE age BETWEEN 6 AND 15;
```

> Note that `BETWEEN` is inclusive of 6 and 15.

### IN and OR

```sql
SELECT first_name, age FROM person
WHERE first_name="Toni" OR first_name ="Liz" OR first_name="X Æ A-12"
```

This can be simplified with `IN` operator

```sql
SELECT first_name, age FROM person
WHERE first_name IN ("Toni, Liz, X Æ A-12")
```
