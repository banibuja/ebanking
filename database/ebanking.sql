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
    lastLogin datetime,
    Status VARCHAR(20)
);
-- CREATE INDEX idx_emer ON klienti 
-- SELECT * FROM klientet WHERE Emer"Arion";


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

CREATE TABLE AccessPermissions (
    PermissionID int NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    AccessLevel VARCHAR(50) NOT NULL,
    PRIMARY KEY (PermissionID),
    CONSTRAINT FK_User_AccessPermission FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE logs (
    logId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    action VARCHAR(50) NOT NULL,
    details TEXT,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);



CREATE TABLE applyonline (
    userId int NOT NULL primary key AUTO_INCREMENT,
    username varchar(50) unique not null,
    name varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) not null,
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
    SavingAccount bigint NOT NULL,
    UserID int(11) NOT NULL,
    CurrencyCode varchar(20) NOT NULL,
    Balance decimal(18, 2) NOT NULL,
    AccountStatus varchar(50) NOT NULL,
    PRIMARY KEY (SavingAccount),
    CONSTRAINT FK_User_Savings FOREIGN KEY (UserID) REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE SavingsHistory (
    SavingsHistoryID INT PRIMARY KEY AUTO_INCREMENT,
    CurrentAccountID BIGINT NOT NULL,
    FlexSaveAccountID BIGINT NOT NULL,
    TransactionAmount DECIMAL(18, 5) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_SavingsHistory_CurrentAccount FOREIGN KEY (CurrentAccountID) REFERENCES currentaccounts (CurrentAccount) ON DELETE CASCADE,
    CONSTRAINT FK_SavingsHistory_Savingsaccount FOREIGN KEY (FlexSaveAccountID) REFERENCES savingsaccounts (SavingAccount) ON DELETE CASCADE
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


CREATE TABLE `loans` (
    `LoanID` int(11) NOT NULL AUTO_INCREMENT,
    `AccountID` bigint(20) NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `dateOfBirth` varchar(200) NOT NULL,
    `loanType` varchar(255) NOT NULL,
    `city` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `email` varchar(50) NOT NULL,
    `employmentStatus` varchar(50) NOT NULL,
    `annualIncome` varchar(50) NOT NULL,
    `loanAmount` varchar(50) NOT NULL,
    `loanPurpose` varchar(50) NOT NULL,
    `Status` varchar(10) NOT NULL,
    PRIMARY KEY (`LoanID`),
    KEY `FK_Account_Loan` (`AccountID`),
    CONSTRAINT `FK_Account_Loan` FOREIGN KEY (`AccountID`) REFERENCES `currentaccounts` (`CurrentAccount`) ON DELETE CASCADE
);

CREATE TABLE `applyloans` (
    `LoanID` int(11) NOT NULL AUTO_INCREMENT,
    `AccountID` bigint(20) NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `dateOfBirth` varchar(200) NOT NULL,
    `loanType` varchar(255) NOT NULL,
    `city` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `email` varchar(50) NOT NULL,
    `employmentStatus` varchar(50) NOT NULL,
    `annualIncome` varchar(50) NOT NULL,
    `loanAmount` varchar(50) NOT NULL,
    `loanPurpose` varchar(50) NOT NULL,
    `Status` varchar(10) NOT NULL,
    PRIMARY KEY (`LoanID`),
    KEY `FK_Account_Loan` (`AccountID`),
    CONSTRAINT `FK_Account_Loanss` FOREIGN KEY (`AccountID`) REFERENCES `currentaccounts` (`CurrentAccount`) ON DELETE CASCADE
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




CREATE TABLE Bills (
    BillID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ServiceType VARCHAR(50),
    Amount DECIMAL(10, 2),
    DueDate DATE,
    Status VARCHAR(20) DEFAULT 'Unpaid',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
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


CREATE TABLE InfoSection(
    InfoSectionId int not null primary key AUTO_INCREMENT,
    Info TEXT
);

CREATE TABLE AboutUs(
    AboutUsId int not null primary key AUTO_INCREMENT,
    Tittle TEXT,
    Info TEXT
);

CREATE TABLE Team(
    TeamId int not null primary key AUTO_INCREMENT,
    Emri varchar(50) not null,
    Teksti text not null,
    Photo longblob
);

CREATE TABLE Carusel(
    CaruselId int not null primary key AUTO_INCREMENT,
    Titulli varchar(50) not null,
    Teksti text not null,
    Photo longblob
);




INSERT INTO `users` (`userId`, `username`, `name`, `lastname`, `email`, `password`, `gender`, `birthday`, `CurrencyCode`, `profilePicture`, `Status`) VALUES
(5, 'user', 'user', 'user', 'ebankingebanking7@gmail.com', '$2b$10$LkBEWggp4k/Y/dgN7YatnuVT5MF1AwB1n0aECVKAOJTg54Gtez98y', 'M', '2024-05-14 22:00:00', 'EUR', 'adsdsda', 'Active'),
(6, 'bani', 'bani', 'bani', 'bani@gmail.com', '$2b$10$VBqdvLoWj1sRuZtkL1r4q.8fb2msybySGnt7inxLArkrbNeGUnycS', 'M', '2024-05-14 22:00:00', 'EUR', 'adsdsda', 'Active');


INSERT INTO `accesspermissions` (`PermissionID`, `UserID`, `AccessLevel`) VALUES
(5, 5, 'User'),
(6, 6, 'Admin');

INSERT INTO `adresa` (`AdresaID`, `userId`, `Country`, `City`, `Street`) VALUES
(0, 5, 'dasdsaad', 'dasasda', 'ewqqw'),
(0, 6, 'Kosova', 'Lipjan', 'Bujan');




INSERT INTO `currentaccounts` (`CurrentAccount`, `UserID`, `CurrencyCode`, `Balance`, `AccountStatus`) VALUES
(1110333316835670, 5, 'EUR', 50000.00, 'Open'),
(1110333367253288, 6, 'EUR', 60000.00, 'Open');

INSERT INTO `savingsaccounts` (`SavingAccount`, `UserID`, `CurrencyCode`, `Balance`, `AccountStatus`) VALUES
(1110222258657008, 5, 'EUR', 0.00, 'Open'),
(1110222276211824, 6, 'EUR', 0.00, 'Open');

INSERT INTO `cards` (`CardID`, `UserID`, `CurrentAccount`, `CardNumber`, `ValidFrom`, `ExpiryDate`, `CardHolderName`, `CardType`, `CardStatus`, `AvailableBalance`) VALUES
(1, 5, 1110333316835670, '5354791934376884', '2024-05-26', '2028-05-26', 'user user', 'DEBIT MASTER CARD', 'ACTIVE', NULL),
(2, 6, 1110333367253288, '5354716673411652', '2024-05-26', '2028-05-26', 'bani bani', 'DEBIT MASTER CARD', 'ACTIVE', NULL);
