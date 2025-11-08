const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    project:{
        type: String,
        required: true
    },
    issueTitle:{
        type: String,
    },
    issueText:{
        type: String,
    },
    createdOn: {
        type: Date,
    },
    updatedOn: Date,
    createdBy: {
        type: String,
    },
    assignedTo: String,
    open:{
        type: Boolean,
        required: true
    },
    statusText: String
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue
