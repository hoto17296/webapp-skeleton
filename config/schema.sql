CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL,
  pw_hash text NOT NULL
);
