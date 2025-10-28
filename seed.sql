DROP TABLE IF EXISTS emails;

CREATE TABLE emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_address TEXT,
  to_address TEXT,
  body TEXT,
  timestamp INTEGER,
  subject VARCHAR(255) DEFAULT NULL
);

INSERT INTO emails (from_address, to_address, body, timestamp, subject) VALUES
('alice@example.com', 'test', 'Hello, this is a testing email from Alice to Test.', 1625155201, 'Test Email 1'),
('bob@example.com', 'testing', 'Hello, this is a test email from Alice to Test.', 1625155202, 'Test Email 2'),
('charlie@example.com', 'Test', 'SSSSSSS... (long body truncated here) ...SSSS.', 1625155203, 'Test Email 3');
