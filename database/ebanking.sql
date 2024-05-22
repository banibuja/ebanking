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
(1, 'bani', 'Shaban', 'bani', 'bani@gmail.com', '$2b$10$4MJwUqchW9Eo8PsMen73W.aNg9rwWzqvY2C4J9YOrolGPj4v6pTuq', 'M', '2004-02-29 00:00:00', 'EUR'),
(2, 'xentoro', 'xentoro', 'xentoro', 'xentoro@gmail.com', '$2a$10$Z14YcdLzpCsbJAU33RyG9.p9OEPj.BfZHXIM5.Y27QCTMjsjctxOS', 'M', '2024-05-11 00:00:00', 'EUR'),
(3, 'alice_jones', 'Alice', 'Jones', 'alice@example.com', 'hashed_password', 'F', '1988-11-30 00:00:00', 'GBP'),
(4, 'bob_brown', 'Bob', 'Brown', 'bob@example.com', 'hashed_password', 'M', '1985-07-20 00:00:00', 'EUR'),
(5, 'emily_white', 'Emily', 'White', 'emily@example.com', 'hashed_password', 'F', '1995-03-10 00:00:00', 'USD'),
(6, 'michael_smith', 'Michael', 'Smith', 'michael@example.com', 'hashed_password', 'M', '1983-09-25 00:00:00', 'GBP'),
(7, 'sarah_adams', 'Sarah', 'Adams', 'sarah@example.com', 'hashed_password', 'F', '1978-12-18 00:00:00', 'USD'),
(8, 'david_johnson', 'David', 'Johnson', 'david@example.com', 'hashed_password', 'M', '1993-08-05 00:00:00', 'EUR'),
(9, 'olivia_brown', 'Olivia', 'Brown', 'olivia@example.com', 'hashed_password', 'F', '1990-04-03 00:00:00', 'GBP'),
(10, 'william_taylor', 'William', 'Taylor', 'william@example.com', 'hashed_password', 'M', '1986-02-28 00:00:00', 'USD'),
(11, 'sophia_martin', 'Sophia', 'Martin', 'sophia@example.com', 'hashed_password', 'F', '1987-06-12 00:00:00', 'EUR'),
(12, 'james_miller', 'James', 'Miller', 'james@example.com', 'hashed_password', 'M', '1991-10-09 00:00:00', 'GBP'),
(13, 'oliver_anderson', 'Oliver', 'Anderson', 'oliver@example.com', 'hashed_password', 'M', '1984-03-14 00:00:00', 'USD'),
(14, 'emma_taylor', 'Emma', 'Taylor', 'emma@example.com', 'hashed_password', 'F', '1994-07-22 00:00:00', 'EUR'),
(15, 'daniel_thomas', 'Daniel', 'Thomas', 'daniel@example.com', 'hashed_password', 'M', '1989-11-17 00:00:00', 'GBP'),
(16, 'ava_wilson', 'Ava', 'Wilson', 'ava@example.com', 'hashed_password', 'F', '1982-05-06 00:00:00', 'USD'),
(17, 'mason_clark', 'Mason', 'Clark', 'mason@example.com', 'hashed_password', 'M', '1996-08-30 00:00:00', 'EUR'),
(18, 'isabella_martinez', 'Isabella', 'Martinez', 'isabella@example.com', 'hashed_password', 'F', '1981-01-28 00:00:00', 'GBP'),
(19, 'logan_hill', 'Logan', 'Hill', 'logan@example.com', 'hashed_password', 'M', '1988-04-20 00:00:00', 'USD'),
(20, 'charlotte_adams', 'Charlotte', 'Adams', 'charlotte@example.com', 'hashed_password', 'F', '1993-12-07 00:00:00', 'EUR'),
(21, 'ryan_thompson', 'Ryan', 'Thompson', 'ryan@example.com', 'hashed_password', 'M', '1987-02-18 00:00:00', 'GBP'),
(22, 'amelia_baker', 'Amelia', 'Baker', 'amelia@example.com', 'hashed_password', 'F', '1990-09-15 00:00:00', 'USD'),
(23, 'jack_wilson', 'Jack', 'Wilson', 'jack@example.com', 'hashed_password', 'M', '1984-06-23 00:00:00', 'EUR'),
(24, 'mia_morris', 'Mia', 'Morris', 'mia@example.com', 'hashed_password', 'F', '1985-08-10 00:00:00', 'GBP'),
(25, 'ethan_lee', 'Ethan', 'Lee', 'ethan@example.com', 'hashed_password', 'M', '1992-03-05 00:00:00', 'USD'),
(26, 'hannah_gonzalez', 'Hannah', 'Gonzalez', 'hannah@example.com', 'hashed_password', 'F', '1986-11-02 00:00:00', 'EUR'),
(27, 'noah_roberts', 'Noah', 'Roberts', 'noah@example.com', 'hashed_password', 'M', '1983-07-09 00:00:00', 'GBP'),
(28, 'ava_collins', 'Ava', 'Collins', 'ava@example.com', 'hashed_password', 'F', '1994-04-27 00:00:00', 'USD'),
(29, 'liam_hall', 'Liam', 'Hall', 'liam@example.com', 'hashed_password', 'M', '1981-10-14 00:00:00', 'EUR'),
(30, 'olivia_stewart', 'Olivia', 'Stewart', 'olivia@example.com', 'hashed_password', 'F', '1988-12-31 00:00:00', 'GBP');




