
var moment = require('moment');
const {userValidator} = require('../../utils/validators');
const {createData} = require('../crudmongodb.controllers');
var dbconn = require('../../data/mongonative-connection.js');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');
moment().format();

module.exports.createRole = async function (req, res) {
    // Convert passed JSON in string format
    const jsonObj = req.body || req;

    // Proceed with the data if validation is successful
    const { roleName } = jsonObj;

    // Prepare data to insert into the database
    const roleData = {
        roleName,
        active: true,
        createdAt: moment().toISOString(),  // Current timestamp
        updatedAt: moment().toISOString(),  // Current timestamp
    };

    const db = dbconn.get('healthCare');
    const collection = db.collection('role');

    // Insert document into collection
    await collection.insertOne(roleData, function (err, response) {
        if (err) {
            return res.send ({
                status: "500",
                message: "Error inserting data",
                error: err
            });
        }
        // Return success response
        return res.json ({
            status: "201",
            message: "Data inserted successfully!",
            data: response.ops
        });
    });
};

module.exports.fetchRole = function (req, res) {
    const db = dbconn.get('healthCare');
    const collection = db.collection('role');

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