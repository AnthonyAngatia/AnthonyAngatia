# Full Join

Return records from all the tables that satisfies irregardless of whether the condition is fulfilled or not. For those where the condition is met, the rows are combined. If no match is found, the columns with missing value are filled with null values.
Example: We have 2 tables persons and orders.

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
| 6        | RestAA     | 03        |
| 7        | RestAA     | 08        |

The query will be:

```sql
SELECT p.person_id, p.person_name, o.order_id, o.restaurant
FROM persons AS p
FULL JOIN orders As o
ON p.person_id = o.person_id;
```

The result will be:

| person_id | person_name | order_id | restaurant |
| --------- | ----------- | -------- | ---------- |
| 00        | Toni        | 1        | RestA      |
| 01        | Eve         | 2        | RestE      |
| 02        | Liz         | 3        | RestI      |
| 03        | Dolores     | 4        | RestO      |
| 03        | Dolores     | 5        | RestU      |
| 03        | Dolores     | 6        | RestAA     |
| 04        | Ben         | 7        | null       |
| null      | null        | 7        | RestAA     |
