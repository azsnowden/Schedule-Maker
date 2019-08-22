create table users(
    id serial primary key,
    displayname varchar not null,
    email varchar(50) not null,
    phone_number varchar(10),
    business_id integer references businesses(id)
);

create table businesses(
    id serial primary key,
    address varchar not null,
    location_number integer,
    email business_email
)

create type DOW as ENUM(
    'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday' 
);

create table shift_available(
    day_of_week DOW,
    start_time time,
    end_time time,
    shift_title varchar, 
    shift_location varchar(50)

);

create table new_set_schedule(
    worker_id number not null,
    worker_name varchar not null,
    shift_title varchar,
    shift_location varchar,
    
)


create table recurring_TO(
    id serial primary key,
    day_of_week DOW,
    start_time time,
    end_time time,
    user_id integer references users(id)
);

create table one_vaca(
    id serial primary key,
    start_date date,
    end_date date,
    day_of_week DOW,
    start_time time,
    end_time time,
    user_id integer references users(id)
)

CREATE table messenger(
    
)