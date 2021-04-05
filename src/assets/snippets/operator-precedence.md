# Operator Precedence

The `AND` operator takes precedence over `OR` when used together. A good practice is to use brackets`()` when writing queries involving the 2 operators.
Let's say we want to select people called Toni or Liz and they stay in Nairobi. Example 1 and 2 are our queries.

#### Example 1:

```sql
SELECT first_name, age, country FROM person
WHERE first_name="Toni" OR first_name ="Eve" AND city="Nairobi"
```

#### Example 2:

```sql
SELECT first_name, age, country FROM person
WHERE (first_name="Toni" OR first_name ="Liz") AND city="Nairobi"
```

Example 1 will do a look up for people called Eve and stay in Nairobi first. Then it will look up for people called Toni.

> Note that when it looks up for Toni, it won't consider the city the Tonis are in. You'll get Toni from Tokyo, Amsterdam etc.

Example 2 will do a look up for people with the names Toni or Liz first. Then among these people, it will get those who stay in Nairobi.
