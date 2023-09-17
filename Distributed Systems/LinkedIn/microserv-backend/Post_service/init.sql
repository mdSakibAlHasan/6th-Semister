
CREATE TABLE IF NOT EXISTS PostInfo (
  PostID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  Text VARCHAR(255),
  Image VARCHAR(255),
  PostTime DATETIME
);

INSERT INTO PostInfo (UserID, Text, Image, PostTime) VALUES
  (1, 'This is my first post.', 'http://127.0.0.1:9000/likedin/1690352797095-Untitled4.jpeg', '2023-07-11 10:00:00'),
  (1, 'Excited to share my latest project!', 'http://127.0.0.1:9000/likedin/1690352809997-child-817373_1280.jpg', '2023-07-11 12:30:00'),
  (3, 'Hello everyone!', 'http://127.0.0.1:9000/likedin/1691302744524-child-817373_1280.jpg', '2023-07-11 15:45:00');
