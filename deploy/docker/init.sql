-- PostgreSQL schema for the Online Clinic reservation system

CREATE TABLE IF NOT EXISTS "user" (
    userid SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    usertype VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "DoctorsSchedule" (
    scheduleid SERIAL PRIMARY KEY,
    slotedate DATE NOT NULL,
    starttime TIME NOT NULL,
    endtime TIME NOT NULL,
    doctorid INTEGER NOT NULL REFERENCES "user"(userid),
    slotavail BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS "patientAppointment" (
    appointmentid SERIAL PRIMARY KEY,
    doctorid INTEGER NOT NULL REFERENCES "user"(userid),
    scheduleid INTEGER NOT NULL REFERENCES "DoctorsSchedule"(scheduleid),
    patientid INTEGER REFERENCES "user"(userid),
    appointmentdate DATE,
    starttime TIME
);
