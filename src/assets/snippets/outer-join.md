# SQL Outer Join

Can be classified into Left Join and Right Join.
Example: We have 2 tables persons and orders. Let us take persons to be the left table and orders to be the right table.

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

We want to get details about every person in our system and incase they have made an order, we want to know the order and restaurant which the order was made.
We will perfom a left outer join in that case.

### Left Outer Join

```sql
SELECT p.person_id, p.person_name, o.order_id, o.restaurant
FROM persons AS p
LEFT OUTER JOIN orders As o
ON p.person_id = o.person_id;
```

We are joining persons on left to the orders. this gives us:

| person_id | person_name | order_id | restaurant |
| --------- | ----------- | -------- | ---------- |
| 00        | Toni        | 1        | RestA      |
| 01        | Eve         | 2        | RestE      |
| 02        | Liz         | 3        | RestI      |
| 03        | Dolores     | 4        | RestO      |
| 03        | Dolores     | 5        | RestU      |
| 04        | Ben         | null     | null       |

> Note that the row with Ben has null values because he has not placed any order.

### Right Outer Join

It is the vice versa of left.

```sql
SELECT p.person_id, p.person_name, o.order_id, o.restaurant
FROM persons AS p
RIGHT OUTER JOIN orders As o
ON p.person_id = o.person_id;
```

This time, we will select all the records in the orders table regardless whether there is a match or not
The results for the above query will be:

| person_id | person_name | order_id | restaurant |
| --------- | ----------- | -------- | ---------- |
| 00        | Toni        | 1        | RestA      |
| 01        | Eve         | 2        | RestE      |
| 02        | Liz         | 3        | RestI      |
| 03        | Dolores     | 4        | RestO      |
| 03        | Dolores     | 5        | RestU      |

> If we had another order e.g order_id = 6 but the person deleted the account so his record is not under persons, the person_id and person_name will have null values.

> **Note**:Left outer joins are preferred to right outer joins because they are easy to read and understand.

### Switch from right to left join

Just switch the order of the table names and replace `RIGHT` with `LEFT`

##### Before

```sql
SELECT p.person_id, p.person_name, o.order_id, o.restaurant
FROM orders AS o
RIGHT OUTER JOIN persons As p
ON p.person_id = o.person_id;
```

##### After

```sql
SELECT p.person_id, p.person_name, o.order_id, o.restaurant
FROM persons AS p
LEFT JOIN orders As o
ON p.person_id = o.person_id;
```

### Summary

#### Left Join

Returns all the fields in the left table along with any matching records from the right table.

#### Right Join

It is the vice versa of the left join. Returns all the rows in the right table along with any matching records in the left table.
