const Issue = require('./models');
const { isValidDate } = require('./../utils/validateDate');

const createAndSaveIssue = async (issue) => {
    // Get values from the create input
    const { issue_title, issue_text, created_by, assigned_to, status_text, project } = issue;

    // Generate current date object
    let currentDate = new Date();
    
    try{
        // Create issue document with info input and current date
        const issueEntry = new Issue({
            project: project,
            issueTitle: issue_title,
            issueText: issue_text,
            createdOn: currentDate,
            updatedOn: currentDate,
            createdBy: created_by,
            assignedTo: assigned_to,
            open: true,
            statusText: status_text
        })

        // Save issue document to the model
        let result = await issueEntry.save();

        return result;
    }catch(err){
        console.log(err);
    }
}


const findIssue = async (issue) => {
    // Destructure the input
    const { assigned_to, status_text, open, _id, issue_title, issue_text, created_by, created_on, updated_on, project } = issue

    try{
        // Get MongoDB query
        let query = {};

        // If parameters exist and are valid, add them to the MongoDB query
        if(assigned_to){
            query.assignedTo = assigned_to;
        }

        if(status_text){
            query.statusText = status_text;
        }

        if(typeof open === "boolean"){
            query.open = open;
        }

        if(_id){
            query._id = _id;
        }

        if(issue_title){
            query.issueTitle = issue_title;
        }

        if(issue_text){
            query.issueText = issue_text
        }

        if(created_by){
            query.createdBy = created_by;
        }

        // If date is valid, add it to the query
        if(isValidDate(created_on)){
            let dateObject = new Date(created_on);
            query.createdOn = dateObject;
        }

        if(isValidDate(updated_on)){
            let dateObject = new Date(updated_on);
            query.updatedOn = dateObject;
        }

        if(project){
            query.project = project;
        }

        // Query the Issue model
        let result = await Issue.find(query);
        return result;

    }catch(error){
        console.log(error);
    }
}


const findAndUpdateIssue = async (issue) => {
    // Get values from the update input     
    const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open, project } = issue;
    try{
        // Define the filter using the issue _id and project name
        const filter = {
            project: project,
            _id: _id
        };

        // Define the new updated_on date and time
        const newDate = new Date();

        // Define the information that the document should be updated with
        const update = {
            issueTitle: issue_title,
            issueText: issue_text,
            updatedOn: newDate,
            createdBy: created_by,
            assignedTo: assigned_to,
            open: open,
            statusText: status_text
        };

        // Find the document, update it and return the updated document
        let result = await Issue.findOneAndUpdate(filter, update, { new: true });

        return result;
    }catch(error){
        console.log(error);
    }
}

module.exports = { createAndSaveIssue, findIssue, findAndUpdateIssue }
