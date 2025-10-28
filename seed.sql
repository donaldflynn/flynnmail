DROP TABLE IF EXISTS emails;

CREATE TABLE emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_address TEXT,
  from_name TEXT,
  to_address TEXT,
  body_text TEXT,
  body_html TEXT,
  timestamp INTEGER,
  subject VARCHAR(255) DEFAULT NULL
);

INSERT INTO emails (from_address, to_address, body_text, body_html, timestamp, subject, from_name) VALUES
('alice@example.com', 'test', 'Hello, this is a testing email from Alice to Test.', 'a', 1625155201000, 'Test Email 1', 'Alice'),
('bob@example.com', 'testing', 'Hello, this is a test email from Alice to Test.', 'a', 1625155202000, 'Test Email 2', 'Bob'),
('charlie@example.com', 'test', 'SSSSSSS... (long body truncated here) ...SSSS.', '<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>
</head>
<body dir="ltr">
<div style="font-family: Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">
Testing <b>Testing</b></div>
<div style="font-family: Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">
<b>blah blah</b></div>
</body>
</html>', 1625155203000, 'Test Email 3', 'Charlie');
