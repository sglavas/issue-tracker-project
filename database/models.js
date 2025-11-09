const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    project:{
        type: String,
        required: true
    },
    issue_title:{
        type: String,
    },
    issue_text:{
        type: String,
    },
    created_on: {
        type: Date,
    },
    updated_on: Date,
    created_by: {
        type: String,
    },
    assigned_to: String,
    open:{
        type: Boolean,
        required: true
    },
    status_text: String
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue
