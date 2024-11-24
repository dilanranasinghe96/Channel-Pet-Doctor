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
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,
    id_no INT UNIQUE,  
    area VARCHAR(100),
    email VARCHAR(191) UNIQUE,
    mobile_no VARCHAR(15),
    password VARCHAR(255) NOT NULL
);


-- Step 2.2: Create the appointment table
CREATE TABLE appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    message TEXT,
    animal_image BLOB,
    appointment_datetime DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'canceled') DEFAULT 'pending',
    updated_by INT,  -- Foreign key referencing the doctor who updated the status
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES doctor(id)  -- Foreign key constraint
);



-- Step 2.3: Create the medicine_list table
CREATE TABLE medicine_list (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique identifier for each medicine entry
    user_id INT NOT NULL,                      -- Foreign key referencing the doctor prescribing the medicine
    appointment_id INT NOT NULL,               -- Foreign key linking this medicine to a specific appointment
    medicine_name VARCHAR(255) NOT NULL,       -- Name of the prescribed medicine
    dosage VARCHAR(50),                        -- Dosage information (e.g., "500 mg", "Twice daily")
    quantity INT NOT NULL,                     -- Quantity prescribed
    bill_amount DECIMAL(10, 2) NOT NULL,       -- Total bill amount (currency format)
    bill BLOB,                                 -- Binary data for bill image or PDF
    mediafile BLOB,                            -- Any additional media related to the prescription (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set timestamp when record is created
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, -- Updated when record changes
    FOREIGN KEY (user_id) REFERENCES doctor(id) ON DELETE CASCADE, -- Maintains referential integrity
    FOREIGN KEY (appointment_id) REFERENCES appointment(id) ON DELETE CASCADE -- Links to appointment
);




-- Step 2.4: Create the farmer table
CREATE TABLE farmer (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incrementing unique ID
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(15),
    location VARCHAR(100),
    mobile_no VARCHAR(15),
    NIC_no VARCHAR(12) UNIQUE,
    password VARCHAR(255) NOT NULL
);

