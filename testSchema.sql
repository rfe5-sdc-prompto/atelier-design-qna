CREATE DATABASE testdb;

\c testdb;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id integer,
  body TEXT,
  date_written bigint,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  reported integer,
  helpful integer
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id integer,
  body TEXT,
  date_written bigint,
  answerer_name VARCHAR(100),
  answerer_email VARCHAR(100),
  reported integer,
  helpful integer,
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  answer_id integer,
  photoUrl TEXT,
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(id)
);

-- psql -d testdb -U chris2 -a -f testSchema.sql
