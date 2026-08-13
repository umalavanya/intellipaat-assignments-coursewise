/*
Problem Statement:
You have successfully cleared the second semester. In your third semester you
will work with joins and update statements.
Tasks To Be Performed:
1. Create an ‘Orders’ table which comprises of these columns: ‘order_id’,
‘order_date’, ‘amount’, ‘customer_id’.
2. Insert 5 new records.
3. Make an inner join on ‘Customer’ and ‘Orders’ tables on the ‘customer_id’
column.
4. Make left and right joins on ‘Customer’ and ‘Orders’ tables on the
‘customer_id’ column.
5. Make a full outer join on ‘Customer’ and ‘Orders’ table on the ‘customer_id’
column.
6. Update the ‘Orders’ table and set the amount to be 100 where
‘customer_id’ is 3.

*/

--1.
CREATE TABLE Orders (
order_id INT PRIMARY KEY IDENTITY(1,1),
order_date DATE,
amount DECIMAL(10,2),
customer_id INT
) ;

INSERT INTO Orders(order_date, amount, customer_id)
VALUES
('2025-09-13',102.00,2),
('2024-09-23',256.55,3),
('2025-08-03',499.99,1),
('2025-07-25',302.00,4),
('2025-02-24',299.99,5)
;

SELECT *
FROM customer c
INNER JOIN Orders o
ON c.customer_id = o.customer_id ;

SELECT *
FROM customer c
LEFT JOIN Orders o
ON c.customer_id = o.customer_id ;

SELECT *
FROM customer c
RIGHT JOIN Orders o
ON c.customer_id = o.customer_id ;

SELECT *
FROM customer c
FULL JOIN Orders o
ON c.customer_id = o.customer_id ;

UPDATE Orders
SET amount = 100
WHERE customer_id = 3 ;

--===================================================