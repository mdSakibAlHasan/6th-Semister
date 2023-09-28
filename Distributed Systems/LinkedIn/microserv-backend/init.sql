
CREATE TABLE IF NOT EXISTS UserInfo (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255)
);

INSERT INTO UserInfo(Name, Email, Password) VALUES ('sakib', 'skb@gmail.com','iit123');

