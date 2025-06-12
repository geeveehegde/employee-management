
var moment = require('moment');
const {staffValidator} = require('../../utils/validators');
var dbconn = require('../../data/mongonative-connection.js');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');
moment().format();

module.exports.createNewStaff = async function (req, res) {
    // Convert passed JSON in string format
    const jsonObj = req.body || req;

    // Validate the user data
    const validation = staffValidator.validateStaffValidator(jsonObj);

    // // If validation fails, return error response
    if (!validation.valid) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input",
            error: validation.error
        });
    }

    // Proceed with the data if validation is successful
    const { staffName, staffContactInfo, roleId } = jsonObj;

    // Prepare data to insert into the database
    const staffData = {
        staffName,
        staffContactInfo,
        roleId,
        createdAt: moment().toISOString(),  // Current timestamp
        updatedAt: moment().toISOString(),  // Current timestamp
    };


    const db = dbconn.get('healthCare');

    const roleCollection = db.collection('role');
    const roleExists = await roleCollection.findOne({ 
        _id: ObjectId.isValid(roleId) ? new ObjectId(roleId) : roleId 
    });

    if (!roleExists) {
        return res.status(400).json({
            status: "400",
            message: "Invalid roleId: Role does not exist",
            error: "Role not found in database"
        });
    }
    const collection = db.collection('staff');

    // Insert document into collection
    await collection.insertOne(staffData, function (err, response) {
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

module.exports.fetchAllStaff = function (req, res) {
    const db = dbconn.get('healthCare');
    const collection = db.collection('staff');

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