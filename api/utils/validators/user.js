const Joi = require('joi');

// Define the validation function
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(), // Name
    password: Joi.string().min(5).max(255).required(),
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

const validateModule = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(), // Name (string, 3-50 characters)
    description: Joi.string().max(500).optional(), // Description (string, up to 500 characters, optional)
    status: Joi.string().valid('active', 'inactive', 'pending').required(), // Status (must be one of these values)
    createdAt: Joi.date().required(), // Created At (valid date, required)
    updatedAt: Joi.date().required(), // Updated At (valid date, required)
    createdBy: Joi.string().alphanum().min(3).max(30).optional(), // Created By (alphanumeric, 3-30 characters)
    updatedBy: Joi.string().alphanum().min(3).max(30).optional() // Updated By (alphanumeric, 3-30 characters)
  });

  // Validate the data against the schema
  const { error, value } = schema.validate(data);

  // Return the validation result
  if (error) {
    return { valid: false, error: error.details[0].message }; // Return the first error message
  }
  return { valid: true, value }; // Return validated data
}

const validatePermission = (data) => {
  const schema = Joi.object({
    permissionName: Joi.string().min(3).max(50).required(), // Permission Name (string, 3-50 characters)
    moduleIds: Joi.array().items(Joi.string().alphanum()).required(), // Module IDs (array of alphanumeric strings)
    permission: Joi.array()
      .items(Joi.string().valid('Read', 'Write', 'Edit', 'Delete')) // Permissions: Read, Write, Edit, Delete
      .min(1)
      .max(4)
      .required(), // Must include at least one permission, max of four
    status: Joi.string().valid('active', 'inactive', 'pending').required(), // Status (must be one of these values)
    createdAt: Joi.date().required(), // Created At (valid date, required)
    updatedAt: Joi.date().required(), // Updated At (valid date, required)
    createdBy: Joi.string().alphanum().min(3).max(30).optional(), // Created By (alphanumeric, 3-30 characters)
    updatedBy: Joi.string().alphanum().min(3).max(30).optional() // Updated By (alphanumeric, 3-30 characters)
  });

  // Validate the data against the schema
  const { error, value } = schema.validate(data);

  // Return the validation result
  if (error) {
    return { valid: false, error: error.details[0].message }; // Return the first error message
  }
  return { valid: true, value }; // Return validated data
}

const validateRole= (data) => {
  const schema = Joi.object({
    roleName: Joi.string().min(3).max(50).required(), // Role Name (string, 3-50 characters)
    permissionIds: Joi.array().items(Joi.string().alphanum()).required(), // Array of Permission IDs (foreign keys, alphanumeric strings)
    status: Joi.string().valid('active', 'inactive', 'pending').required(), // Status (must be one of these values)
    createdAt: Joi.date().required(), // Created At (valid date, required)
    updatedAt: Joi.date().required(), // Updated At (valid date, required)
    createdBy: Joi.string().alphanum().min(3).max(30).optional(), // Created By (alphanumeric, 3-30 characters)
    updatedBy: Joi.string().alphanum().min(3).max(30).optional() // Updated By (alphanumeric, 3-30 characters)
  });

  // Validate the data against the schema
  const { error, value } = schema.validate(data);

  // Return the validation result
  if (error) {
    return { valid: false, error: error.details[0].message }; // Return the first error message
  }
  return { valid: true, value }; // Return validated data
}

const validateUserRole = (data) => {
  const schema = Joi.object({
    userId: Joi.string().alphanum().required(), // User ID (foreign key, alphanumeric string, required)
    roleId: Joi.string().alphanum().required(), // Role ID (foreign key, alphanumeric string, required)
    status: Joi.string().valid('active', 'inactive', 'pending').required(), // Status (must be one of these values)
    createdAt: Joi.date().required(), // Created At (valid date, required)
    updatedAt: Joi.date().required(), // Updated At (valid date, required)
    createdBy: Joi.string().alphanum().min(3).max(30).optional(), // Created By (alphanumeric, 3-30 characters)
    updatedBy: Joi.string().alphanum().min(3).max(30).optional() // Updated By (alphanumeric, 3-30 characters)
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
module.exports = {validateUser,validateModule, validatePermission, validateRole, validateUserRole};
