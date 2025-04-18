# CNPM# CNPM Database Setup Guide

This repository contains SQL scripts for setting up an eLearning platform database. Follow these instructions to set up the database correctly.

## Prerequisites

- Microsoft SQL Server (2016 or later)
- SQL Server Management Studio (SSMS) or another SQL client

## Database Setup Steps

Follow these steps in order to set up the database correctly:

1. **Create Database Tables**
   - Run [`data/table.sql`](data/table.sql) first to create all database tables and establish relationships

2. **Create Stored Procedures**
   - Run [`data/procedure.sql`](data/procedure.sql) to create stored procedures for CRUD operations
   - Run [`data/select-proc.sql`](data/select-proc.sql) to create stored procedures for querying data

3. **Data Fixes** (Optional)
   - Run [`data/insert.sql`](data/insert.sql) if you need to add the IsHiden column to the Course table

4. **Generate Mock Data** (Optional)
   - Run [`data/mockdata.py`](data/mockdata.py) to generate sample course data:
     ```
     python data/mockdata.py
     ```
   - This will create an `output.sql` file with sample course creation commands

## Database Structure

The database structure is defined in [`data/database.txt`](data/database.txt) for reference. This file shows the database schema design including:
- Tables
- Relationships
- Enumerations
- Data types

## Available Queries

Example queries for common operations can be found in [`data/query.sql`](data/query.sql).

## Troubleshooting

If you encounter any issues during setup:
1. Ensure you have proper permissions to create tables and stored procedures
2. Check for any error messages in the SQL Server output
3. Make sure you're running the scripts in the correct order

## Contact

For questions or issues, please open an issue in this repository.