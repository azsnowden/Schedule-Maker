insert into businesses
    (address, business_name, business_email)
VALUES
    ('3432 Piedmont Rd NE','Octane', 'atv@octane.com'),
    ('1168 Howell Mill Rd', 'Brash', 'thebox@brash.com')
;

insert into location
    (address, location_name, business_id, email)
VALUES
    ('3432 Piedmont Rd NE','Octane ATV', 1, 'atv@octane.com'),
    ('1009 Marietta St NW','Octane Westside', 1, 'westside@octane.com'),
    ('1168 Howell Mill Rd', 'Brash Westside', 2, 'thebox@brash.com'),
    ('130 West Paces Ferry', 'Brash History Center', 2, 'ahc@brash.com');

insert into users
    (displayname, email, phone_number, business_id, position)
VALUES
    ('Joe', 'atv@octane.com', '1234567890', 1, 'barista'),
    ('Andrew', 'westside@octane.com', '0987654321', 1, 'manager'),
    ('Chris', 'thebox@brash.com', '1234567890', 2, 'manager'),
    ('Hannah', 'hannah@brash.com', '1230987654', 2, 'barista')
;

INSERT into shift_available
    (day_of_week, start_time, end_time, shift_title, business, location_id, location_name)
VALUES
    ('Monday', '06:30', '12:00', 'barista', 1, 1, 'Octane ATV'),
    ('Tuesday', '06:30', '12:00', 'barista', 1, 2, 'Octane Westside'),
    ('Wednesday', '06:30', '12:00', 'barista', 2, 3, 'Brash Westside'),
    ('Thursday', '06:30', '12:00', 'barista', 2, 4, 'Brash History Center'),
    ('Monday','06:30', '12:00', 'barista', 2, 4, 'Brash History Center')
;

INSERT into new_set_schedule
    (user_id, business_id, shift_location, shift_id)
VALUES
    (1, 1, 1, 1)
;

-- INSERT into recurring_TO
--     (day_of_week, start_time, end_time, user_id)
-- VALUES
--     ('Monday', '07:00', '12:00', 1),
--     ('Tuesday', '07:00', '12:00', 2),
--     ('Sunday', '07:00', '04:00', 2)
-- ;

INSERT into one_vaca
    (start_date, end_date, start_time, end_time, user_id)
VALUES
    ('2019-09-09', '2019-09-15', '07:00', '12:00', 2)
;

INSERT into forum_messenger
    (user_id, subj, msg)
VALUES
    (1, 'first message', 'This is a message'),
    (1, 'second message', 'This is another message'),
    (3, 'shift coverage', 'This forum message was posted by Chris')
;

INSERT into personal_messenger
    (user_id, msg)
VALUES
    (2, 'personal message number 1 sent by Andrew'),
    (4, 'personal message number 2 sent by Hannah'),
    (4, 'Another personal message sent by Hannah')
;

INSERT INTO schedule(
    user_id,
    business_id,
    start_time,
    end_time)
    VALUES
    (1, 1, '2019-08-25 09:00:00', '2019-08-25 13:00:00'),
    (1, 1, '2019-08-27 09:00:00', '2019-08-27 13:00:00')