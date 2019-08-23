// var express = require('express');
const db = require('../db');

//Display profile
async function profile(userId){
    try {
        const user = await db.one('select * from users WHERE id=$1'[userId]);
        const userBusiness = await db.any('select * from businesses where user_business_id=$1', [user.business_id]);
        user.business = userBusiness;
        console.log(user)
        return user
        }
    catch(error){
        console.log("There was an error retrieving user")
        console.log(error)
        return{
            id: 0,
            displayname: 'No user found'
        };
    }
};

async function recurringTO(userId){
    try{
        const user = await db.one('select * from users WHERE id=$1', [userId]);
        const rec_time_off_pending= await db.any('select * from recurring_TO where user_id=$1 and approved=false', [user.id]);
        const rec_time_off_approved= await db.any('select * from recurring_TO where user_id=$1 and approved=true', [user.id]);
        user.time_off_approved = rec_time_off_approved;
        user.time_off_pending = rec_time_off_pending;
        console.log(user)
        return user;
    }
    catch(error){
        console.log("There was an error retrieving user Recurring Time Off")
        console.log(error)
        return{
            id: 0,
            displayname: 'No user found'
        };
    }
}

async function oneTO(userId){
    try{
        const user = await db.one('select * from users WHERE id=$1', [userId]);
        const one_vaca_pending= await db.any('select * from one_vaca where user_id=$1 and approved=false', [user.id]);
        const one_vaca_approved= await db.any('select * from one_vaca where user_id=$1 and approved=true', [user.id]);
        user.time_off_approved = one_vaca_approved;
        user.time_off_pending = one_vaca_pending;
        console.log(user)
        return user;
    }
    catch(error){
        console.log("There was an error retrieving user Single Vacation")
        console.log(error)
        return{
            id: 0,
            displayname: 'No user found'
        };
    }
}

async function createRecurrTO(userDataObj){
    const {day_of_week, start_time, end_time, user_id} = userDataObj;
    const timeOff = await db.one(`
        INSERT INTO recurring_TO (day_of_week, start_time, end_time, user_id) values ($1, $2, $3, $4)
        returning id`
        ,[day_of_week, start_time, end_time, user_id]);
    console.log(timeOff);
    return timeOff;
}

async function createOneVaca(userDataObj){
    const {start_date, end_date, start_time, end_time, user_id} = userDataObj;
    const vacaRequest = await db.one(`
        INSERT INTO one_vaca (start_date, end_date, start_time, end_time, user_id) values ($1, $2, $3, $4, $5)
        returning id`
        ,[start_date, end_date, start_time, end_time, user_id]);
    console.log(vacaRequest);
    return vacaRequest;
}

profile(2)
recurringTO(2)
oneTO(2)
