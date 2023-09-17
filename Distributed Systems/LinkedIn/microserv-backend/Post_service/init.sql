
CREATE TABLE IF NOT EXISTS PostInfo (
  PostID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  Text VARCHAR(255),
  Image VARCHAR(255),
  PostTime DATETIME,
  FOREIGN KEY (UserID) REFERENCES UserInfo(UserID)
);


