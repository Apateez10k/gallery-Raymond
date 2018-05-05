-- CREATE DATABASE apateez2;

CREATE TABLE IF NOT EXISTS photos (
  id integer,
  name text,
  photos text[]
);

\COPY photos FROM '/Users/rj/Documents/Hack-Reactor/hrsf92-sdc-apateez10k/gallery-Raymond/database/seedDataSmall.csv' delimiter '|' csv;

-- COPY photos FROM './seedDataSmall.csv' delimiter '|' csv;
