CREATE TABLE IF NOT EXISTS ASIN(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  rank TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  image TEXT
);

CREATE USER asinuser WITH PASSWORD 'asinuser';
GRANT ALL PRIVILEGES ON DATABASE asin TO asinuser;