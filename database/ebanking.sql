/*CREATE DATABASE eBanking */

/*CREATE DATABASE eBanking */

CREATE TABLE Users (
    userId int NOT NULL primary key AUTO_INCREMENT,
    username varchar(50) unique not null,
    name varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) not null,
    password varchar(255) not null,
    gender varchar(20) check (gender in ('M', 'F', 'Other')),
    birthday datetime,
    CurrencyCode varchar(20) NOT NULL
);

CREATE TABLE applyonline (
    userId int NOT NULL primary key AUTO_INCREMENT,
    username varchar(50) unique not null,
    name varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) not null,
    password varchar(255) not null,
    package varchar(255) not null,
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
    AccountStatus varchar(50) NOT NULL,
    PRIMARY KEY (CurrentAccount),
    CONSTRAINT FK_User_Account FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);
CREATE TABLE savingsaccounts (
    SavingsType bigint NOT NULL,
    UserID int(11) NOT NULL,
    CurrencyCode varchar(20) NOT NULL,
    Balance decimal(18, 2) NOT NULL,
    AccountStatus varchar(50) NOT NULL,
    PRIMARY KEY (SavingsType),
    CONSTRAINT FK_User_Savings FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE SavingsHistory (
    SavingsHistoryID INT PRIMARY KEY AUTO_INCREMENT,
    CurrentAccountID BIGINT NOT NULL,
    FlexSaveAccountID BIGINT NOT NULL,
    TransactionAmount DECIMAL(18, 5) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_SavingsHistory_CurrentAccount FOREIGN KEY (CurrentAccountID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE,
    CONSTRAINT FK_SavingsHistory_Savingsaccount FOREIGN KEY (FlexSaveAccountID) REFERENCES savingsaccounts (SavingsType) ON DELETE CASCADE
);

CREATE TABLE AccessPermissions (
    PermissionID int NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    AccessLevel VARCHAR(50) NOT NULL,
    PRIMARY KEY (PermissionID),
    CONSTRAINT FK_User_AccessPermission FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE cards (
    CardID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    CurrentAccount BIGINT NOT NULL,
    CardNumber VARCHAR(16) NOT NULL,
    ValidFrom DATE DEFAULT NULL,
    ExpiryDate DATE NOT NULL,
    CardHolderName VARCHAR(100) NOT NULL,
    CardType VARCHAR(50) NOT NULL,
    CardStatus VARCHAR(50) NOT NULL,
    AvailableBalance DECIMAL(18, 2) DEFAULT NULL,
    PRIMARY KEY (CardID),
    CONSTRAINT FK_User_Card FOREIGN KEY (UserID) REFERENCES Users(userId) ON DELETE CASCADE,
    CONSTRAINT FK_CurrentAccount_Cards FOREIGN KEY (CurrentAccount) REFERENCES currentaccounts(CurrentAccount) ON DELETE CASCADE
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
(2, 'xentoro', 'xentoro', 'xentoro', 'xentoro@gmail.com', '$2a$10$Z14YcdLzpCsbJAU33RyG9.p9OEPj.BfZHXIM5.Y27QCTMjsjctxOS', 'M', '2024-05-11 00:00:00', 'EUR'),
(4, 'bani', 'bani', 'buja', 'bani@gmail.com', '$2b$10$XjWtyA0pNTHZ0nBGGYIUM.PvJ.irfS9SRFvj/SUEjnTw7YuetuzCO', 'M', '2024-05-09 00:00:00', 'EUR'),
(7, 'user', 'user', 'user', 'user@gmail.com', '$2b$10$NaD0NHdyG.f87CHp7hKHUO.vDnefBpghIMIXO.JtpLwS1bwLoeOeS', 'M', '2024-05-10 00:00:00', 'EUR'),
(8, 'elsa', 'elsa', 'elsa', 'elsa@gmail.com', '$2b$10$6HMjxDw6.ql6xKIV18L/uuB5Gwbj0wLbkAoRrz30.mGS9X3csmTX.', 'M', '2024-05-11 00:00:00', 'EUR');



INSERT INTO `accesspermissions` (`PermissionID`, `UserID`, `AccessLevel`) VALUES
(2, 2, 'Admin'),
(4, 4, 'Admin'),
(7, 7, 'User'),
(8, 8, 'Admin');


INSERT INTO `adresa` (`AdresaID`, `userId`, `Country`, `City`, `Street`) VALUES
(0, 2, 'xentoro', 'xentoro', 'xentoro'),
(0, 4, 'bani', 'bani', 'bani'),
(0, 7, 'user', 'user', 'user'),
(0, 8, 'elsa', 'elsa', 'elsa');





INSERT INTO `currencies` (`CurrencyID`, `UserID`, `CurrencyCode`, `ExchangeRate`) VALUES
(2, 2, 'EUR', 1.0000),
(4, 4, 'EUR', 1.0000),
(7, 7, 'EUR', 1.0000),
(8, 8, 'EUR', 1.0000);

INSERT INTO `currentaccounts` (`CurrentAccount`, `UserID`, `CurrencyCode`, `Balance`, `AccountStatus`) VALUES
(222222222, 2, 'EUR', 2000.00, 'Closed'),
(1110333326506512, 4, 'EUR', 50534.00, 'Open'),
(1110333373365772, 8, 'EUR', 350000.00, 'Open'),
(1110333378802226, 7, 'EUR', 20000.00, 'Open');



INSERT INTO `reports` (`ReportID`, `ReportType`, `GenerationDate`, `Description`) VALUES
(501, 'Transaction', '2024-04-22', 'Daily transaction report'),
(502, 'Balance', '2024-04-22', 'Monthly account balance report');



INSERT INTO `savingsaccounts` (`SavingsType`, `UserID`, `CurrencyCode`, `Balance`, `AccountStatus`) VALUES
(222222222, 2, 'EUR', 6000.00, 'Closed'),
(1110222239575769, 7, 'EUR', 0.00, 'Open'),
(1110222258159457, 8, 'EUR', 0.00, 'Open'),
(1110222286956095, 4, 'EUR', 0.00, 'Open');


INSERT INTO `cards` (`CardID`, `UserID`, `CurrentAccount`, `CardNumber`, `ValidFrom`, `ExpiryDate`, `CardHolderName`, `CardType`, `CardStatus`) VALUES
(2, 4, 1110333326506512, '5354794084453531', '2024-05-22', '2028-05-22', 'bani bani', 'DEBIT MASTER CARD', 'ACTIVE'),
(3, 7, 1110333378802226, '5354795151417938', '2024-05-22', '2028-05-22', 'user user', 'DEBIT MASTER CARD', 'ACTIVE'),
(4, 8, 1110333373365772, '5354777057644829', '2024-05-22', '2028-05-22', 'elsa elsa', 'DEBIT MASTER CARD', 'ACTIVE');
