const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    project:{
        type: String,
        required: true
    },
    issueTitle:{
        type: String,
        required: true
    },
    issueText:{
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    updatedOn: Date,
    createdBy: {
        type: String,
        required: true
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
