CREATE DATABASE qna;

\c qna;

CREATE TABLE questions (
  id int NOT NULL AUTO_INCREMENT,
  body text,
  askDate date,
  askName VARCHAR(100),
  helpfulness int,
  PRIMARY KEY(id)
)

CREATE TABLE answers (
  id int NOT NULL AUTO_INCREMENT,
  body text,
  answerDate date,
  answerName VARCHAR,
  helpfulness int,
  PRIMARY KEY(id)
  CONSTRAINT fk_question
    FOREIGN KEY(id)
      REFERENCES questions(id)
)

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  photoUrl text,
  CONSTRAINT fk_answer
    FOREIGN KEY(id)
      REFERENCES questions(id)
)