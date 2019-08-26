const db = require('../db');


async function employeeList(userId){
    try {
        const user = await db.one('select * from users WHERE id=$1', [userId]);
        // const business = await db.one('select business_name from businesses WHERE id=$1', [user.business_id]);
        const employeeList = await db.any('select * from users WHERE business_id=$1', [user.business_id]);
        // employeeList.push(business)
        // console.log(employeeList)
        // for (i = 0; i < employeeList.length; i++){
        //     const name = employeeList[i].displayname;
        //     const phone_number = employeeList[i].phone_number;
        //     const email = employeeList[i].email;
        //     employeeObj[employeeList[i].displayname] = {phone_number, email}
        // }
        // console.log(employeeObj)
        return employeeList
        }
    catch(error){
        console.log("There was an error retrieving employee list")
        console.log(error)
        return{
            id: 0,
            displayname: 'No user found'
        };
    }
};

async function RecurrTO (userId){
    console.log(`RecurrTO userid: ${userId}`)
    try{
        const user = await db.one('select * from users WHERE id=$1', [userId]);
        const userBusiness = user.business_id;
        console.log(userBusiness)
        const time_off_requests = await db.any(`SELECT * FROM recurring_TO INNER JOIN users ON recurring_TO.user_id = users.id WHERE business_id=$1`, [userBusiness]);
        const time_off_pending = time_off_requests.filter((x)=>x.approved === false);
        console.log(time_off_pending)
    }
    catch(error){
        console.log("There was an error retrieving Recurring TO")
        console.log(error)
        return{
            id: 0,
            displayname: 'No user found'
        };
    }
}
async function approveRecurrTO (approvedId){
    try{
            await db.any('UPDATE recurring_TO SET approved = true WHERE id=$1', [approvedId])
            const approved= await db.one('SELECT * FROM recurring_TO WHERE id=$1', [approvedId])
            console.log(approved)
            // return approve
    }
    catch(error){
        console.log("There was an error approving and updating Recurring TO")
        console.log(error)
        return{
            id: 0,
            displayname: 'No user found'
        };
    }
}

async function shifts(locationId){
    const shifts = await db.any('select * from shift_available WHERE location_id=$1', [locationId])
    console.log(shifts);
    return shifts
}

async function createShift (shiftObj){
    const {day_of_week, start_time, end_time, shift_title, business, location_id, location_name} = shiftObj;
    const shift_id = await db.one(`
        INSERT INTO shift_available 
        (day_of_week, start_time, end_time, shift_title, business, location_id, location_name) 
        values ($1, $2, $3, $4, $5, $6, $7)
        
        returning id`
        ,[day_of_week, start_time, end_time, shift_title, business, location_id, location_name]);
    console.log(shift_id);
    return shift_id;
}



// obj = {day_of_week: "Monday",
//         start_time: '03:00',
//         end_time: '04:00',
//         shift_title: 'closer',
//         business: 1,
//         location_id: 2,
//         location_name: 'Octane Westside'}

module.exports = {employeeList,}