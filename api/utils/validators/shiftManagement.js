const Joi = require('joi');

// Define the validation function
const validateShiftManagementValidator = (data) => {
  const schema = Joi.object({
    staffId: Joi.string().required(),
    shiftId: Joi.string().required(),
    comments: Joi.string().required(),
    date: Joi.date().require(),
    createdAt: Joi.date().optional(), // Created At
    updatedAt: Joi.date().optional(), // Updated At
    createdBy: Joi.string().alphanum().min(3).max(30).optional(), // Created By
    updatedBy: Joi.string().alphanum().min(3).max(30).optional() // Updated By
  });

  // Validate the data against the schema
  const { error, value } = schema.validate(data);

  // Return the validation result
  if (error) {
    return { valid: false, error: error.details[0].message }; // Return the first error message
  }
  return { valid: true, value }; // Return validated data
}

// Export the function
module.exports = {validateShiftManagementValidator,};
