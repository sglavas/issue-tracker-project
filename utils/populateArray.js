/**
 * Populate array in the desired format
 * @module utils/populateArray
 * @param {array} array - Array of objects from the database
 * @returns {array} Returns an array of objects in the desired format
 */
const populateArray = array =>{
    let finalArray = []


    array.forEach(e =>{
        let object = {};
        object.assigned_to = e.assigned_to;
        object.status_text = e.status_text;
        object.open = e.open;
        object._id = e._id;
        object.issue_title = e.issue_title;
        object.issue_text = e.issue_text;
        object.created_by = e.created_by;
        object.created_on = e.created_on;
        object.updated_on = e.updated_on;

        finalArray.push(object);
    })

    return finalArray;
}

module.exports = populateArray