INSERT INTO `accesspermissions` (`PermissionID`, `UserID`, `AccessLevel`) VALUES
(1, 1, 'Admin'),
(2, 2, 'Admin'),
(3, 3, 'Admin'),
(4, 4, 'User'),
(5, 5, 'Admin'),
(6, 6, 'User'),
(7, 7, 'Admin'),
(8, 8, 'User'),
(9, 9, 'Admin'),
(10, 10, 'User'),
(11, 11, 'Admin'),
(12, 12, 'User'),
(13, 13, 'Admin'),
(14, 14, 'User'),
(15, 15, 'Admin'),
(16, 16, 'User'),
(17, 17, 'Admin'),
(18, 18, 'User'),
(19, 19, 'Admin'),
(20, 20, 'User'),
(21, 21, 'Admin'),
(22, 22, 'User'),
(23, 23, 'Admin'),
(24, 24, 'User'),
(25, 25, 'Admin'),
(923, 1, 'Admin');

INSERT INTO `adresa` (`AdresaID`, `userId`, `Country`, `City`, `Street`) VALUES
(0, 1, 'bani', 'bani', 'bani'),
(0, 2, 'xentoro', 'xentoro', 'xentoro'),
(3, 3, 'UK', 'London', '789 Oxford St'),
(4, 4, 'Germany', 'Berlin', '101 Friedrichstrasse'),
(5, 5, 'Italy', 'Rome', '234 Via Veneto'),
(6, 6, 'Spain', 'Madrid', '567 Calle Mayor'),
(7, 7, 'Canada', 'Toronto', '890 Yonge St'),
(8, 8, 'Australia', 'Sydney', '111 George St'),
(9, 9, 'Japan', 'Tokyo', '456 Shibuya Rd'),
(10, 10, 'China', 'Beijing', '789 Wangfujing St'),
(11, 11, 'Brazil', 'Rio de Janeiro', '101 Copacabana Ave'),
(12, 12, 'Argentina', 'Buenos Aires', '234 Avenida Corrientes'),
(13, 13, 'India', 'Mumbai', '567 Marine Drive'),
(14, 14, 'Russia', 'Moscow', '890 Tverskaya St'),
(15, 15, 'South Africa', 'Cape Town', '111 Long St'),
(16, 16, 'Mexico', 'Mexico City', '456 Reforma Ave'),
(17, 17, 'South Korea', 'Seoul', '789 Gangnam Blvd'),
(18, 18, 'Turkey', 'Istanbul', '101 Istiklal St'),
(19, 19, 'Egypt', 'Cairo', '234 Nile St'),
(20, 20, 'Germany', 'Berlin', '567 Unter den Linden'),
(21, 21, 'Italy', 'Rome', '890 Via dei Fori Imperiali'),
(22, 22, 'Spain', 'Madrid', '111 Gran Via'),
(23, 23, 'France', 'Paris', '456 Champs-Élysées'),
(24, 24, 'UK', 'London', '789 Oxford St');

