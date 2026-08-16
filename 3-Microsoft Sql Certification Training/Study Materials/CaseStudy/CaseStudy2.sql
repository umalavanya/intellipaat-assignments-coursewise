USE master ;
DROP DATABASE IF EXISTS CaseStudyTwo ;
CREATE DATABASE CaseStudyTwo ;
USE CaseStudyTwo ;

CREATE TABLE Locations(
	Location_ID INT PRIMARY KEY,
    City VARCHAR(50)
) ;

SELECT * FROM Locations ;

INSERT INTO Locations VALUES (122, 'New York') ;
INSERT INTO Locations VALUES (123, 'Dallas') ;
INSERT INTO Locations VALUES (124, 'Chicago') ;
INSERT INTO Locations VALUES (167, 'Boston') ;


CREATE TABLE Department
(
	Department_ID INT PRIMARY KEY,
	DepName VARCHAR(100),
	Location_ID INT FOREIGN KEY REFERENCES Locations(Location_ID)
) ;

INSERT INTO Department VALUES ( 10, 'Accounting', 122) ;
INSERT INTO Department VALUES ( 20, 'Sales', 124) ;
INSERT INTO Department VALUES ( 30, 'Research', 123) ;
INSERT INTO Department VALUES ( 40, 'Operations', 167) ;


CREATE TABLE Job
(
	Job_ID INT PRIMARY KEY ,
	Designation VARCHAR(50)

)

INSERT INTO Job VALUES ( 667, 'Clerk') ;
INSERT INTO Job VALUES ( 668, 'Staff') ;
INSERT INTO Job VALUES ( 669, 'Analyst') ;
INSERT INTO Job VALUES ( 670, 'Sales Person') ;
INSERT INTO Job VALUES ( 671, 'Manager') ;
INSERT INTO Job VALUES ( 672, 'President') ;



CREATE TABLE Employee (
	Employee_ID INT PRIMARY KEY,
	Last_name VARCHAR(100),
	First_name VARCHAR(100),
	Middle_name VARCHAR(100),
	Job_ID INT FOREIGN KEY REFERENCES Job(Job_ID),
	HireDate DATE,
	Salary DECIMAL(10,2),
	Comm DECIMAL(5,2),
	Department_ID INT FOREIGN KEY REFERENCES Department(Department_ID)
) ;


INSERT INTO Employee VALUES(7369, 'Smith', 'John', 'Q', 667, '17-Dec-84', 800, Null, 20) ;
INSERT INTO Employee VALUES(7499, 'Allen', 'Kevin', 'J', 670, '20-Feb-85', 1600, 300, 30) ;
INSERT INTO Employee VALUES(755, 'Doyle', 'Jean', 'K', 671, '04-Apr-85', 2850, Null, 30) ;
INSERT INTO Employee VALUES(756, 'Dennis', 'Lynn', 'S', 671, '15-May-85', 2750, Null, 30) ;
INSERT INTO Employee VALUES(757, 'Baker', 'Leslie', 'D', 671, '10-Jun-85', 2200, Null, 40) ;
INSERT INTO Employee VALUES(7521, 'Wark', 'Cynthia', 'D', 670, '22-Feb-85', 1250, 50, 30) ;



-------------Simple Queries: ----------

--1. List all the employee details. 
SELECT * FROM Employee ;

--2. List all the department details. 
SELECT * FROM Department ;

--3. List all job details. 
SELECT * FROM Job ;
--4. List all the locations. 
SELECT * FROM Locations ;

--5. List out the First Name, Last Name, Salary, Commission for all Employees. 
SELECT
	First_name ,
	Last_name,
	Salary,
	Comm
FROM 
	Employee ;

--6. List out the Employee ID, Last Name, Department ID for all employees and  alias Employee ID as "ID of the Employee", Last Name as "Name of the  Employee", Department ID as "Dep_id". 

