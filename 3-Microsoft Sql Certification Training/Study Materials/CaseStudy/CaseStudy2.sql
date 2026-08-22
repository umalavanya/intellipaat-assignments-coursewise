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
WHERE First_name LIKE 'J___' ;


--9. List out the employees who are working in department 30 and draw the salaries more than 2500. 
SELECT * 
FROM Employee
WHERE Department_ID = 30 AND Salary > 2500 ;

--10. List out the employees who are not receiving commission. 
SELECT *
FROM Employee
WHERE Comm IS NULL ;

--ORDER BY Clause: 
--1. List out the Employee ID and Last Name in ascending order based on the  Employee ID. 
SELECT Employee_ID, Last_name
FROM Employee
ORDER BY Employee_ID ;

--2. List out the Employee ID and Name in descending order based on salary. 
SELECT Employee_ID, Salary
FROM Employee
ORDER BY Salary ;

--3. List out the employee details according to their Last Name in ascending-order. 
SELECT * 
FROM Employee
ORDER BY Last_name ;

--4. List out the employee details according to their Last Name in ascending order and then Department ID in descending order. 

SELECT * 
FROM Employee
ORDER BY Last_name,
         Department_ID DESC ;

--GROUP BY and HAVING Clause: 
--1. List out the department wise maximum salary, minimum salary and average salary of the employees. 
SELECT 
	Department_ID,
	MAX(Salary) AS Highest,
	MIN(Salary) AS Minimum,
	AVG(Salary) AS AVerage
FROM Employee
GROUP BY Department_ID ;

--2. List out the job wise maximum salary, minimum salary and average salary of the employees. 
SELECT 
	Job_ID,
	MAX(Salary) AS Highest,
	MIN(Salary) AS Minimum,
	AVG(Salary) AS AVerage
FROM Employee
GROUP BY Job_ID ;


--3. List out the number of employees who joined each month in ascending order. 
SELECT 
	MONTH(HireDate) AS 'MONTH',
	COUNT(*)
FROM EMPLOYEE 
GROUP BY MONTH(HireDate)
ORDER BY (MONTH) ;

--4. List out the number of employees for each month and year in ascending order based on the year and month. 
SELECT 
    YEAR(HireDate) AS 'Year',
	MONTH(HireDate) AS 'Month',
	COUNT(*)
FROM EMPLOYEE 
GROUP BY YEAR(HireDate), MONTH(HireDate)
ORDER BY Year, Month ;

--5. List out the Department ID having at least four employees. 
SELECT Department_ID
FROM EMPLOYEE
GROUP BY Department_ID 
HAVING COUNT(*) >= 4;

--6. How many employees joined in February month. 
SELECT 
	MONTH(HireDate) AS 'Month',
	COUNT(*)
FROM EMPLOYEE 
GROUP BY YEAR(HireDate), MONTH(HireDate)
HAVING MONTH(HireDate) = 2  ;

--7. How many employees joined in May or June month. 
SELECT 
    DATENAME(month, HireDate) AS 'Month',
    YEAR(HireDate) AS 'Year',
    COUNT(*) AS EmployeeCount
FROM EMPLOYEE 
GROUP BY YEAR(HireDate), MONTH(HireDate), DATENAME(month, HireDate)
HAVING MONTH(HireDate) IN (5, 6)
ORDER BY YEAR(HireDate), MONTH(HireDate);


--8. How many employees joined in 1985? 
SELECT 
	YEAR(HIREDATE) AS 'Year',
	COUNT(*) AS Employees
FROM Employee
GROUP BY YEAR(HIREDATE)
HAVING YEAR(HIREDATE) = 1985 ;


--9. How many employees joined each month in 1985? 
SELECT 
	YEAR(HireDate) AS 'Year',
	MONTH(HireDate) AS 'Month',
	COUNT(*) AS Employees
FROM Employee
GROUP BY YEAR(HIREDATE), MONTH(HireDate)
HAVING YEAR(HIREDATE) = 1985 ;


--10. How many employees were joined in April 1985? 
SELECT 
	YEAR(HireDate) AS 'Year',
	MONTH(HireDate) AS 'Month',
	COUNT(*) AS Employees
