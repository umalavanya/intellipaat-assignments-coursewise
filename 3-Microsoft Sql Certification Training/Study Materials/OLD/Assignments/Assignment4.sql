/*
Problem Statement:
You have successfully cleared your third semester. In the fourth semester you will
work with inbuilt functions and user-defined functions.


Tasks To Be Performed:
1. Use the inbuilt functions and find the minimum, maximum and average
amount from the orders table
2. Create a user-defined function which will multiply the given number with10
3. Use the case statement to check if 100 is less than 200, greater than 200
or equal to 200 and print the corresponding value.
4. Using a case statement, find the status of the amount. Set the status of the
amount as high amount, low amount or medium amount based upon the
condition.
5. Create a user-defined function, to fetch the amount greater than then given
input.

*/


SELECT 
	MIN(amount) AS Minimum,
	MAX(amount) AS Maximum,
	AVG(amount) AS Average
FROM 
	Orders ;


CREATE FUNCTION dbo.Multiply_with_ten
(
	@num INT
)
RETURNS INT
AS
BEGIN 
	DECLARE @RESULT INT ;
	SET @RESULT = @NUM * 10 ;
	RETURN @RESULT ;
END ;

SELECT dbo.Multiply_with_ten(23) AS RESULT ;

-----------------------------------------------

DECLARE @number1 INT = 200 ;
DECLARE @number2 INT = 200 ;
DECLARE @result VARCHAR(50) ;

SET @result = CASE
	WHEN @number1 < @number2 THEN 'Less than'
	WHEN @number2 > @number2 THEN 'Greater than' 
	WHEN @number2 = @number2 THEN 'Equal'
	ELSE 'Cannot be compared'
END ;

SELECT @result AS Comparision ;

--=============================================================

--Create samplr table

CREATE TABLE transactions (
	transaction_id INT PRIMARY KEY IDENTITY(1,1),
	customer_id INT,
	amount DECIMAL(10,2),
	transaction_date DATE
) ;

-- Insert sample data
INSERT INTO transactions (customer_id, amount, transaction_date) VALUES
(1, 150.00, '2024-01-15'),
(1, 450.00, '2024-01-16'),
(1, 1200.00, '2024-01-17'),
(2, 75.50, '2024-01-15'),
(2, 350.00, '2024-01-16'),
(3, 2500.00, '2024-01-17'),
(3, 500.00, '2024-01-18'),
(4, 300.00, '2024-01-15'),
(4, 650.00, '2024-01-16');


-- Using CASE statement to categorize amounts
SELECT *,
	CASE
		WHEN amount < 100 THEN 'Low'
		WHEN amount < 500 THEN 'Medium'
		ELSE 'High' 
	END AS Amount_Status 
FROM Transactions ;

IF OBJECT_ID('dbo.fn_fetch_high_amount', 'TF') IS NOT NULL
    DROP FUNCTION dbo.fn_fetch_amount;
GO

-- 2. Create the function
CREATE FUNCTION dbo.fn_fetch_amount(@SampleAmount DECIMAL(10,2))
RETURNS TABLE
AS
RETURN (
    SELECT t.* ,
	CASE 
		WHEN Amount < 100 THEN 'LOW'
		WHEN Amount < 500 THEN 'Medium'
		ELSE 'High'
	END AS Amount_status

    FROM transactions t
    WHERE amount > @SampleAmount
);
GO

-- 3. CORRECT WAY: Call the function in FROM clause
SELECT * FROM dbo.fn_fetch_amount(50.00);