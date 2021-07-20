-- @block 
CREATE TABLE user (
    user_id VARCHAR(16) PRIMARY KEY NOT NULL,
    role VARCHAR(16) NOT NULL,
    firstname VARCHAR(16) NOT NULL,
    lastname VARCHAR(16) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(32) NOT NULL,
    dateofbirth DATE NOT NULL,
    department VARCHAR(16),
    jobtitle VARCHAR(16),
    phone VARCHAR(16),
    country VARCHAR(16),
    city VARCHAR(16),
    gender VARCHAR(8),
    bio TEXT,
    status VARCHAR(8),
    user_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

-- @block 
CREATE TABLE ticket (
    ticket_id VARCHAR(16) PRIMARY KEY NOT NULL,
    user_id VARCHAR(16) NOT NULL,
    category VARCHAR(16) NOT NULL,
    priority VARCHAR(16) NOT NULL,
    title VARCHAR(32) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(16) NOT NULL,
    reported_by VARCHAR(32) NOT NULL,
    assigned_by VARCHAR(32) NOT NULL,
    assigned_to VARCHAR(32) NOT NULL,
    ticket_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticket_assigned_at DATETIME,
    ticket_resolved_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
)

-- @block 
CREATE TABLE note (
    note_id VARCHAR(16) PRIMARY KEY NOT NULL,
    user_id VARCHAR(16) NOT NULL,
    ticket_id VARCHAR(16) NOT NULL,
    content TEXT NOT NULL,
    note_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id) ON DELETE CASCADE
)

-- @block
SELECT COUNT(user_id) FROM user

-- @block
SELECT COUNT(*) AS [Staff Number]
FROM user;

-- @block
SELECT * FROM user WHERE role = 'Developer'

-- @block
SELECT note.note_id, note.content, note.note_updated_at, user.firstname, user.lastname FROM note
INNER JOIN user ON note.user_id = user.user_id
WHERE (ticket_id = 'TKT4eeaad3')