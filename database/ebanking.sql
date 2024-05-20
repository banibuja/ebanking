/*CREATE DATABASE eBanking */

/*CREATE DATABASE eBanking */

CREATE TABLE Users (
    userId int NOT NULL primary key AUTO_INCREMENT,
    username varchar(50) unique not null,
    name varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) not null,
    password varchar(50) not null,
    gender varchar(20) check (gender in ('M', 'F', 'Other')),
    birthday datetime,
    CurrencyCode varchar(20) NOT NULL
);

CREATE TABLE Adresa (
    AdresaID int,
    userId INT NOT NULL,
    Country varchar(30) not null,
    City varchar(30) not null,
    Street varchar(30) not null,
    CONSTRAINT PK_AdresaID PRIMARY KEY (AdresaID, userId),
    CONSTRAINT UC_UserID_AdresaID UNIQUE (userId, AdresaID),
    CONSTRAINT FK_Adresa_Useri FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE currentaccounts (
    CurrentAccount bigint NOT NULL,
    UserID int(11) NOT NULL,
    CurrencyCode varchar(20) NOT NULL,
    Balance decimal(18, 2) NOT NULL,
    PRIMARY KEY (CurrentAccount),
    CONSTRAINT FK_User_Account FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);
CREATE TABLE savingsaccounts (
    SavingsType bigint NOT NULL,
    UserID int(11) NOT NULL,
    CurrencyCode varchar(20) NOT NULL,
    Balance decimal(18, 2) NOT NULL,
    PRIMARY KEY (SavingsType),
    CONSTRAINT FK_User_Savings FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);
CREATE TABLE AccessPermissions (
    PermissionID int NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    AccessLevel VARCHAR(50) NOT NULL,
    PRIMARY KEY (PermissionID),
    CONSTRAINT FK_User_AccessPermission FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE cards (
    CardID int(11) NOT NULL AUTO_INCREMENT,
    UserID int(11) NOT NULL,
    CardNumber varchar(16) NOT NULL,
    ValidFrom date DEFAULT NULL,
    ExpiryDate date NOT NULL,
    CardHolderName varchar(100) NOT NULL,
    CardType varchar(50) NOT NULL,
    CardStatus varchar(50) NOT NULL,
    AvailableBalance decimal(18, 2) DEFAULT NULL,
    PRIMARY KEY (CardID),
    KEY FK_User_Card (UserID),
    CONSTRAINT FK_User_Card FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE currencies (
    CurrencyID int(11) NOT NULL AUTO_INCREMENT,
    UserID int(11) NOT NULL,
    CurrencyCode varchar(3) NOT NULL,
    ExchangeRate decimal(18, 4) NOT NULL,
    PRIMARY KEY (CurrencyID),
    KEY FK_Currency_User (UserID),
    CONSTRAINT FK_Currency_User FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE Reports (
    ReportID int primary key AUTO_INCREMENT,
    ReportType VARCHAR(50) NOT NULL,
    GenerationDate DATE NOT NULL,
    Description TEXT
);



CREATE TABLE Loans (
    LoanID int primary key AUTO_INCREMENT,
    AccountID BIGINT NOT NULL,
    LoanAmount DECIMAL(18, 2) NOT NULL,
    LoanConditions TEXT,
    Status VARCHAR(50) NOT NULL,
    CONSTRAINT FK_Account_Loan FOREIGN KEY (AccountID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE
);

CREATE TABLE Investments (
    InvestmentID int primary key AUTO_INCREMENT,
    AccountID BIGINT NOT NULL,
    InvestmentType VARCHAR(50) NOT NULL,
    InvestmentAmount DECIMAL(18, 2) NOT NULL,
    CurrentEarnings DECIMAL(18, 2) NOT NULL,
    CONSTRAINT FK_Account_Investment FOREIGN KEY (AccountID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE
);



CREATE TABLE Notifications (
    NotificationID int primary key AUTO_INCREMENT,
    UserID INT NOT NULL,
    NotificationType VARCHAR(50) NOT NULL,
    Description TEXT,
    CreatedDate DATETIME NOT NULL,
    CONSTRAINT FK_User_Notification FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    SenderAccID BIGINT NOT NULL,
    ReceiverAccID BIGINT NOT NULL,
    TransactionType VARCHAR(50) NOT NULL,
    TransactionAmount DECIMAL(18, 5) NOT NULL,
    Currency VARCHAR(10) NOT NULL,
    Statusi boolean NOT NULL,
    AdditionalInfo TEXT,
    TransactionFee DECIMAL(18, 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Sender_Acc FOREIGN KEY (SenderAccID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE,
    CONSTRAINT FK_Receiver_Acc FOREIGN KEY (ReceiverAccID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE
);

CREATE TABLE TransactionAuthorizations (
    AuthorizationID INT PRIMARY KEY AUTO_INCREMENT,
    TransactionID INT NOT NULL,
    UserID INT NOT NULL,
    AuthorizationStatus VARCHAR(50) NOT NULL,
    AuthorizationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_TA_Transaction FOREIGN KEY (TransactionID) REFERENCES Transactions (TransactionID) ON DELETE CASCADE,
    CONSTRAINT FK_TA_User FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE Payments (
    PaymentID int primary key AUTO_INCREMENT,
    SenderAccountID BIGINT NOT NULL,
    ReceiverAccountID BIGINT NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    PaymentDate DATETIME NOT NULL,
    PaymentStatus VARCHAR(50) NOT NULL,
    CONSTRAINT FK_Sender_Account FOREIGN KEY (SenderAccountID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE,
    CONSTRAINT FK_Receiver_Account FOREIGN KEY (ReceiverAccountID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE
);

CREATE TABLE Retirements (
    RetirementID int primary key AUTO_INCREMENT,
    UserID INT NOT NULL,
    RetirementType VARCHAR(100) NOT NULL,
    Balance DECIMAL(18, 2) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE,
    CONSTRAINT FK_User_Retirement FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

-- CREATE TABLE accounts (
--     AccountID int(11) NOT NULL AUTO_INCREMENT,
--     UserID int(11) NOT NULL,
--     CurrentAccount varchar(50) NOT NULL,
--     SavingsAccount varchar(50) NOT NULL,
--     CurrencyCode varchar(20) NOT NULL,
--     PRIMARY KEY (AccountID),
--     KEY FK_User_Accountss (UserID),
--     CONSTRAINT FK_User_Accountss FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
-- );

CREATE TABLE ContactUs (
    ContactID int primary key AUTO_INCREMENT,
    UserID INT,
    ClientFirstName VARCHAR(50),
    ClientLastName VARCHAR(50),
    Subject VARCHAR(100) NOT NULL,
    Message TEXT NOT NULL,
    ContactDate DATETIME NOT NULL,
    CONSTRAINT FK_User_Contact FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE InvestmentsGoals (
    InvestmentGoalID int primary key AUTO_INCREMENT,
    UserID INT NOT NULL,
    GoalName VARCHAR(50) NOT NULL,
    GoalAmount DECIMAL(18, 2) NOT NULL,
    Deadline DATE NOT NULL,
    Impact INT NOT NULL,
    CONSTRAINT FK_User_InvestmentsGoals FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

INSERT INTO `users` (`userId`, `username`, `name`, `lastname`, `email`, `password`, `gender`, `birthday`, `CurrencyCode`) VALUES
(1, 'bani', 'bani', 'bani', 'bani@gmail.com', 'bani1234', 'M', '2004-02-29 00:00:00', 'EUR'),
(7, 'xentoro', 'xentoro', 'xentoro', 'xentoro@gmail.com', 'xentoro', 'M', '2024-05-11 00:00:00', 'EUR'),
(8, 'user', 'user', 'user', 'user@gmail.com', 'user', 'M', '2024-05-18 00:00:00', 'EUR');

-- Tabela Users
INSERT INTO `accesspermissions` (`PermissionID`, `UserID`, `AccessLevel`) VALUES
(923, 1, 'Admin'),
(929, 7, 'Admin'),
(930, 8, 'User');

-- Tabela Adresa
INSERT INTO `adresa` (`AdresaID`, `userId`, `Country`, `City`, `Street`) VALUES
(0, 1, 'bani', 'bani', 'bani'),
(0, 7, 'xentoro', 'xentoro', 'xentoro'),
(0, 8, 'user', 'user', 'user');

-- Tabela Accounts
INSERT INTO `cards` (`CardID`, `UserID`, `CardNumber`, `ValidFrom`, `ExpiryDate`, `CardHolderName`, `CardType`, `CardStatus`, `AvailableBalance`) VALUES
(315, 1, '5354730745629939', '2024-05-16', '2028-05-15', 'bani', 'DEBIT MASTER CARD', 'ACTIVE', 0.00),
(319, 7, '5354717708725505', '2024-05-20', '2028-05-20', 'xentoro xentoro', 'DEBIT MASTER CARD', 'ACTIVE', 0.00),
(320, 8, '5354762187015692', '2024-05-20', '2028-05-20', 'user user', 'DEBIT MASTER CARD', 'ACTIVE', 0.00);


-- Tabela Cards
INSERT INTO `currencies` (`CurrencyID`, `UserID`, `CurrencyCode`, `ExchangeRate`) VALUES
(5, 7, 'EUR', 1.0000),
(6, 8, 'EUR', 1.0000);

-- Tabela Currencies
INSERT INTO `currentaccounts` (`CurrentAccount`, `UserID`, `CurrencyCode`, `Balance`) VALUES
(1110333322429080, 1, 'USD', 15000.00),
(1110333377647573, 7, 'EUR', 25000.00),
(1110333388276400, 8, 'EUR', 3500.00);

-- Tabela Reports
INSERT INTO `reports` (`ReportID`, `ReportType`, `GenerationDate`, `Description`) VALUES
(501, 'Transaction', '2024-04-22', 'Daily transaction report'),
(502, 'Balance', '2024-04-22', 'Monthly account balance report');

-- Tabela SavingsAccounts
INSERT INTO `savingsaccounts` (`SavingsType`, `UserID`, `CurrencyCode`, `Balance`) VALUES
(1110222221564010, 8, 'EUR', 0.00000),
(1110222243416638, 1, 'EUR', 0.00000),
(1110222265790724, 7, 'EUR', 0.00000);


INSERT INTO `transactions` (`TransactionID`, `SenderAccID`, `ReceiverAccID`, `TransactionType`, `TransactionAmount`, `Currency`, `Statusi`, `AdditionalInfo`, `TransactionFee`, `CreatedAt`) VALUES
(1, 1110333322429080, 1110333377647573, 'zbbz', 1500.00000, 'Euro', 1, 'rroga', 0.00000, '2024-05-20 17:15:31');


INSERT INTO `investmentsgoals` (`InvestmentGoalID`, `UserID`, `GoalName`, `GoalAmount`, `Deadline`, `Impact`) VALUES
(1, 1, 'Retirement Fund', 500000.00, '2035-05-08', 62),
(2, 1, 'Buy a House', 2500000.00, '2028-05-08', 62),
(3, 1, 'College Fund', 1500000.00, '2030-05-08', 62);