FROM Employee
GROUP BY YEAR(HIREDATE), MONTH(HireDate)
HAVING YEAR(HIREDATE) = 1985 AND MONTH(HireDate) = 4 ;

--11. Which is the Department ID having greater than or equal to 3 employees joining in April 1985? 
SELECT 
    Department_ID,
    COUNT(*) AS EmployeeCount
FROM Employee
WHERE YEAR(HireDate) = 1985 AND MONTH(HireDate) = 4
GROUP BY Department_ID
HAVING COUNT(*) >= 3
ORDER BY Department_ID;

--Joins: 
--1. List out employees with their department names. 
SELECT 
	e.First_name+' '+e.Last_name AS 'Employee Name',
	d.DepName
FROM Employee e
JOIN Department d ON e.Department_ID = d.Department_ID ;


--2. Display employees with their designations. 
SELECT 
	e.First_name+' '+e.Last_name AS 'Employee Name',
	j.Designation
FROM Employee e
JOIN Job j ON e.Job_ID = j.job_ID ;


--3. Display the employees with their department names and city. 
SELECT 
	e.First_name+' '+e.Last_name AS 'Employee Name',
	d.DepName AS 'Department Name',
	l.city  AS 'City'
FROM Employee e
JOIN Department d ON e.Department_ID = d.Department_ID
JOIN Locations l ON d.Location_ID = l.Location_ID ;

--4. How many employees are working in different departments? Display with department names. 
SELECT 
    d.DepName,
	COUNT(*) AS 'Number of Employees'
FROM 
	Employee e 
JOIN 
	Department d ON e.Department_ID = d.Department_ID 
GROUP BY d.DepName ;

--5. How many employees are working in the sales department?
SELECT 
    d.DepName,
	COUNT(*) AS 'Number of Employees'
FROM 
	Employee e 
JOIN 
	Department d ON e.Department_ID = d.Department_ID 
GROUP BY d.DepName 
HAVING d.Depname = 'Sales';



--6. Which is the department having greater than or equal to 3 employees and display the department names in  ascending order.
SELECT 
    d.DepName AS 'Department Name',
	COUNT(*) AS 'Number of Employees'
FROM 
	Employee e 
JOIN 
	Department d ON e.Department_ID = d.Department_ID 
GROUP BY d.DepName
HAVING COUNT(*) > 3 
ORDER BY 'Department Name' ;


--7. How many employees are working in 'Dallas'? 
SELECT 
     l.City,
	 COUNT(*) AS Employees
FROM Employee e
JOIN Department d ON e.department_ID = d.Department_ID
JOIN Locations l ON d.Location_ID = l.Location_ID 
GROUP BY l.City
HAVING l.City = 'Dallas';


--8. Display all employees in sales or operation departments. 
SELECT 
     d.DepName,
     COUNT(*) AS Employees
FROM Employee e
JOIN Department d ON e.department_ID = d.Department_ID
GROUP BY d.DepName
HAVING d.DepName='Sales' OR d.DepName='Research';


--CONDITIONAL STATEMENT 
--1. Display the employee details with salary grades. Use conditional statement to create a grade column. 
SELECT 
	CONCAT(First_name,' ',Last_name) AS 'Employee Name',
	CASE
		WHEN Salary > 5000 THEN 'Manager'
		WHEN Salary > 3000 THEN 'Team Leader'
		WHEN Salary > 1000 THEN 'General Employee'
		WHEN Salary > 500 THEN 'Cleaner'
		ELSE 'Intern/Other'
	END
	AS 'Grade'
FROM Employee;


--2. List out the number of employees grade wise. Use conditional statement to create a grade column.
WITH CTE_GradedEmployees AS 
(
	SELECT 
		CONCAT(First_name,' ',Last_name) AS 'Employee Name',
		CASE
			WHEN Salary > 5000 THEN 'Manager'
			WHEN Salary > 3000 THEN 'Team Leader'
			WHEN Salary > 1000 THEN 'General Employee'
			WHEN Salary > 500 THEN 'Cleaner'
			ELSE 'Intern/Other'
		END
		AS 'Grade'
	FROM Employee
) 
SELECT 
	Grade,
	COUNT(*) 
