/*
Problem Statement:
-----------------------------------------------
Youhave successfully cleared the first semester. In your second semester you
will learn how to create tables, work with WHERE clause and basicoperators.
---------------------------------------------------------------
Tasks To Be Performed:
1. Create a customer table which comprises of these columns: ‘customer_id’,
‘first_name’, ‘last_name’, ‘email’, ‘address’, ‘city’,’state’,’zip’
2. Insert 5 new records into the table
3. Select only the ‘first_name’ and ‘last_name’ columns from the customer
table
4. Select those records where ‘first_name’ starts with “G” and city is ‘San
Jose’.
5. Select those records where Email has only ‘gmail’.
6. Select those records where the ‘last_name’ doesn't end with “A”.
*/

--==================================================================
--Answers
--==================================================================

--First, let's create a database (if it doesn't exist)
CREATE DATABASE CustomerDb ;

USE CustomerDb ;

--Create the customer table
CREATE TABLE customer (
	customer_id INT PRIMARY KEY IDENTITY(1,1),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100),
	address VARCHAR(250),
	city VARCHAR(50),
	state VARCHAR(50),
	zip VARCHAR(10)
);

-- Insert 5 sample records
INSERT INTO customer (first_name, last_name, email, address, city, state, zip) 
VALUES 
('John', 'Smith', 'john.smith@gmail.com', '123 Main St', 'San Jose', 'California', '95101'),
('George', 'Williams', 'george.w@gmail.com', '456 Oak Ave', 'San Jose', 'California', '95102'),
('Sarah', 'Johnson', 'sarah.j@yahoo.com', '789 Pine Rd', 'Los Angeles', 'California', '90001'),
('Gregory', 'Miller', 'greg.m@hotmail.com', '101 Maple St', 'San Jose', 'California', '95103'),
('Amy', 'Anderson', 'amy.a@gmail.com', '202 Elm St', 'San Francisco', 'California', '94102'),
('Gina', 'Rodriguez', 'gina.rodriguez@gmail.com', '303 Birch Ln', 'San Jose', 'California', '95104'),
('Robert', 'Wilson', 'robert.w@outlook.com', '404 Cedar Dr', 'San Diego', 'California', '92101');


-- Select specific columns
SELECT first_name, last_name 
FROM customer;


SELECT *
FROM customer
WHERE first_name LIKE 'G%' 
AND city = 'San Jose';


SELECT *
FROM customer
WHERE email LIKE '%@gmail.com';


SELECT *
FROM customer
WHERE last_name NOT LIKE '%a';