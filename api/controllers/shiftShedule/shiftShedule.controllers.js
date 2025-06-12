
var moment = require('moment');
const {shiftSheduleValidator} = require('../../utils/validators');
const {createData1} = require('../crudmongodb.controllers');
var dbconn = require('../../data/mongonative-connection.js');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');
moment().format();

module.exports.createNewShift = async function (req, res) {
    // Convert passed JSON in string format
    const jsonObj = req.body || req;

    // Validate the user data
    const validation = shiftSheduleValidator.validateShiftSheduleValidator(jsonObj);

    // // If validation fails, return error response
    if (!validation.valid) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input",
            error: validation.error
        });
    }

    // Proceed with the data if validation is successful
    const { shiftName, capacity, type, date } = jsonObj;

    // Prepare data to insert into the database
    const adminShiftData = {
        shiftName,
        capacity,
        type,
        date,
        createdAt: moment().toISOString(),  // Current timestamp
        updatedAt: moment().toISOString(),  // Current timestamp
    };



    const db = dbconn.get('healthCare');
    const collection = db.collection('shiftShedule');

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

module.exports.fetchAllShift = function (req, res) {
    const db = dbconn.get('healthCare');
    const collection = db.collection('shiftShedule');

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