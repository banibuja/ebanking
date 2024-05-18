/*CREATE DATABASE eBanking */

create table Users (
userId int primary key AUTO_INCREMENT ,
username  varchar(50) unique not null, 
name varchar(50) not null,
lastname varchar(50) not null,
email varchar(50) not null,
password varchar(50) not null,
gender varchar(20) check (Gender in ('M', 'F', 'Other')),
birthday  datetime,
`CurrencyCode` varchar(20) NOT NULL

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

CREATE TABLE `currentaccounts` (
    `AccountID` int(11) NOT NULL AUTO_INCREMENT,
    `UserID` int(11) NOT NULL,
    `CurrentAccount` varchar(50) NOT NULL,
    `CurrencyCode` varchar(20) NOT NULL,
    `Balance` decimal(18, 5) NOT NULL,
    PRIMARY KEY (`AccountID`),
    KEY `FK_User_Account` (`UserID`),
    CONSTRAINT `FK_User_Account` FOREIGN KEY (`UserID`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ;

CREATE TABLE `cards` (
    `CardID` int(11) NOT NULL AUTO_INCREMENT,
    `UserID` int(11) NOT NULL,
    `CardNumber` varchar(16) NOT NULL,
    `ValidFrom` date DEFAULT NULL,
    `ExpiryDate` date NOT NULL,
    `CardHolderName` varchar(100) NOT NULL,
    `CardType` varchar(50) NOT NULL,
    `CardStatus` varchar(50) NOT NULL,
    `AvailableBalance` decimal(18, 2) DEFAULT NULL,
    PRIMARY KEY (`CardID`),
    KEY `FK_User_Card` (`UserID`),
    CONSTRAINT `FK_User_Card` FOREIGN KEY (`UserID`) REFERENCES `users` (`userId`) ON DELETE CASCADE
);
CREATE TABLE `currencies` (
    `CurrencyID` int(11) NOT NULL AUTO_INCREMENT,
    `UserID` int(11) NOT NULL,
    `CurrencyCode` varchar(3) NOT NULL,
    `ExchangeRate` decimal(18, 4) NOT NULL,
    PRIMARY KEY (`CurrencyID`),
    KEY `FK_Currency_User` (`UserID`),
    CONSTRAINT `FK_Currency_User` FOREIGN KEY (`UserID`) REFERENCES `users` (`userId`) ON DELETE CASCADE
);

CREATE TABLE Reports (
    ReportID int primary key AUTO_INCREMENT,
    ReportType VARCHAR(50) NOT NULL,
    GenerationDate DATE NOT NULL,
    Description TEXT
);
CREATE TABLE `savingsaccounts` (
    `SavingsID` int(11) NOT NULL AUTO_INCREMENT,
    `UserID` int(11) NOT NULL,
    `SavingsType` varchar(50) NOT NULL,
    `CurrencyCode` varchar(20) NOT NULL,
    `Balance` decimal(18, 5) NOT NULL,
    PRIMARY KEY (`SavingsID`),
    KEY `FK_User_Savings` (`UserID`),
    CONSTRAINT `FK_User_Savings` FOREIGN KEY (`UserID`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ;
CREATE TABLE Loans (
    LoanID int primary key AUTO_INCREMENT,
    AccountID INT NOT NULL,
    LoanAmount DECIMAL(18, 2) NOT NULL,
    LoanConditions TEXT,
    Status VARCHAR(50) NOT NULL,
CONSTRAINT FK_Account_Loan FOREIGN KEY (AccountID) REFERENCES currentaccounts(AccountID) ON DELETE CASCADE
);
CREATE TABLE Investments (
    InvestmentID int primary key AUTO_INCREMENT,
    AccountID INT NOT NULL,
    InvestmentType VARCHAR(50) NOT NULL,
    InvestmentAmount DECIMAL(18, 2) NOT NULL,
    CurrentEarnings DECIMAL(18, 2) NOT NULL,
    CONSTRAINT FK_Account_Investment FOREIGN KEY (AccountID) REFERENCES currentaccounts(AccountID) ON DELETE CASCADE
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
    Statusi VARCHAR(20) NOT NULL,
    AdditionalInfo TEXT,
    TransactionFee DECIMAL(18, 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Sender_Acc FOREIGN KEY (SenderAccID) REFERENCES currentaccounts(AccountID) ON DELETE CASCADE,
    CONSTRAINT FK_Receiver_Acc FOREIGN KEY (ReceiverAccID) REFERENCES currentaccounts(AccountID) ON DELETE CASCADE
);

CREATE TABLE TransactionAuthorizations (
    AuthorizationID INT PRIMARY KEY AUTO_INCREMENT, 
    TransactionID INT NOT NULL, 
    UserID INT NOT NULL, 
    AuthorizationStatus VARCHAR(50) NOT NULL, 
    AuthorizationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_TA_Transaction FOREIGN KEY (TransactionID) REFERENCES Transactions(TransactionID) ON DELETE CASCADE,
    CONSTRAINT FK_TA_User FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE Payments (
    PaymentID int primary key AUTO_INCREMENT,
    SenderAccountID INT NOT NULL,
    ReceiverAccountID INT NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    PaymentDate DATETIME NOT NULL,
    PaymentStatus VARCHAR(50) NOT NULL,
    CONSTRAINT FK_Sender_Account FOREIGN KEY (SenderAccountID) REFERENCES currentaccounts(AccountID)  ON DELETE CASCADE,
    CONSTRAINT FK_Receiver_Account FOREIGN KEY (ReceiverAccountID) REFERENCES currentaccounts(AccountID)  ON DELETE CASCADE
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
CREATE TABLE `accounts` (
    `AccountID` int(11) NOT NULL AUTO_INCREMENT,
    `UserID` int(11) NOT NULL,
    `CurrentAccount` varchar(50) NOT NULL,
    `SavingsAccount` varchar(50) NOT NULL,
    `CurrencyCode` varchar(20) NOT NULL,
    PRIMARY KEY (`AccountID`),
    KEY `FK_User_Accountss` (`UserID`),
    CONSTRAINT `FK_User_Accountss` FOREIGN KEY (`UserID`) REFERENCES `users` (`userId`) ON DELETE CASCADE
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
    CREATE TABLE InvestmentsGoals (
        InvestmentGoalID int primary key AUTO_INCREMENT,
        UserID INT NOT NULL,
        GoalName VARCHAR(50) NOT NULL,
        GoalAmount DECIMAL(18, 2) NOT NULL,
        Deadline DATE NOT NULL,
        Impact INT NOT NULL,
        constraint FK_User_InvestmentsGoals FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
        
 );

INSERT INTO `users` (`username`, `name`, `lastname`, `email`, `password`, `gender`, `birthday`, `CurrencyCode`) VALUES
('bani', 'bani', 'bani', 'bani@gmail.com', 'bani1234', 'M', '2004-02-29 00:00:00', 'EUR'),
('xentoro', 'dior', 'hyseni', 'dior_hyseni@gmail.com', 'xentoro', 'M', '2004-02-29 00:00:00', 'EUR'),
('user', 'user', 'user', 'user@gmail.com', 'user', 'M', '2024-05-19 00:00:00', 'USD');
    
-- Tabela Users
INSERT INTO `accesspermissions` (`PermissionID`, `UserID`, `AccessLevel`) VALUES
(923, 1, 'Admin'),
(923, 2, 'Admin'),
(924, 3, 'User');

-- Tabela Adresa
INSERT INTO `adresa` (`userId`, `Country`, `City`, `Street`) VALUES
(26, 'bani', 'bani', 'bani'),
(27, 'user', 'user', 'user');

-- Tabela Accounts
INSERT INTO `cards` (`CardID`, `UserID`, `CardNumber`, `ValidFrom`, `ExpiryDate`, `CardHolderName`, `CardType`, `CardStatus`, `AvailableBalance`) VALUES
(315, 26, '5354730745629939', '2024-05-16', '2028-05-15', 'bani', 'DEBIT MASTER CARD', 'ACTIVE', 0.00),
(316, 27, '5354737989116256', '2024-05-16', '2028-05-16', 'user', 'DEBIT MASTER CARD', 'ACTIVE', 0.00);


-- Tabela Cards
INSERT INTO `currencies` (`UserID`, `CurrencyCode`, `ExchangeRate`) VALUES
(26, 'EUR', 1.0000),
(27, 'USD', 1.0000);

-- Tabela Currencies
INSERT INTO `currentaccounts` (`AccountID`, `UserID`, `CurrentAccount`, `CurrencyCode`, `Balance`) VALUES
(122, 26, '1110333377416494', 'EUR', 0.00000),
(123, 27, '1110333322429080', 'USD', 0.00000);

-- Tabela Reports
INSERT INTO Reports (ReportID, ReportType, GenerationDate, Description)
VALUES
(501, 'Transaction', '2024-04-22', 'Daily transaction report'),
(502, 'Balance', '2024-04-22', 'Monthly account balance report');

-- Tabela SavingsAccounts
INSERT INTO `savingsaccounts` (`SavingsID`, `UserID`, `SavingsType`, `CurrencyCode`, `Balance`) VALUES
(50, 26, '1110222243416638', 'EUR', 0.00000),
(51, 27, '1110222287108464', 'USD', 0.00000);

