const Issue = require('./models');

const createAndSaveIssue = async (issue) => {
    // Get values from the create input
    const { issue_title, issue_text, created_by, assigned_to, status_text } = issue;

    // Create issue document with info input and current date
    const issueEntry = await new Issue({
        issueTitle: issue_title,
        issueText: issue_text,
        createdOn: new Date(),
        createdBy: created_by,
        assignedTo: assigned_to,
        open: true,
        statusText: status_text
    })

    try{
        // Save issue document to the model
        let result = await issueEntry.save();

        return result;
    }catch(err){
        console.log(err);
    }
}

module.exports = { createAndSaveIssue }
