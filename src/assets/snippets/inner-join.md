# SQL INNER JOIN

Joins are used to query 2 or multiple tables at a go. Inner join returns rows from 2 or more tables that fulfill a certain condition. The fields used in joining must exist in both tables.
Example: Let's say we want to get persons details who have made an order in our restaurants across the city. We have the person table and the order table as shown below.

#### Persons

| person_id | person_name | person_age |
| --------- | ----------- | ---------- |
| 00        | Toni        | 10         |
| 01        | Liz         | 15         |
| 02        | Eve         | 18         |
| 03        | Dolores     | 26         |
| 04        | Ben         | 17         |

#### Orders

| order_id | restaurant | person_id |
| -------- | ---------- | --------- |
| 1        | RestA      | 00        |
| 2        | RestE      | 01        |
| 3        | RestI      | 02        |
| 4        | RestO      | 03        |
| 5        | RestU      | 03        |

Below is the query:

```sql
SELECT p.person_id, p.person_name, o.order_id, o.restaurant
FROM persons AS p
INNER JOIN orders As o
ON p.person_id = o.person_id;
```

Our result will be:

| person_id | person_name | order_id | restaurant |
| --------- | ----------- | -------- | ---------- |
| 00        | Toni        | 1        | RestA      |
| 01        | Eve         | 2        | RestE      |
| 02        | Liz         | 3        | RestI      |
| 03        | Dolores     | 4        | RestO      |
| 03        | Dolores     | 5        | RestU      |

> Note that Dolores appears twice because she made 2 orders. Meanwhile, Ben does not appear because he has never placed an order.

#### Using a WHERE clause with JOIN

```sql
SELECT p.person_id, p.person_name, o.order_id, o.restaurant
FROM persons AS p
INNER JOIN orders As o
ON p.person_id = o.person_id
WHERE p.name = 'Dolores';
```

This returns:

| person_id | person_name | order_id | restaurant |
| --------- | ----------- | -------- | ---------- |
| 03        | Dolores     | 4        | RestO      |
| 03        | Dolores     | 5        | RestU      |
