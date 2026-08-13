--Dataset: Jomato
--About the dataset:
--You work for a data analytics company, and your client is a food delivery platform similar to Jomato. They have provided you with a dataset containing information about variousrestaurants in a city. Your task is to analyze this dataset using SQL queries to extract valuableinsights and generate reports for your client.Tasks to be performed:

--1. Create a stored procedure to display the restaurant name, type and cuisine where the table booking is not zero.
--2. Create a transaction and update the cuisine type ‘Cafe’ to ‘Cafeteria’. Check the resultand rollback it.
--3. Generate a row number column and find the top 5 areas with the highest rating of restaurants.
--4. Use the while loop to display the 1 to 50.
--5. Write a query to Create a Top rating view to store the generated top 5 highest rating ofrestaurants.
--6. Create a trigger that give a message whenever a new record is inserted.

-----------------------------------------------------
--1. Create a stored procedure to display the restaurant name, type and cuisine where the table booking is not zero.

CREATE PROCEDURE sp_filledTable AS
BEGIN
	SELECT 
		RestaurantName,
		RestaurantType,
		CuisinesType
	FROM
		Jomato
	WHERE TableBooking=1 ;
END
GO

EXEC sp_filledTable ;

---------------------------------------------------------------
--2. Create a transaction and update the cuisine type ‘Cafe’ to ‘Cafeteria’. Check the result and rollback it.

SELECT * FROM Jomato ;
BEGIN TRANSACTION ;

	UPDATE Jomato
	SET CuisinesType = 'Cafeteria'
	WHERE CuisinesType = 'Cafe'  ;

	SELECT 
		RestaurantName, 
		CuisinesType
	FROM 
		Jomato
	WHERE 
		CuisinesType IN ('Cafe','Cafeteria') ;

ROLLBACK TRANSACTION ;

SELECT 
		RestaurantName, 
		CuisinesType
	FROM 
		Jomato
	WHERE 
		CuisinesType IN ('Cafe','Cafeteria') ;

--3. Generate a row number column and find the top 5 areas with the highest rating of restaurants.

SELECT 
	Area,
	AvgRating,
	rowNum
FROM(
	SELECT 
		Area,
		AVG(Rating) AS AvgRating,
		ROW_NUMBER() OVER(ORDER BY AVG(Rating) DESC) AS rowNum
	FROM 
		Jomato
	GROUP BY Area
) rankedAreas
WHERE rowNum <= 5 ;

--4. Use the while loop to display the 1 to 50.

DECLARE @counter INT=1 ;

WHILE @counter <= 50
BEGIN
	PRINT @counter
	SET @counter = @counter+1 ;
END ;

--5. Write a query to Create a Top rating view to store the generated 
CREATE VIEW Top_rating_View AS
SELECT 
	RestaurantName,
	CuisinesType,
	Area,
	Rating,
	ROW_NUMBER() OVER (ORDER BY Rating DESC) AS overall_rank
FROM Jomato
WHERE Rating IS NOT NULL ;
	
--Using View
SELECT * FROM Top_rating_View ;


--6. Create a trigger that give a message whenever a new record is inserted.

CREATE TRIGGER trg_Jomato_Insert_Message 
ON Jomato
AFTER INSERT 
AS
BEGIN
	SET NOCOUNT ON ;
	PRINT 'A new restaurant recoed has been inserted successfully!' ;
END ;
GO