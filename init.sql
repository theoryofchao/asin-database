create table asin(
  id int primary key NOT NULL,
  name text NOT NULL,
  url text NOT NULL UNIQUE,
  rank text NOT NULL,
  dimensions text NOT NULL,
  image text
);