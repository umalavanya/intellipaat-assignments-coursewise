/*
Problem Statement:
You have successfully cleared your fifth semester. In the final semester you will
work with views, transactions and exception handling.

Tasks To Be Performed:
1. Create a view named ‘customer_san_jose’ which comprises of only those
customers who are from San Jose
2. Inside a transaction, update the first name of the customer to Francis
where the last name is Jordan:
a. Rollback the transaction
b. Set the first name of customer to Alex, where the last name is
Jordan
3. Inside a TRY... CATCH block, divide 100 with 0, print the default error
message.
4. Create a transaction to insert a new record to Orders table and save it.
*/
CREATE DATABASE assignmentsix ;
USE assignmentsix ;

Create table Customer (
	Customer_id int, 
	First_name Varchar(25), 
	Last_Name varchar(30),
	Email varchar(50), 
	Address varchar(30), 
	City Varchar(30), 
	State Varchar(30), 
	Zip int)

-- Single Record
insert into Customer values (1,'Sana','B','sana@gmail.com','Jayanagar','Bangalore','Karnataka',5877)

-- Multiple Records

insert into Customer (customer_id, first_name, last_name, email, address, city, state,zip)
values (2, 'Apurva','Wankade','apurva@yahoo.com','5th Cross','Pune','Mumbai',6894),
		(3,'Gautham','Sinha','gautham@yahoo.com','New City','San Jose','CA',12868),
		(4,'Vishal','V','vishal@gmail.com','4th Cross','Chennai','TamilNadu',6958),
		(5,'Bob','Barly','bob@hotmail.com','3rd Street','Texas','CA',84985);

create table Orders (order_id int, order_date date, amount int, customer_id int)

--insert
insert into Orders (order_id, order_date, amount, customer_id)
values (101, '2021-07-04',2450, 1),
		(201, '2018-09-13',5670,3),
		(301,'2020-02-02',2000,5),
		(401,'2019-01-05',3500,6),
		(501,'2021-06-03',300,7)

-- Reference
alter table Orders
alter column order_date date



--================= Answers ====================

SELECT * FROM Customer ;
--1.
IF OBJECT_ID('customer_san_jose','V') IS NOT NULL
	DROP VIEW customer_san_jose ;

GO ;
CREATE VIEW customer_san_jose AS
SELECT * 
FROM Customer
WHERE City = 'San Jose' ;
GO ;
SELECT * FROM customer_san_jose ;

--==============================================================
--2.
SELECT * FROM Customer WHERE last_name = 'Jordan';

Update Customer
	   SET last_name = 'Jordan' 
	   WHERE last_name = 'B'  ;
GO ;
BEGIN TRANSACTION ;
	UPDATE Customer
	   SET first_name = 'Francis'
	   WHERE last_name = 'Jordan' ;
	SELECT * FROM customer WHERE last_name = 'Jordan' ;
ROLLBACK TRANSACTION ;
	SELECT * FROM customer WHERE last_name = 'Jordan' ;
BEGIN TRANSACTION ;
	UPDATE customer
		SET first_name = 'Alex'
		WHERE last_name = 'Jordan'
	SELECT * FROM customer WHERE last_name = 'Jordan';
COMMIT TRANSACTION ;
GO ;

--==================================
--3.
BEGIN TRY
	--Attempt to divide by zero
	DECLARE @result DECIMAL(10,2) ;
	SET @result = 100/0 ;
	PRINT 'Result: ' + CAST(@result AS VARCHAR(20)) ;
END TRY

BEGIN CATCH
	--Print the default error message
	PRINT 'Error Message: ' + ERROR_MESSAGE() ;
	PRINT 'Erro Number: ' + CAST(ERROR_NUMBER() AS VARCHAR(10)) ;
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10)) ;
	PRINT 'Error State' + CAST(ERROR_STATE() AS VARCHAR(10)) ;
	PRINT 'Error Line: '+ CAST(ERROR_LINE() AS VARCHAR(10)) ;
END CATCH ;

--============================================


SELECT * FROM Orders ;
SELECT * FROM Orders WHERE Order_ID = 6;
SELECT * FROM Orders WHERE Order_ID = 7;

-- Delete if Order_ID = 6 or 7 exists (to avoid duplicates)
DELETE FROM Orders WHERE Order_ID = 6;
DELETE FROM Orders WHERE Order_ID = 7;

SET IDENTITY_INSERT Orders ON ;

BEGIN TRANSACTION ;
	PRINT 'Transaction started. @@TRANCOUNT ='+ CAST(@@TRANCOUNT AS VARCHAR) ;
	SET IDENTITY_INSERT Orders ON;
	INSERT INTO Orders (order_id, order_date, amount, customer_id )
	VALUES
	(8, '2026-01-17', 500.00,4) ;

	SELECT * FROM Orders ;


	SAVE TRANSACTION SavePoint1 ;

	INSERT INTO Orders (order_id, order_date, amount, customer_id )
	VALUES
	(9, '2026-01-18', 600.00,5) ;
	ROLLBACK TRANSACTION  SavePoint1;
COMMIT ;
SELECT * FROM Orders ;
SET IDENTITY_INSERT Orders OFF ;

--=====================================
