const Joi = require('joi');

// Define the validation function
const validateStaffValidator = (data) => {
  const schema = Joi.object({
    staffName: Joi.string().alphanum().min(3).max(30).required(), // Name
    staffContactInfo: Joi.number().required(),
    roleId: Joi.string().min(1).max(255).required(),
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
module.exports = {validateStaffValidator,};
