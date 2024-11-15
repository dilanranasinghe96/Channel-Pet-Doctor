# Database Setup Instructions for `channel_pet`

This README file provides step-by-step instructions and SQL code for setting up the `channel_pet` database and creating the necessary tables. Follow each step to configure your database environment correctly.

## Step 1: Create the Database

To start, you need to create the `channel_pet` database. Open your SQL client and execute the following commands:

```sql
-- Step 1: Create the channel_pet database
CREATE DATABASE channel_pet;

-- Switch to the channel_pet database to begin creating tables within it
USE channel_pet;

-- Step 2.1: Create the doctor table
CREATE TABLE doctor (
    name VARCHAR(255) NOT NULL,
    id_no INT PRIMARY KEY,
    area VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    mobile_no VARCHAR(15),
    password VARCHAR(255) NOT NULL
);


-- Step 2.2: Create the appointment table
CREATE TABLE appointment (
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(15),
    location VARCHAR(100),
    message TEXT,
    mediafile BLOB
);


-- Step 2.3: Create the medicine_list table
CREATE TABLE medicine_list (
    user_id INT,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(50),
    bill BLOB,
    mediafile BLOB,
    FOREIGN KEY (user_id) REFERENCES doctor(id_no) ON DELETE CASCADE
);


-- Step 2.4: Create the farmer table
CREATE TABLE farmer (
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(15),
    location VARCHAR(100),
    mobile_no VARCHAR(15),
    NIC_no VARCHAR(12) UNIQUE
);