INSERT INTO `cards` (`CardID`, `UserID`, `CardNumber`, `ValidFrom`, `ExpiryDate`, `CardHolderName`, `CardType`, `CardStatus`, `AvailableBalance`) VALUES
(1, 1, '5354730745629939', '2024-05-16', '2028-05-14', 'bani', 'DEBIT MASTER CARD', 'ACTIVE', 0.00),
(2, 2, '2222333344445555', '2024-02-01', '2028-02-01', 'Jane Smith', 'DEBIT', 'ACTIVE', 6000.00),
(3, 3, '3333444455556666', '2024-03-01', '2028-03-01', 'Alice Jones', 'DEBIT', 'ACTIVE', 7000.00),
(4, 4, '4444555566667777', '2024-04-01', '2028-04-01', 'Bob Brown', 'DEBIT', 'ACTIVE', 8000.00),
(5, 5, '5555666677778888', '2024-05-01', '2028-05-01', 'Emily White', 'DEBIT', 'ACTIVE', 9000.00),
(6, 6, '6666777788889999', '2024-06-01', '2028-06-01', 'Michael Smith', 'DEBIT', 'ACTIVE', 10000.00),
(7, 7, '7777888899990000', '2024-07-01', '2028-07-01', 'Sarah Adams', 'DEBIT', 'ACTIVE', 11000.00),
(8, 8, '8888999900001111', '2024-08-01', '2028-08-01', 'David Johnson', 'DEBIT', 'ACTIVE', 12000.00),
(9, 9, '9999000011112222', '2024-09-01', '2028-09-01', 'Olivia Brown', 'DEBIT', 'ACTIVE', 13000.00),
(10, 10, '1010111122223333', '2024-10-01', '2028-10-01', 'William Taylor', 'DEBIT', 'ACTIVE', 14000.00),
(11, 11, '1111122233334444', '2024-11-01', '2028-11-01', 'Sophia Martin', 'DEBIT', 'ACTIVE', 15000.00),
(12, 12, '1211222233334444', '2024-12-01', '2028-12-01', 'James Miller', 'DEBIT', 'ACTIVE', 16000.00),
(13, 13, '1311222233334444', '2025-01-01', '2029-01-01', 'Oliver Anderson', 'DEBIT', 'ACTIVE', 17000.00),
(14, 14, '1411222233334444', '2025-02-01', '2029-02-01', 'Emma Taylor', 'DEBIT', 'ACTIVE', 18000.00),
(15, 15, '1511222233334444', '2025-03-01', '2029-03-01', 'Daniel Thomas', 'DEBIT', 'ACTIVE', 19000.00),
(16, 16, '1611222233334444', '2025-04-01', '2029-04-01', 'Ava Wilson', 'DEBIT', 'ACTIVE', 20000.00),
(17, 17, '1711222233334444', '2025-05-01', '2029-05-01', 'Mason Clark', 'DEBIT', 'ACTIVE', 21000.00),
(18, 18, '1811222233334444', '2025-06-01', '2029-06-01', 'Isabella Martinez', 'DEBIT', 'ACTIVE', 22000.00),
(19, 19, '1911222233334444', '2025-07-01', '2029-07-01', 'Logan Hill', 'DEBIT', 'ACTIVE', 23000.00),
(20, 20, '2011222233334444', '2025-08-01', '2029-08-01', 'Charlotte Adams', 'DEBIT', 'ACTIVE', 24000.00),
(21, 21, '2111222233334444', '2025-09-01', '2029-09-01', 'Ryan Thompson', 'DEBIT', 'ACTIVE', 25000.00),
(22, 22, '2211222233334444', '2025-10-01', '2029-10-01', 'Amelia Baker', 'DEBIT', 'ACTIVE', 26000.00),
(23, 23, '2311222233334444', '2025-11-01', '2029-11-01', 'Jack Wilson', 'DEBIT', 'ACTIVE', 27000.00),
(24, 24, '2411222233334444', '2025-12-01', '2029-12-01', 'Mia Morris', 'DEBIT', 'ACTIVE', 28000.00),


