createdb schedulemaker

psql -f schema.sql schedulemaker
psql -f seed.sql schedulemaker