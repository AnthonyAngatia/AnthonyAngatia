# Using ALIAS in sql

You can give a column or a table an alias name in sql. One of the reason for this is to enhance readability.
Using an Alias column name

```sql
SELECT cust_name AS Customer, cust_tel_no AS [Customer Telephone] FROM person;
```

> We use a square bracket incase we need to space the alias name

Using an Alias table name
This comes in handy when you are retrieving data from multiple tables and you want to shorten the table name. This easens your work and it is less error prone.

```sql
SELECT o.OrderID, o.OrderDate, c.CustomerName;
FROM Customers AS c,
     Orders AS o
WHERE c.CustomerName='Tony' AND c.CustomerID=o.CustomerID;
```

> It is much easier to get the column names with `o` and `c` unlike using the table name
