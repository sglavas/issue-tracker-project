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


const findExercise = async (input) => {
    // Destructure the input
    const { assigned_to, status_text, open, _id, issue_title, issue_text, created_by, created_on, updated_on, project } = input

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

module.exports = { createAndSaveIssue, findExercise }
