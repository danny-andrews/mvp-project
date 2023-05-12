DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
  id SERIAL,
  text TEXT,
  created_at TIMESTAMP
);

INSERT INTO todo (text, created_at) VALUES ('Mow the lawn', '2004-10-19 10:23:54+0');
INSERT INTO todo (text, created_at) VALUES ('Do the dishes', '2004-10-19 10:24:54+0');
INSERT INTO todo (text, created_at) VALUES ('Mop the floor', '2004-10-19 10:25:54+0');
