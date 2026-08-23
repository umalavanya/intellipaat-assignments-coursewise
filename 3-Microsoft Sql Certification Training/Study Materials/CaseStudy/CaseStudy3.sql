--Problem Statement:
--You are the database developer of an international bank. You are responsible for managing the bank’s database. 
--You want to use the data to answer a few questions about your customers regarding withdrawal, deposit and so on, especially about the transaction amount on a particular date across various regions of the world. 
--Perform SQL queries to get the key insights of a customer.

--Dataset:

--The 3 key datasets for this case study are:
--a. Continent: The Continent table has two attributes i.e., region_id and region_name, where region_name consists of different continents such as Asia, Europe, Africa etc., assigned with the unique region id.
--b. Customers: The Customers table has four attributes named customer_id, region_id, start_date and end_date which consists of 3500 records.
--c. Transaction: Finally, the Transaction table contains around 5850 records and has four attributes named customer_id, txn_date, txn_type and txn_amount.
--

--Create Database
DROP DATABASE IF EXISTS CaseStudyThree ;
CREATE DATABASE CaseStudyThree ;
USE CaseStudyThree ;


-- Create Continent Table
CREATE TABLE Continent (
    region_id INT PRIMARY KEY,
    region_name VARCHAR(50) NOT NULL
);

-- Insert sample data for Continent
INSERT INTO Continent VALUES 
(1, 'Asia'),
(2, 'Europe'),
(3, 'Africa'),
(4, 'North America'),
(5, 'South America'),
(6, 'Australia'),
(7, 'Antarctica');

-- Create Customers Table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    region_id INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (region_id) REFERENCES Continent(region_id)
);

-- Create Transaction Table
CREATE TABLE Transactions (
    customer_id INT,
    txn_date DATE,
    txn_type VARCHAR(20),
    txn_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Sample data insertion (generating realistic data)
-- Note: In a real scenario, you'd have 3500 customers and 5850 transactions
-- Here's sample data for testing:

-- Insert sample customers
INSERT INTO Customers VALUES 
(1, 1, '2019-01-15', '2023-12-31'),
(2, 2, '2018-06-20', '2024-01-15'),
(3, 3, '2020-03-10', '2023-11-30'),
(4, 1, '2019-08-05', '2024-02-28'),
(5, 4, '2020-01-01', '2024-03-31'),
(6, 2, '2017-11-12', '2023-10-15'),
(7, 5, '2020-02-15', '2024-04-30'),
(8, 1, '2018-09-25', '2023-12-31'),
(9, 3, '2020-05-20', '2024-01-15'),
(10, 4, '2019-07-10', '2024-02-28');

-- Insert sample transactions
INSERT INTO Transactions VALUES 
(1, '2020-01-15', 'Deposit', 2500.00),
(1, '2020-03-20', 'Withdrawal', 500.00),
(2, '2020-02-10', 'Deposit', 1500.00),
(2, '2020-05-15', 'Withdrawal', 200.00),
(3, '2020-06-01', 'Purchase', 3500.00),
(3, '2020-07-15', 'Deposit', 4500.00),
(4, '2020-08-20', 'Withdrawal', 300.00),
(4, '2020-09-10', 'Deposit', 1800.00),
(5, '2020-10-05', 'Purchase', 2200.00),
(5, '2020-11-15', 'Deposit', 5000.00),
(6, '2020-12-01', 'Withdrawal', 400.00),
(6, '2020-12-20', 'Deposit', 3200.00),
(7, '2020-01-25', 'Purchase', 4500.00),
(8, '2020-02-28', 'Deposit', 2800.00),
(9, '2020-03-15', 'Withdrawal', 150.00),
(10, '2020-04-20', 'Deposit', 6000.00);

--1. Display the count of customers in each region who have done the transaction in the year 2020.
SELECT 
	c.region_id,
	con.region_name
	COUNT(DISTINCT t.customer_id) AS customer_count
FROM Transactions t
JOIN Customers c ON t.customer_id = c.customer_id
JOIN Continent con ON c.region_id = con.region_id 
WHERE YEAR(t.txn_date) = 2020
GROUP BY c.region_id, con.region_name
ORDER BY customer_count DESC ;

--2. Display the maximum and minimum transaction amount of each transaction type.


--3. Display the customer id, region name and transaction amount where transaction type is deposit and transaction amount > 2000.
--4. Find duplicate records in the Customer table.
--5. Display the customer id, region name, transaction type and transaction amount for the minimum transaction amount in deposit.
--6. Create a stored procedure to display details of customers in the Transaction table where the transaction date is greater than Jun 2020.
--7. Create a stored procedure to insert a record in the Continent table.
--8. Create a stored procedure to display the details of transactions that happened on a specific day.
--9. Create a user defined function to add 10% of the transaction amount in a table.
--10. Create a user defined function to find the total transaction amount for a given transaction type.
--11. Create a table value function which comprises the columns customer_id, region_id ,txn_date , txn_type , txn_amount which will retrieve data from the above table.
--12. Create a TRY...CATCH block to print a region id and region name in a single column.
--13. Create a TRY...CATCH block to insert a value in the Continent table.
--14. Create a trigger to prevent deleting a table in a database.
--15. Create a trigger to audit the data in a table.
--16. Create a trigger to prevent login of the same user id in multiple pages.
--17. Display top n customers on the basis of transaction type.
--18. Create a pivot table to display the total purchase, withdrawal and deposit for all the customers