-- Criação database
CREATE DATABASE project_manager_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Criação da tabela project
CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    start_date DATE NOT NULL
);

-- Criação da tabela task
CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES project(id),
    title VARCHAR NOT NULL,
    description TEXT,
    due_date DATE,
    completed BOOLEAN
);


-- Alteração da tabela task
ALTER TABLE task
ADD CONSTRAINT fk_project_id
FOREIGN KEY (project_id)
REFERENCES project (id)
ON DELETE CASCADE;

