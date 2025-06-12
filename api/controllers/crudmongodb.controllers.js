var dbconn = require('../data/mongonative-connection.js');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');
moment().format();


module.exports.createData = async function (data) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>> 2");
    // Convert passed JSON in string format
    const jsonObj = data

    console.log(">>>>>>>>>>>>>>>>>>>>>>> 3");

    // if (!jsonObj.db || !jsonObj.collectionName || !jsonObj.createData) {
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>> 4");
    //     return res.status(400).json({
    //         status: "400",
    //         message: "Invalid input : 'db', 'collectionName', and 'createData' are required fields."
    //     });
    // }

    console.log(">>>>>>>>>>>>>>>>>>>>>>> 5");

    // Open database connection and specify collection
    
};

module.exports.createMultiData = function (req, res) {
    const jsonObj = req.body || req;

    if (!jsonObj.db || !jsonObj.collectionName || !jsonObj.updateData || !Array.isArray(jsonObj.updateData)) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input: 'db', 'collectionName', and 'updateData' (array) are required fields."
        });
    }

    const db = dbconn.get(jsonObj.db);
    const collection = db.collection(jsonObj.collectionName);

    collection.insertMany(jsonObj.updateData, function (err, response) {
        if (err) {
            return res.status(500).json({
                status: "500",
                message: "Error inserting data",
                error: err
            });
        }

        res.status(201).json({
            status: "201",
            message: "Data inserted successfully!",
            insertedCount: response.insertedCount,
            insertedIds: response.insertedIds,
            data: response.ops
        });
    });
};

module.exports.updateData = function (req, res) {
    const jsonObj = req.body || req;

    if (!jsonObj.db || !jsonObj.collectionName || !jsonObj.pkId || !jsonObj.updateData) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input: 'db', 'collectionName', 'pkId', and 'updateData' are required fields."
        });
    }

    const db = dbconn.get(jsonObj.db);
    const collection = db.collection(jsonObj.collectionName);

    collection.findOneAndUpdate(
        { _id: ObjectId(jsonObj.pkId) },
        { $set: jsonObj.updateData },
        { returnOriginal: false },
        function (err, response) {
            if (err) {
                return res.status(500).json({
                    status: "500",
                    message: "Error updating data",
                    error: err
                });
            }

            if (!response.value) {
                return res.status(404).json({
                    status: "404",
                    message: "Document not found"
                });
            }

            res.status(200).json({
                status: "200",
                message: "Data updated successfully!",
                returnId: response.value._id,
                data: response.value
            });
        }
    );
}; 

module.exports.updateIncrementDb = function (req, res) {
    // open database connection

    // Convert passwed JSON in string format
    //var locJsonObj = JSON.parse(JSON.stringify(req.body));

    if (req.body) {
        var locJsonObj = JSON.parse(JSON.stringify(req.body, null, 3));
    } else {
        var locJsonObj = req;
    }

    // var db = dbconn.get(locJsonObj.db);
    var db = dbconn.get(locJsonObj.db);


    // Fetch data from JSON in object form required for document update. For string use JSON.stringify
    var locUpdatedDocument = locJsonObj['updateData'];

    // fetch collection name from JSON in string format
    var locCollectionName = locJsonObj['collectionName']; // string form


    // fetch collection name from JSON in string format
    var locPkID = locJsonObj['pkId']; // string form

    /*  Passed paramter printing to check they are received properly*/

    // Open the collection
    var locCollection = db.collection(locCollectionName);

    // If data is passed insert the document with callback funtion to handle return for error and success
    if (locJsonObj) {
        locCollection.findOneAndUpdate({ _id: (locPkID) },
            { $set: locUpdatedDocument }, { new: true }, function (err, response) {
                // Handling errors
                if (err) {
                    if (req.body) {
                        res
                            .status(500)
                            .json({
                                "status": "500",
                                "message": "Error inserting data",
                                "error": err,
                                "response": response
                            });
                    } else {
                        res(response)
                    }
                    // Handling success operation
                } else {

                    if (req.body) {
                        res
                            .status(201)
                            .json({
                                "status": "200",
                                "message": "Data updated Successfully!",
                                "error": err,
                                "response": response,
                                "returnId": response.value._id,
                                "data": response.value
                            })
                    } else {
                        res({
                            "status": "200",
                            "message": "Data updated Successfully!",
                            "error": err,
                            "response": response,
                            "returnId": response.value._id,
                            "data": response.value
                        })
                    }
                }
            })
    } else {
        if (req.body) {
            res
                .status(500)
                .json({
                    "status": "500",
                    "message": "Error inserting data",
                    "error": err,
                    "response": response
                });
        } else {
            res(response)
        }
    }

}