FROM CTE_GradedEmployees
GROUP BY Grade ;

--3. Display the employee salary grades and the number of employees between 2000 to 5000 range of salary.
WITH CTE_GradedEmployees AS 
(
	SELECT 
		CONCAT(First_name,' ',Last_name) AS 'Employee Name',
		CASE
			WHEN Salary > 5000 THEN 'Manager'
			WHEN Salary > 3000 THEN 'Team Leader'
			WHEN Salary > 1000 THEN 'General Employee'
			WHEN Salary > 500 THEN 'Cleaner'
			ELSE 'Intern/Other'
		END
		AS 'Grade',
		Salary
	FROM Employee
	
) 
SELECT 
	Grade,
	COUNT(*)  AS 'Employee Count'
FROM CTE_GradedEmployees
WHERE Salary BETWEEN 2000 AND 5000
GROUP BY Grade ;

--Subqueries: 
--1. Display the employees list who got the maximum salary. 
SELECT 
	TOP 1 WITH TIES 
	CONCAT(First_name, ' ', Last_name) AS 'Employee Name',
	Salary
FROM 
	Employee
ORDER BY Salary DESC ;
-------
SELECT 
	CONCAT(First_name,' ',Last_name) AS 'Employee Name',
	Salary 
FROM Employee 
WHERE 
	Salary = (SELECT MAX(Salary) FROM Employee) ;
-----------
WITH RankedEmployees AS (
    SELECT 
        CONCAT(First_name, ' ', Last_name) AS 'Employee Name',
        Salary,
        RANK() OVER (ORDER BY Salary DESC) AS SalaryRank
    FROM Employee
)
SELECT 
    'Employee Name',
    Salary
FROM RankedEmployees
WHERE SalaryRank = 1;


--2. Display the employees who are working in the sales department. 
SELECT 
	CONCAT(e.First_name,' ',e.Last_name) AS 'Employees in Sales'
FROM Employee e
WHERE e.Department_ID = (
	SELECT Department_ID
	FROM Department
	WHERE DepName = 'Sales'
)
--Alternative
SELECT 
	CONCAT(e.First_name,' ',e.Last_name) AS 'Employees in Sales'
FROM Employee e 
JOIN Department d ON e.Department_ID = d.Department_ID 
WHERE d.DepName = 'Sales' ;


--3. Display the employees who are working as 'Clerk'. 
SELECT 
	CONCAT(e.First_name, ' ', e.Last_name) AS 'Employee Name'
FROM Employee e
WHERE e.Job_ID = (
	SELECT Job_ID
	FROM Job
	WHERE Designation = 'Clerk'
	
)

--4. Display the list of employees who are living in 'Boston'. 
SELECT 
	CONCAT(e.First_name, ' ', e.Last_name) AS 'Employee Name'
FROM Employee e
WHERE Department_ID IN (
	SELECT Department_ID
	FROM Department
	WHERE Location_ID = (
		SELECT Location_ID
		FROM Locations
		WHERE City = 'Boston'
		)
) ;


-- Using Joins
SELECT 
	CONCAT(e.First_name, ' ', e.Last_name) AS 'Employee Name'
FROM Employee e
JOIN Department d ON e.Department_ID = d.Department_ID
JOIN Locations l ON d.Location_ID = l.Location_ID
WHERE l.City = 'Boston';

--5. Find out the number of employees working in the sales department.
SELECT 
	COUNT(*) AS 'Number of Employees'
FROM Employee
WHERE Department_ID = (
    SELECT Department_ID 
    FROM Department 
    WHERE DepName = 'Sales'
);

-- Alternative using JOIN
SELECT 
	COUNT(*) AS 'Number of Employees'
FROM Employee e
JOIN Department d ON e.Department_ID = d.Department_ID
WHERE d.DepName = 'Sales';

--6. Update the salaries of employees who are working as clerks on the basis of 10%. 


--7. Display the second highest salary drawing employee details. 


--8. List out the employees who earn more than every employee in department 30. 


--9. Find out which department has no employees. 


--10. Find out the employees who earn greater than the average salary for their department. 