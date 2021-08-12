-- @block 
CREATE TABLE user (
    user_id VARCHAR(16) PRIMARY KEY NOT NULL,
    role VARCHAR(16) NOT NULL,
    firstname VARCHAR(16) NOT NULL,
    lastname VARCHAR(16) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    birthdate DATE NOT NULL,
    department VARCHAR(32),
    jobtitle VARCHAR(32),
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