module.exports.deleteData = function (req, res) {
    const jsonObj = req.body || req;

    if (!jsonObj.db || !jsonObj.collectionName || !jsonObj.pkId) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input: 'db', 'collectionName', and 'pkId' are required fields."
        });
    }

    const db = dbconn.get(jsonObj.db);
    const collection = db.collection(jsonObj.collectionName);

    collection.deleteOne({ _id: ObjectId(jsonObj.pkId) }, function (err, response) {
        if (err) {
            return res.status(500).json({
                status: "500",
                message: "Error deleting data",
                error: err
            });
        }

        if (response.deletedCount === 0) {
            return res.status(404).json({
                status: "404",
                message: "Document not found"
            });
        }

        res.status(200).json({
            status: "200",
            message: "Data deleted successfully",
            deletedCount: response.deletedCount
        });
    });
};

module.exports.retrieveAll = function (req, res) {
    const jsonObj = req.body || req;

    if (!jsonObj.db || !jsonObj.collectionName) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input: 'db' and 'collectionName' are required fields."
        });
    }

    const db = dbconn.get(jsonObj.db);
    const collection = db.collection(jsonObj.collectionName);

    const query = jsonObj.queryStr || {}; // Defaults to empty object if no query provided
    const sort = jsonObj.sortQuery || {}; // Defaults to empty object if no sort specified

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

module.exports.retrieveOne = function (req, res) {
    const jsonObj = req.body || req;

    // Input validation
    if (!jsonObj.db || !jsonObj.collectionName || !jsonObj._id) {
        return res.status(400).json({
            status: "400",
            message: "Invalid input: 'db', 'collectionName', and '_id' are required fields."
        });
    }

    const db = dbconn.get(jsonObj.db);
    const collection = db.collection(jsonObj.collectionName);

    // Find the document by ID
    collection.findOne({ _id: ObjectId(jsonObj._id) }, function (err, response) {
        if (err) {
            return res.status(500).json({
                status: "500",
                message: "Error retrieving data",
                error: err
            });
        }

        if (!response) {
            return res.status(404).json({
                status: "404",
                message: "Document not found"
            });
        }

        res.status(200).json({
            status: "200",
            message: "Data retrieved successfully",
            data: response
        });
    });
};

module.exports.dropSchema = function (req, res) {
    // open database connection

    // Convert passwed JSON in string format

    if (req.body) {
        var locJsonObj = JSON.parse(JSON.stringify(req.body, null, 3));
    } else {
        var locJsonObj = req;
    }


    // var locJsonObj = JSON.parse(JSON.stringify(req.body));

    // var db = dbconn.get(locJsonObj.db);
    var db = dbconn.get(locJsonObj.db);


    // fetch collection name from JSON in string format
    var locCollectionName = locJsonObj['collectionName']; // string form



    // Open the collection
    var locCollection = db.collection(locCollectionName);

    // If data is passed insert the document with callback funtion to handle return for error and success
    if (locJsonObj) {
        locCollection.drop(function (err, response) {
            // Handling errors
            if (err) {

                if (req.body) {
                    res
                        .status(500)
                        .json({
                            "status": "500",
                            "message": "Error deleting data",
                            "error": err,
                            "response": response
                        });
                } else {
                    res({
                        "status": "500",
                        "message": "Error deleting data",
                        "error": err,
                        "response": response
                    })
                }
                // Handling success operation
            } else {
                //
                if (req.body) {
                    res
                        .status(201)
                        .json({
                            "status": "200",
                            "message": "Data deleted Successfully!",
                            "error": err,
                            "response": response
                        });
                } else {
                    res({
                        "status": "200",
                        "message": "Data deleted Successfully!",
                        "error": err,
                        "response": response
                    })
                }
            }
        })
        // In case data is not passed 
    } else {
        res
            .status(400)
            .json({
                "status": "400",
                "message": "Error deleting data",
                "error": err,
                "response": response
            })

    }
}

module.exports.createData1 = async function (data) {
    const jsonObj = data

    const db = dbconn.get(jsonObj.db);
    const collection = db.collection(jsonObj.collectionName);

    // Insert document into collection
    await collection.insertOne(jsonObj.updateData, function (err, response) {
        if (err) {
            console.log("err >>>", err)
            return {
                status: "500",
                message: "Error inserting data",
                error: err
            };
        }
        console.log("response >>>", response.ops)
        // Return success response
        return response.ops
    });
    
};