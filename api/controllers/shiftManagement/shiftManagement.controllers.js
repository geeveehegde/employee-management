
var moment = require('moment');
const {shiftManagementValidator} = require('../../utils/validators');
var dbconn = require('../../data/mongonative-connection.js');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');
moment().format();

module.exports.createNewShiftManagement = async function (req, res) {
    // Convert passed JSON in string format
    const jsonObj = req.body || req;

    // Validate the user data
    const validation = shiftManagementValidator.validateShiftManagementValidator(jsonObj);

    // // If validation fails, return error response
    if (!validation.valid) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input",
            error: validation.error
        });
    }

    // Proceed with the data if validation is successful
    const { staffId, shiftId, date, comments } = jsonObj;

    // Prepare data to insert into the database
    const adminShiftData = {
        staffId, 
        shiftId, 
        date, 
        comments,
        createdAt: moment().toISOString(),  // Current timestamp
        updatedAt: moment().toISOString(),  // Current timestamp
    };


    const db = dbconn.get('healthCare');

    const staffCollection = db.collection('staff');
    const staffExists = await staffCollection.findOne({ 
        _id: ObjectId.isValid(staffId) ? new ObjectId(staffId) : staffId 
    });

    if (!staffExists) {
        return res.status(400).json({
            status: "400",
            message: "Invalid staffExists: Role does not exist",
            error: "staff not found in database"
        });
    }

    const shiftSheduleCollection = db.collection('shiftShedule');
    const shiftSheduleExists = await shiftSheduleCollection.findOne({ 
        _id: ObjectId.isValid(shiftId) ? new ObjectId(shiftId) : shiftId 
    });

    if (!shiftSheduleExists) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Shift: Role does not exist",
            error: "Shift not found in database"
        });
    } 

    // Check shift capacity
    const shiftManagementCollection = db.collection('shiftManagement');
    const currentAssignments = await shiftManagementCollection.countDocuments({
        shiftId: ObjectId.isValid(shiftId) ? new ObjectId(shiftId) : shiftId,
    });

    // Get the capacity from shiftShedule (assuming it has a 'capacity' field)
    const shiftCapacity = shiftSheduleExists.capacity || 0;

    if (currentAssignments <= shiftCapacity  ) {
        return res.status(400).json({
            status: "400",
            message: "Shift capacity exceeded",
            error: `This shift has reached its maximum capacity of ${shiftCapacity}. Current assignments: ${currentAssignments}`
        });
    }

    const duplicateStaffCheck = await shiftManagementCollection.findOne({
        staffId: staffId,
        shiftId: shiftId,
    });

    console.log("duplicateStaffCheck", duplicateStaffCheck)

    if (duplicateStaffCheck) {
        return res.status(400).json({
            status: "400",
            message: "Duplicate assignment not allowed",
            error: "This staff member is already assigned to this shift on the same date"
        });
    }

    const collection = db.collection('shiftManagement');

    // Insert document into collection
    await collection.insertOne(adminShiftData, function (err, response) {
        if (err) {
            console.log("err >>>", err)
            return res.send ({
                status: "500",
                message: "Error inserting data",
                error: err
            });
        }
        console.log("response >>>", response.ops)
        // Return success response
        return res.json ({
            status: "201",
            message: "Data inserted successfully!",
            data: response.ops
        });
    });
};

module.exports.fetchAllShiftManagement = function (req, res) {
    const db = dbconn.get('healthCare');
    const collection = db.collection('shiftManagement');

    const query =  {}; // Defaults to empty object if no query provided
    const sort =  {}; // Defaults to empty object if no sort specified

    collection.find(query).sort(sort).toArray(function (err, response) {
        if (err) {
            return res.status(500).json({
                status: "500",
                message: "Error retrieving data",
                error: err
            });
        }

        res.status(200).json({
            status: "200",
            message: "Data retrieved successfully",
            data: response
        });
    });
};