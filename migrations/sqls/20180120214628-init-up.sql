--
-- User TABLE
--
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