SELECT 
	Employee_ID AS "ID of the Employee",
	Last_name AS "Name of the Employee",
	Department_ID AS DEP_id 
FROM 
	Employee ;

---7. List out the annual salary of the employees with their names only. 


SELECT 
	First_name + ' ' + Last_name AS "Employee Name",
	Salary AS "Annual Salary"
FROM
	Employee ;


--------------WHERE Condition:---------------- 


--1. List the details about "Smith". 
SELECT * FROM Employee WHERE Last_name = 'Smith' ;

--2. List out the employees who are working in department 20. 
SELECT * FROM Employee 
WHERE Department_ID = 20 ;

--3. List out the employees who are earning salary between 2000 and 3000. 
SELECT *
FROM Employee
WHERE Salary BETWEEN 2000 AND 3000 ; 


--4. List out the employees who are working in department 10 or 20. 
SELECT *
FROM Employee
WHERE Department_ID IN (10,20);

--5. Find out the employees who are not working in department 10 or 30. 
SELECT *
FROM Employee
WHERE Department_ID NOT IN (10,30);

--6. List out the employees whose name starts with 'L'. 
SELECT *
FROM Employee
WHERE First_name LIKE 'L%' ;


--7. List out the employees whose name starts with 'L' and ends with 'E'. 
SELECT *
FROM Employee
WHERE First_name LIKE 'L%e' ;


--8. List out the employees whose name length is 4 and start with 'J'. 
SELECT *
FROM Employee
WHERE First_name LIKE 'J[a-z]' ;

--9. List out the employees who are working in department 30 and draw the salaries more than 2500. 
--10. List out the employees who are not receiving commission. 


--ORDER BY Clause: 
--1. List out the Employee ID and Last Name in ascending order based on the  Employee ID. 
--2. List out the Employee ID and Name in descending order based on salary. 
--3. List out the employee details according to their Last Name in ascending-order. 
--4. List out the employee details according to their Last Name in ascending 
--order and then Department ID in descending order. 


--GROUP BY and HAVING Clause: 
--1. List out the department wise maximum salary, minimum salary and average salary of the employees. 
--2. List out the job wise maximum salary, minimum salary and average salary of the employees. 
--3. List out the number of employees who joined each month in ascending order. 
--4. List out the number of employees for each month and year in ascending order based on the year and month. 
--5. List out the Department ID having at least four employees. 
--6. How many employees joined in February month. 
--7. How many employees joined in May or June month. 
--8. How many employees joined in 1985? 
--9. How many employees joined each month in 1985? 
--10. How many employees were joined in April 1985? 
--11. Which is the Department ID having greater than or equal to 3 employees joining in April 1985? 


--Joins: 
--1. List out employees with their department names. 
--2. Display employees with their designations. 
--3. Display the employees with their department names and city. 
--4. How many employees are working in different departments? Display with department names. 
--5. How many employees are working in the sales department? 
--6. Which is the department having greater than or equal to 3 employees and display the department names in  ascending order. 
--7. How many employees are working in 'Dallas'? 
--8. Display all employees in sales or operation departments. 


--CONDITIONAL STATEMENT 
--1. Display the employee details with salary grades. Use conditional statement to create a grade column. 
--2. List out the number of employees grade wise. Use conditional statement to create a grade column. 
--3. Display the employee salary grades and the number of employees between 2000 to 5000 range of salary.

--Subqueries: 
--1. Display the employees list who got the maximum salary. 
--2. Display the employees who are working in the sales department. 
--3. Display the employees who are working as 'Clerk'. 
--4. Display the list of employees who are living in 'Boston'. 
--5. Find out the number of employees working in the sales department. 
--6. Update the salaries of employees who are working as clerks on the basis of 10%. 
--7. Display the second highest salary drawing employee details. 
--8. List out the employees who earn more than every employee in department 30. 
--9. Find out which department has no employees. 
--10. Find out the employees who earn greater than the average salary for their department. 