INSERT INTO `currencies` (`CurrencyID`, `UserID`, `CurrencyCode`, `ExchangeRate`) VALUES
(1, 1, 'EUR', 1.0000),
(8, 9, 'EUR', 1.0000);


INSERT INTO `currentaccounts` (`CurrentAccount`, `UserID`, `CurrencyCode`, `Balance`, `AccountStatus`) VALUES
(111111111, 1, 'USD', 1000.00, 'Open'),
(222222222, 2, 'EUR', 2000.00, 'Closed'),
(333333333, 3, 'GBP', 3000.00, 'Open'),
(444444444, 4, 'USD', 4000.00, 'Closed'),
(555555555, 5, 'EUR', 5000.00, 'Open'),
(666666666, 6, 'GBP', 6000.00, 'Closed'),
(777777777, 7, 'USD', 7000.00, 'Open'),
(888888888, 8, 'EUR', 8000.00, 'Closed'),
(999999999, 9, 'GBP', 9000.00, 'Open'),
(1010101010, 10, 'USD', 10000.00, 'Closed'),
(1111111111, 11, 'EUR', 11000.00, 'Open'),
(1212121212, 12, 'GBP', 12000.00, 'Closed'),
(1313131313, 13, 'USD', 13000.00, 'Open'),
(1414141414, 14, 'EUR', 14000.00, 'Closed'),
(1515151515, 15, 'GBP', 15000.00, 'Open'),
(1616161616, 16, 'USD', 16000.00, 'Closed'),
(1717171717, 17, 'EUR', 17000.00, 'Open'),
(1818181818, 18, 'GBP', 18000.00, 'Closed'),
(1919191919, 19, 'USD', 19000.00, 'Open'),
(2020202020, 20, 'EUR', 20000.00, 'Closed'),
(2121212121, 21, 'GBP', 21000.00, 'Open'),
(2222222222, 22, 'USD', 22000.00, 'Closed'),
(2323232323, 23, 'EUR', 23000.00, 'Open'),
(2424242424, 24, 'GBP', 24000.00, 'Closed');




INSERT INTO `reports` (`ReportID`, `ReportType`, `GenerationDate`, `Description`) VALUES
(501, 'Transaction', '2024-04-22', 'Daily transaction report'),
(502, 'Balance', '2024-04-22', 'Monthly account balance report');



INSERT INTO `savingsaccounts` (`SavingsType`, `UserID`, `CurrencyCode`, `Balance`, `AccountStatus`) VALUES
(111111111, 1, 'USD', 5000.00, 'Open'),
(222222222, 2, 'EUR', 6000.00, 'Closed'),
(333333333, 3, 'GBP', 7000.00, 'Open'),
(444444444, 4, 'USD', 8000.00, 'Closed'),
(555555555, 5, 'EUR', 9000.00, 'Open'),
(666666666, 6, 'GBP', 10000.00, 'Closed'),
(777777777, 7, 'USD', 11000.00, 'Open'),
(888888888, 8, 'EUR', 12000.00, 'Closed'),
(999999999, 9, 'GBP', 13000.00, 'Open'),
(1010101010, 10, 'USD', 14000.00, 'Closed'),
(1111111111, 11, 'EUR', 15000.00, 'Open'),
(1212121212, 12, 'GBP', 16000.00, 'Closed'),
(1313131313, 13, 'USD', 17000.00, 'Open'),
(1414141414, 14, 'EUR', 18000.00, 'Closed'),
(1515151515, 15, 'GBP', 19000.00, 'Open'),
(1616161616, 16, 'USD', 20000.00, 'Closed'),
(1717171717, 17, 'EUR', 21000.00, 'Open'),
(1818181818, 18, 'GBP', 22000.00, 'Closed'),
(1919191919, 19, 'USD', 23000.00, 'Open'),
(2020202020, 20, 'EUR', 24000.00, 'Closed'),
(2121212121, 21, 'GBP', 25000.00, 'Open'),
(2222222222, 22, 'USD', 26000.00, 'Closed');




