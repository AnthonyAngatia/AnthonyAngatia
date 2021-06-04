# Using 'ALIAS' keyword in sql

You can give a column or a table an alias name in sql. One of the reason for this is to enhance readability.
Using an Alias column name

```sql
SELECT cust_name AS Customer,
cust_tel_no AS [Customer Telephone]
FROM person;
```

> We use a square bracket incase we need to space the alias name

## Using an AlIAS table name

This comes in handy when you are querying data from multiple tables and you want to shorten the table name. This easens your work and it is less error prone.

In this query, we are retrieving Order details of a customer named Tony from the order table and the customer name from the customer table.

```sql
SELECT o.OrderID, o.OrderDate, c.CustomerName;
FROM Customers AS c,
     Orders AS o
WHERE c.CustomerName='Tony' AND c.CustomerID=o.CustomerID;
```

> It is much easier to get the column names with `o` and `c` unlike using the full table name
