COPY questions
FROM '/Users/Chris/work/Prompto-SDC/questions.csv'
DELIMITER ','
CSV HEADER;
COPY answers
FROM '/Users/Chris/work/Prompto-SDC/answers.csv'
DELIMITER ','
CSV HEADER;
COPY photos
FROM '/Users/Chris/work/Prompto-SDC/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- psql -d qna -U chris2 -a -f import.sql