/**
 * Validate MongoDB ID
 * @module utils/validateMongoId
 * @param {string} id - String from the input
 * @returns {boolean} True if string is valid MongoDB id, false otherwise
*/

const ObjectId = require('mongoose').Types.ObjectId;

const isValidObjectId = id => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id) {
            return true;
        }
        return false;
    }
    return false;
}

module.exports = isValidObjectId;

