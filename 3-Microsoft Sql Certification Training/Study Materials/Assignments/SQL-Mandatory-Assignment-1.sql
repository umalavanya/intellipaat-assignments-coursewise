--================== Umalavanya Chintapanti =================

-------------------- Manadatory Assignment-1 --------------------------
USE master ;
DROP DATABASE IF EXISTS sqlassignments  ;
CREATE database sqlassignments ;
USE sqlassignments ;
------------------------------------------------------------------------
CREATE TABLE 
	Salesman(
		SalesmanId INT,
		SalesmanName VARCHAR(255),
		Commission DECIMAL(10,2),
		City VARCHAR(255),
		Age INT
	) ;
-------------------------------------------------------------------------
INSERT INTO 
Salesman (SalesmanId, SalesmanName, Commission, City, Age)  
VALUES 
	(101,'Joe', 50, 'California', 17),
	(102, 'Simon', 75, 'Texas', 25),
	(103, 'Jessie', 105, 'Florida', 35),
	(104, 'Danny', 100, 'Texas', 22),
	(105, 'Lia', 65,'New Jersey', 30) ;
--------------------------------------------------------------------------
CREATE TABLE 
	Customer (
		SalesmanId INT,
		CustomerId INT, 
		CustomerName VARCHAR(255),
		PurchaseAmount INT
	);
--------------------------------------------------------------------------
INSERT INTO 
	Customer (SalesmanId, CustomerId, CustomerName, PurchaseAmount) VALUES 
	 (101, 2345, 'Andrew', 550)
	,(103, 1575, 'Lucky', 4500 )
	,(104, 2345, 'Andrew', 4000)
	,(107, 3747, 'Remona', 2700)
	,(110, 4004, 'Julia', 4545) ;
-------------------------------------------------------------------------
CREATE TABLE Orders (
	OrderId INT, 
	CustomerId INT,
	SalesmanId INT,
	Orderdate DATE,
	Amount DECIMAL) ;
--------------------------------------------------------------------------
INSERT INTO Orders VALUES
	(5001, 2345, 101, '2021-07-01', 550),
	(5003, 1234, 105, '2022-02-15', 1500) ;
------------------------------------------------------------------------------
SELECT * FROM Salesman ;
SELECT * FROM Customer ;
SELECT * FROM Orders ;
-- =================== Tasks to be Performed ==========================================================================================================
-- 1. Insert a new record in your Orders table

INSERT INTO orders VALUES
	(5002, 3454, 102, '2023-01-23', 2000) ;
SELECT * FROM orders ;
--======================================================================================================================================================
--2. 
-- (i) Add Primary Key constraint for SalesmanId column in Salesman table. 

-- The SalesmanId should be NOT NULL to create the primary key on it
ALTER TABLE Salesman
ALTER COLUMN SalesmanId INT NOT NULL ;
--ADD the primary key
ALTER TABLE Salesman 
ADD CONSTRAINT PK_SalesmanId
PRIMARY KEY(SalesmanId ) ;

SELECT SalesmanId FROM Salesman ;
-------------------------------------------------------------------------
-- (ii) Add default constraint for City column in Salesman  table. 
ALTER TABLE Salesman
ADD CONSTRAINT Default_Salesman_city
DEFAULT 'New York' FOR City ;

SELECT * FROM Salesman ;
-------------------------------------------------------------
-- (iii) Add Foreign Key constraint for SalesmanId column in Customer table. 
ALTER TABLE Customer
ADD CONSTRAINT FK_Customer_SalesmanId
FOREIGN KEY (SalesmanId) 
REFERENCES  Salesman(SalesmanId) ;
--=-------------------------------------------------------------------------
-- (iv) Add not null constraint in Customer_name column for the Customer table.
ALTER TABLE Customer
ALTER COLUMN CustomerName VARCHAR(255) NOT NULL ;
--===============================================================================================================================================
--3. 
-- Fetch the data where the Customer’s name is ending with ‘N’ also get the purchase amount value greater than 500.

SELECT * 
FROM Customer
WHERE CustomerName LIKE '%n' AND PurchaseAmount > 500;

--===========================================================================================================================================
--4. 
-- Using SET operators, retrieve the first result with unique SalesmanId values from two  tables, and the other result containing SalesmanId with duplicates from two tables. 

SELECT SalesmanId
FROM Salesman 
UNION 
SELECT SalesmanId
FROM Customer 
ORDER BY SalesmanId;

SELECT SalesmanId
FROM Salesman 
UNION ALL
SELECT SalesmanId
FROM Customer 
ORDER BY SalesmanId;
--===============================================================================================================================================
--5. 
-- Display the below columns which has the matching data.  
-- Orderdate, Salesman Name, Customer Name, Commission, and City which has the  range of Purchase Amount between 500 to 1500.

SELECT 
	Orders.Orderdate,
	Salesman.SalesmanName,
	Customer.CustomerName,
	Salesman.Commission,
	Salesman.City 
	
FROM Orders
JOIN Salesman ON Orders.SalesmanId = Salesman.SalesmanId 
JOIN Customer ON Orders.CustomerId = Customer.CustomerId
WHERE Customer.PurchaseAmount BETWEEN 500 AND 1500
ORDER BY Orders.Orderdate ;

--===================================================================================================================================================
--6. Using right join fetch all the results from Salesman and Orders table.

SELECT * 
FROM Salesman S
RIGHT JOIN Orders O ON S.SalesmanId = O.SalesmanId 
ORDER BY O.CustomerId;



--========================== Done ======================================================================================================================