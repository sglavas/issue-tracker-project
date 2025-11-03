const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issue_title:{
        type: String,
        required: true
    },
    issue_text:{
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        required: true
    },
    updated_on: Date,
    created_by: {
        type: String,
        required: true
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
