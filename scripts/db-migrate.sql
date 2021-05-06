CREATE TABLE IF NOT EXISTS  "users" (
    "id" serial primary key,
    "username" varchar(255) unique not null,
    "password" varchar(60) not null,
    "created_at" timestamp with time zone default current_timestamp
);

insert into users (username, password) values ('admin', '$2b$10$BUli0c.muyCW1ErNJc3jL.vFRFtFJWrT8/GcR4A.sUdCznaXiqFXa') ON CONFLICT (username) DO NOTHING;


CREATE TABLE IF NOT EXISTS  "pagedata" (
    "id" int primary key,
    "avatarUrl" varchar,
    "avatarheight" varchar,
    "avatarwidth" varchar,
    "bgColor" varchar,
    "accentColor" varchar,
    "handlerText" varchar,
    "footerText" varchar,
    "bgImgUrl" varchar,
    "created_at" timestamp with time zone default current_timestamp
);

insert into pagedata ("id", "handlerText") values (1 , 'w1212212') ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS  "linkdata" (
    "id" serial primary key,
    "pagedataid" int REFERENCES pagedata (id) ON UPDATE CASCADE ,
    "iconClass" varchar,
    "displayText" varchar,
    "linkUrl" varchar,
    "bgColor" varchar,
    "created_at" timestamp with time zone default current_timestamp
);
