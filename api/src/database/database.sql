create database pile_overflow;

use pile_overflow;

create table user (
    id int primary key auto_increment,
    username varchar(100),
    firstname varchar(100),
    lastname varchar(100),
    email varchar(100),
    password varchar (255)
);

create table tag (
    id int primary key auto_increment,
    description varchar(50)
);

insert into tag values
(null, 'javascript'),
(null, 'reactjs'),
(null, 'c++'),
(null, 'c#'),
(null, 'java'),
(null, 'nodejs'),
(null, 'php'),
(null, 'html'),
(null, 'python'),
(null, 'jquery'),
(null, 'android'),
(null, 'sql'),
(null, 'mysql'),
(null, 'base-de-datos'),
(null, 'css'),
(null, 'laravel'),
(null, 'bootstrap');

create table question (
    id int primary key auto_increment,
    fk_user int,
    question varchar(100),
    description TEXT,
    status varchar (50),
    foreign key(fk_user) references user(id)
);

CREATE TABLE question_tags(
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_question INT,
	fk_tag INT,
	foreign key(fk_question)references question(id),
	FOREIGN KEY (fk_tag) REFERENCES tag(id)
);

create table answer (
    id int primary key auto_increment,
    fk_user int,
    fk_question int,
    answer TEXT,
    foreign key(fk_user)references user(id),
    foreign key(fk_question)references question(id)
);

create table answer_votes(
    fk_answer int primary key,
    fk_question int, 
    fk_user int,
    foreign key(fk_user)references user(id),
    foreign key(fk_question)references question(id),
    foreign key (fk_answer) references answer(id)
)
