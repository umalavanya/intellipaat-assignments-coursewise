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
--================= Answers ====================

--1.
CREATE VIEW customer_san_jose AS
SELECT * 
FROM customer
WHERE city = 'San Jose' ;

SELECT * FROM customer_san_jose ;


--2.
SELECT * FROM customer WHERE last_name = 'Miller';

BEGIN TRANSACTION ;

	UPDATE customer
		SET first_name = 'Francis'
		WHERE last_name = 'Miller' ;

	SELECT * FROM customer WHERE last_name = 'Miller' ;

ROLLBACK TRANSACTION ;

	SELECT * FROM customer WHERE last_name = 'Miller' ;
BEGIN TRANSACTION ;
	UPDATE customer
		SET first_name = 'Alex'
		WHERE last_name = 'Miller'

	SELECT * FROM customer WHERE last_name = 'Miller';

COMMIT TRANSACTION ;


--==================================

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
DELETE FROM Orders WHERE Order_ID = 6 ;

SELECT * FROM Orders ;

BEGIN TRANSACTION ;
	PRINT 'Transaction started. @@TRANCOUNT ='+CAST(@@TRANCOUNT AS VARCHAR) ;
	SET IDENTITY_INSERT Orders ON;
	INSERT INTO Orders (order_id, order_date, amount, customer_id )
	VALUES
	(6, '2026-01-17', 500.00,4) ;

	SELECT * FROM Orders ;

	SAVE TRANSACTION SavePoint1 ;

	INSERT INTO Orders (order_id, order_date, amount, customer_id )
	VALUES
	(7, '2026-01-18', 600.00,5) ;
	ROLLBACK TRANSACTION  SavePoint1;
COMMIT ;
SELECT * FROM Orders ;
SET IDENTITY_INSERT Orders OFF ;

--=====================================
