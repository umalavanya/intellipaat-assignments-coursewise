--======== Assignment - 1========
-- By Umalavanya Chintapanti --
--================================
--Problem Statement
-- Consider yourself to be Sam who is a student at a prestigious university. you have enrolled for the SQL course and it is your first semester.
--Tasks to be Performed

--1. 
-- Install MS SQL SERVER -- DONE
--2. 
-- Give the difference between Char and Varchar datatype
--CHAR (fixed Length)
--VARCHAR (Variable Length)
--Difference Summary:
/*
/------------------------/-----------------------/----------------         /
/Aspect                  / CHAR                  / VARCHAR                  /
/------------------------/-----------------------/----------------          /
/Storage                 /Fixed Length           / Variable Length            /
/Padding                 /Pads with Spaces       / No Padding                /
/Performance             / Faster for Fixed data / Better for Variable Data   /
/Storage Efficiency      / Less Efficient        / More Efficient            /
/ Use Case               / Fixed Codes(M/F, Y/N) /Names, addresses           /
/
/
/
*/

--3.
--Explain the types of SQL commands

-- There are 5 types of SQL Commands
-- DDL, DML, DQL, DCL, and TCL

--DDL ----->  CREATE, ALTER, DROP, TRUNCATE
--DML ----->  INSERT, UPDATE, DELETE
--DQL ----->  SELECT
--DCL ----->  GRANT, REVOKE, DENY
--TCL ----->  TRANSACTION, COMMIT, ROLLBACK, SAVEPOINT


--4. 
--Explain NVARCHAR and NCHAR

-- Key Differences:
/*
| Aspect              | VARCHAR/CHAR           | NVARCHAR/NCHAR         |
|---------------------|------------------------|------------------------|
| Character Set       | Non-Unicode (ASCII)    | Unicode (UTF-16)       |
| Storage             | 1 byte per character   | 2 bytes per character  |
| Maximum Length      | 8000 chars (VARCHAR)   | 4000 chars (NVARCHAR)  |
|                     | 8000 chars (CHAR)      | 4000 chars (NCHAR)     |
| Use Case            | English text           | Multi-language text    |
| Performance         | Faster                 | Slower (more storage)  |
|---------------------|------------------------|------------------------|
*/


-- Practical Example:
CREATE TABLE UniversityRecords (
    -- For English-only data
    DepartmentCode CHAR(4),           -- Fixed length, English
    DepartmentName VARCHAR(50),       -- Variable length, English
    
    -- For multi-language data
    InternationalDeptCode NCHAR(4),   -- Fixed length, Unicode
    InternationalDeptName NVARCHAR(100) -- Variable length, Unicode
);

-- Storage calculation example:
/*
VARCHAR(50): 
- 'Sam' = 3 bytes (actual) + 2 bytes overhead = 5 bytes
- 'Samuel Jackson' = 14 bytes + 2 bytes overhead = 16 bytes

NVARCHAR(50):
- 'Sam' = 6 bytes (3 chars × 2) + 2 bytes overhead = 8 bytes
- 'संजय' = 6 bytes (3 chars × 2) + 2 bytes overhead = 8 bytes
*/


/*
Data Type Comparison Summary:

| Type      | Length      | Storage/Char | Unicode | Best For                          |
|-----------|-------------|--------------|---------|-----------------------------------|
| CHAR      | Fixed       | 1 byte       | No      | Codes, Abbreviations              |
| VARCHAR   | Variable    | 1 byte       | No      | English text, Variable data       |
| NCHAR     | Fixed       | 2 bytes      | Yes     | Fixed unicode codes               |
| NVARCHAR  | Variable    | 2 bytes      | Yes     | International text, Multi-language|
*/