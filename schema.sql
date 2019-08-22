create table businesses(
    id serial primary key,
    address varchar not null,
    business_name varchar not null,
    business_email varchar
);

create table users(
    id serial primary key,
    displayname varchar not null,
    email varchar(50) not null,
    phone_number varchar(10),
    business_id integer references businesses(id)
);

create table location(
    id serial primary key,
    address varchar not null,
    location_name varchar(50),
    business_id integer REFERENCES businesses(id),
    email varchar
);

create type DOW as ENUM(
    'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday' 
);

create table shift_available(
    id serial primary key,
    day_of_week DOW,
    start_time time,
    end_time time,
    shift_title varchar,
    business integer REFERENCES businesses(id),
    location_id integer REFERENCES location(id),
    location_name varchar
);

create table new_set_schedule(
    id serial primary key, 
    user_id integer references users(id),
    business_id integer references businesses(id),
    shift_location integer references location(id),
    shift_id integer references shift_available(id)
);


create table recurring_TO(
    id serial primary key,
    day_of_week DOW not null,
    start_time time,
    end_time time,
    user_id integer references users(id)
);

create table one_vaca(
    id serial primary key,
    start_date date,
    end_date date,
    start_time time,
    end_time time,
    user_id integer references users(id)
);

CREATE table forum_messenger(
    user_id integer references users(id),
    subj varchar(50),
    msg varchar(200),
    post_date timestamp,
    unique_post_id serial primary key
);

CREATE table personal_messenger(
    user_id integer references users(id),
    msg varchar(200),
    post_date timestamp
);