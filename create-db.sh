createdb schedule-maker

psql -f schema.sql schedule-maker
psql -f seed.sql schedule-maker