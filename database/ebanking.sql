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
    CurrencyCode varchar(20) NOT NULL,
    profilePicture longblob,
    Status VARCHAR(20)
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
    Country varchar(30) not null,
    City varchar(30) not null,
    Street varchar(30) not null,
    backPhoto longblob,
    frontPhoto longblob,
    Status VARCHAR(20)

    
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
(4, 'bani', 'bani', 'buja', 'bani@gmail.com', '$2b$10$XjWtyA0pNTHZ0nBGGYIUM.PvJ.irfS9SRFvj/SUEjnTw7YuetuzCO', 'M', '2024-05-09 00:00:00', 'EUR');



INSERT INTO `accesspermissions` (`PermissionID`, `UserID`, `AccessLevel`) VALUES
(2, 2, 'Admin');


