/*

Problem Statement:
You have successfully cleared your fourth semester. In the fifth semester you will
work with clauses and SET operators.
Tasks To Be Performed:
1. Arrange the ‘Orders’ dataset in decreasing order of amount
2. Create a table with the name ‘Employee_details1’ consisting of these
columns: ‘Emp_id’, ‘Emp_name’, ‘Emp_salary’. Create another table with
the name ‘Employee_details2’ consisting of the same columns as the first
table.
3. Apply the UNION operator on these two tables
4. Apply the INTERSECT operator on these two tables
5. Apply the EXCEPT operator on these two tables

*/

SELECT * FROM Orders ORDER BY Amount DESC ;

CREATE TABLE Employee_details1(
Emp_id INT PRIMARY KEY IDENTITY(1,1),
Emp_name VARCHAR(100),
Emp_salary DECIMAL(10,2)
) ;

SELECT * INTO Employee_details2 FROM Employee_details1 ;

SELECT * FROM Employee_details1 
UNION
SELECT * FROM Employee_details2 ;



SELECT * FROM Employee_details1 
INTERSECT
SELECT * FROM Employee_details2 ;

SELECT * FROM Employee_details1 
EXCEPT
SELECT * FROM Employee_details2 ;

