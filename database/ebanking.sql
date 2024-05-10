/*CREATE DATABASE eBanking */

create table Users (
userId int primary key AUTO_INCREMENT ,
username  varchar(50) unique not null, 
name varchar(50) not null,
lastname varchar(50) not null,
email varchar(50) not null,
password varchar(50) not null,
gender varchar(20) check (Gender in ('M', 'F', 'Other')),
birthday  datetime
);

create table Adresa( 
	AdresaID int ,
    userId INT NOT NULL,
	Country varchar(30) not null,
	City varchar(30) not null,
    Street varchar(30) not null,
    CONSTRAINT PK_AdresaID PRIMARY KEY (AdresaID, userId),
    CONSTRAINT UC_UserID_AdresaID UNIQUE (UserID, AdresaID),
    constraint FK_Adresa_Useri FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE Accounts (
    AccountID int primary key AUTO_INCREMENT ,
    UserID INT NOT NULL,
    CurrentAccount VARCHAR(50) NOT NULL,
    Balance DECIMAL(18, 5) NOT NULL,
    CONSTRAINT FK_User_Account FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);


CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    SenderAccID INT NOT NULL,
    ReceiverAccID INT NOT NULL,
    TransactionType VARCHAR(50) NOT NULL,
    TransactionAmount DECIMAL(18, 5) NOT NULL,
    Currency VARCHAR(10) NOT NULL,
    Statusi VARCHAR(20) NOT NULL,
    AdditionalInfo TEXT,
    TransactionFee DECIMAL(18, 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_SenderAcc_Account FOREIGN KEY (SenderAccID) REFERENCES Accounts(AccountID) ON DELETE CASCADE,
    CONSTRAINT FK_ReceiverAcc_Account FOREIGN KEY (ReceiverAccID) REFERENCES Accounts(AccountID) ON DELETE CASCADE
);

CREATE TABLE Cards (
    CardID int primary key AUTO_INCREMENT,
    UserID INT NOT NULL,
    CardNumber VARCHAR(16) NOT NULL,
    ExpiryDate DATE NOT NULL,
    CardHolderName VARCHAR(100) NOT NULL,
    CardType VARCHAR(50) NOT NULL,
    CardStatus VARCHAR(50) NOT NULL,
  /*  Limit DECIMAL(18, 2), */
    AvailableBalance DECIMAL(18, 2),
    CONSTRAINT FK_User_Card FOREIGN KEY (UserID) REFERENCES users(userId) ON DELETE CASCADE
);
CREATE TABLE Currencies (
    CurrencyID int primary key AUTO_INCREMENT,
    CurrencyCode VARCHAR(3) NOT NULL,
    ExchangeRate DECIMAL(18, 4) NOT NULL
);

CREATE TABLE Reports (
    ReportID int primary key AUTO_INCREMENT,
    ReportType VARCHAR(50) NOT NULL,
    GenerationDate DATE NOT NULL,
    Description TEXT
);
CREATE TABLE `savingsaccount` (
    `SavingsID` int(11) NOT NULL AUTO_INCREMENT,
    `UserID` int(11) NOT NULL,
    `FlexSaveAccount` varchar(50) NOT NULL,
    `Balance` decimal(18, 5) NOT NULL,
    PRIMARY KEY (`SavingsID`),
    KEY `FK_User_Savings` (`UserID`),
    CONSTRAINT `FK_User_Savings` FOREIGN KEY (`UserID`) REFERENCES `users` (`userId`) ON DELETE CASCADE
);

CREATE TABLE Loans (
    LoanID int primary key AUTO_INCREMENT,
    AccountID INT NOT NULL,
    LoanAmount DECIMAL(18, 2) NOT NULL,
    LoanConditions TEXT,
    Status VARCHAR(50) NOT NULL,
    CONSTRAINT FK_Account_Loan FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID) ON DELETE CASCADE
);
CREATE TABLE Investments (
    InvestmentID int primary key AUTO_INCREMENT,
    AccountID INT NOT NULL,
    InvestmentType VARCHAR(50) NOT NULL,
    InvestmentAmount DECIMAL(18, 2) NOT NULL,
    CurrentEarnings DECIMAL(18, 2) NOT NULL,
    CONSTRAINT FK_Account_Investment FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID) ON DELETE CASCADE
);
CREATE TABLE AccessPermissions (
    PermissionID int primary key AUTO_INCREMENT,
    UserID INT NOT NULL,
    AccessLevel VARCHAR(50) NOT NULL,
    CONSTRAINT FK_User_AccessPermission FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
CREATE TABLE Notifications (
    NotificationID int primary key AUTO_INCREMENT,
    UserID INT NOT NULL,
    NotificationType VARCHAR(50) NOT NULL,
    Description TEXT,
    CreatedDate DATETIME NOT NULL,
    CONSTRAINT FK_User_Notification FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    SenderAccID INT NOT NULL,
    ReceiverAccID INT NOT NULL,
    TransactionType VARCHAR(50) NOT NULL,
    TransactionAmount DECIMAL(18, 5) NOT NULL,
    Currency VARCHAR(10) NOT NULL,
    TransactionDate DATETIME NOT NULL,
    Statusi VARCHAR(20) NOT NULL,
    AdditionalInfo TEXT,
    TransactionFee DECIMAL(18, 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Sender_Account FOREIGN KEY (SenderAccID) REFERENCES Accounts(AccountID) ON DELETE CASCADE,
    CONSTRAINT FK_Receiver_Account FOREIGN KEY (ReceiverAccID) REFERENCES Accounts(AccountID) ON DELETE CASCADE
);
CREATE TABLE Payments (
    PaymentID int primary key AUTO_INCREMENT,
    SenderAccountID INT NOT NULL,
    ReceiverAccountID INT NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    PaymentDate DATETIME NOT NULL,
    PaymentStatus VARCHAR(50) NOT NULL,
    CONSTRAINT FK_Sender_Account FOREIGN KEY (SenderAccountID) REFERENCES Accounts(AccountID)  ON DELETE CASCADE,
    CONSTRAINT FK_Receiver_Account FOREIGN KEY (ReceiverAccountID) REFERENCES Accounts(AccountID)  ON DELETE CASCADE
);

CREATE TABLE Retirements (
    RetirementID int primary key AUTO_INCREMENT,
    UserID INT NOT NULL,
    RetirementType VARCHAR(100) NOT NULL,
    Balance DECIMAL(18, 2) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE,
    CONSTRAINT FK_User_Retirement FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);


  CREATE TABLE ContactUs (
    ContactID int primary key AUTO_INCREMENT,
    UserID INT,
    ClientFirstName VARCHAR(50),
    ClientLastName VARCHAR(50),
    Subject VARCHAR(100) NOT NULL,
    Message TEXT NOT NULL,
    ContactDate DATETIME NOT NULL,
    CONSTRAINT FK_User_Contact FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
    
-- Tabela Users
INSERT INTO Users (userId, username, name, lastname, email, password, gender, birthday)
VALUES 
(1, 'john_doe', 'John', 'Doe', 'john@example.com', 'password123', 'M', '1990-05-15'),
(2, 'jane_smith', 'Jane', 'Smith', 'jane@example.com', 'password456', 'F', '1992-08-20'),
(3, 'alex_williams', 'Alex', 'Williams', 'alex@example.com', 'password789', 'M', '1985-11-10');

-- Tabela Adresa
INSERT INTO Adresa (userId, Country, City, Street)
VALUES
(1, 'USA', 'New York', 'Broadway'),
(2, 'UK', 'London', 'Oxford Street'),
(3, 'Canada', 'Toronto', 'Bay Street');

-- Tabela Accounts
INSERT INTO Accounts (AccountID, UserID, AccountType, Balance)
VALUES
(101, 1, 'Checking', 5000.00),
(102, 2, 'Savings', 10000.00),
(103, 3, 'Investment', 15000.00);


-- Tabela Cards
INSERT INTO Cards (CardID, UserId, CardNumber, ExpiryDate, CardHolderName, CardType, CardStatus, AvailableBalance)
VALUES
(301, 1, '1234567812345678', '2026-12-31', 'John Doe', 'Debit', 'Active', 4000.00),
(302, 2, '8765432187654321', '2025-10-31', 'Jane Smith', 'Credit', 'Active', 8000.00);

-- Tabela Currencies
INSERT INTO Currencies (CurrencyID, CurrencyCode, ExchangeRate)
VALUES
(401, 'USD', 1.00),
(402, 'EUR', 0.85),
(403, 'GBP', 0.72);

-- Tabela Reports
INSERT INTO Reports (ReportID, ReportType, GenerationDate, Description)
VALUES
(501, 'Transaction', '2024-04-22', 'Daily transaction report'),
(502, 'Balance', '2024-04-22', 'Monthly account balance report');

-- Tabela SavingsAccounts
INSERT INTO SavingsAccounts (SavingsAccountID, AccountID, SavingsType, Balance)
VALUES
(601, 102, 'Regular', 9500.00),
(602, 102, 'Term', 500.00);

-- Tabela Loans
INSERT INTO Loans (LoanID, AccountID, LoanAmount, LoanConditions, Status)
VALUES
(701, 103, 2000.00, 'Interest rate: 5%', 'Active'),
(702, 103, 5000.00, 'Interest rate: 6%', 'Closed');

-- Tabela Investments
INSERT INTO Investments (InvestmentID, AccountID, InvestmentType, InvestmentAmount, CurrentEarnings)
VALUES
(801, 103, 'Stocks', 10000.00, 1500.00),
(802, 103, 'Bonds', 5000.00, 300.00);

-- Tabela AccessPermissions
INSERT INTO AccessPermissions (PermissionID, UserID, AccessLevel)
VALUES
(901, 1, 'Admin'),
(902, 2, 'User'),
(903, 3, 'User');

-- Tabela Notifications
INSERT INTO Notifications (NotificationID, UserID, NotificationType, Description, CreatedDate)
VALUES
(1001, 1, 'Transaction', 'New deposit of $1000.00', '2024-04-22 11:30:00'),
(1002, 2, 'Balance', 'Monthly account balance report available', '2024-04-22 09:00:00');

-- Tabela TransactionAuthorizations
INSERT INTO TransactionAuthorizations (AuthorizationID, TransactionID, UserID, AuthorizationStatus, AuthorizationDate)
VALUES
(1101, 201, 1, 'Approved', '2024-04-20 11:00:00'),
(1102, 203, 2, 'Pending', NULL);

-- Tabela Payments
INSERT INTO Payments (PaymentID, SenderAccountID, ReceiverAccountID, Amount, PaymentDate, PaymentStatus)
VALUES
(1201, 101, 102, 300.00, '2024-04-21 14:00:00', 'Completed'),
(1202, 102, 101, 100.00, '2024-04-22 10:00:00', 'Completed');

-- Tabela Retirements
INSERT INTO Retirements (RetirementID, UserID, RetirementType, Balance, StartDate, EndDate)
VALUES
(1301, 1, '401(k)', 50000.00, '2030-01-01', '2050-12-31'),
(1302, 2, 'Pension Fund', 75000.00, '2040-01-01', '2070-12-31');