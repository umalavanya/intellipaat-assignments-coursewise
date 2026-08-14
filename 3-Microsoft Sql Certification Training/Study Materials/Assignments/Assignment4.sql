/*
Problem Statement:
You have successfully cleared your third semester. In the fourth semester you will
work with inbuilt functions and user-defined functions.


Tasks To Be Performed:
1. Use the inbuilt functions and find the minimum, maximum and average
amount from the orders table
2. Create a user-defined function which will multiply the given number with 10
3. Use the case statement to check if 100 is less than 200, greater than 200
or equal to 200 and print the corresponding value.
4. Using a case statement, find the status of the amount. Set the status of the
amount as high amount, low amount or medium amount based upon the
condition.
5. Create a user-defined function, to fetch the amount greater than the given
input.

*/
USE sqlassignments ;
--1.
SELECT 
	MIN(amount) AS Minimum,
	MAX(amount) AS Maximum,
	AVG(amount) AS Average
FROM 
	Orders ;

--2.

GO ;
CREATE FUNCTION dbo.Multiply_with_ten
(
	@NUM INT
)
RETURNS INT
AS
BEGIN 
	DECLARE @RESULT INT ;
	SET @RESULT = @NUM * 10 ;
	RETURN @RESULT ;
END ;
GO ;
SELECT dbo.Multiply_with_ten(23) AS RESULT ;

-----------------------------------------------
--3.
DECLARE @number1 INT = 100 ;
DECLARE @number2 INT = 200 ;
DECLARE @result VARCHAR(50) ;

SET @result = CASE
	WHEN @number1 < @number2 THEN 'Less than 200'
	WHEN @number2 > @number2 THEN 'Greater than 200' 
	WHEN @number2 = @number2 THEN 'Equal to 200'
	ELSE 'Cannot be compared'
END ;

SELECT @number1 AS Number, @result AS Comparision ;

--=============================================================
SELECT * FROM orders ;

-- Using CASE statement to categorize amounts
SELECT *,
	CASE
		WHEN amount < 600 THEN 'Low'
		WHEN amount < 1600 THEN 'Medium'
		ELSE 'High' 
	END AS Amount_Status 
FROM Orders ;
--==================================================
-- 2. Create the function
IF OBJECT_ID('dbo.fn_fetch_amount', 'FN') IS NOT NULL
    DROP FUNCTION dbo.fn_fetch_amount;
GO ;
CREATE FUNCTION dbo.fn_fetch_amount
(
	@limit DECIMAL(10,2)
)
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM Orders
	WHERE amount > @limit 
) ;

GO 

SELECT * FROM dbo.fn_fetch_amount(1000.00) ;
GO ;

SELECT 
    name,
    type,
    type_desc,
    schema_name(schema_id) AS schema_name
FROM sys.objects 
WHERE name = 'fn_fetch_amount';