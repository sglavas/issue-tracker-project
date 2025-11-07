/**
 * Validate if a string represents a valid date
 * @module utils/validate
 * @param {string} date - Date provided as a string
 * @returns {boolean} True if the date is valid, false otherwise
 */
const isValidDate = date =>{
    let dateObject = new Date(date);
    
    return dateObject instanceof Date && !isNaN(dateObject);
}

module.exports = { isValidDate };
