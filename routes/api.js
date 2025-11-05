'use strict';

const { createAndSaveIssue } = require('./../database/mongoDB')

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      // Get query parameters from the GET request
      const { assigned_to, status_text, _id, open, issue_title, issue_text, created_by, created_on, updated_on } = req.query;

    })
    
    .post(function (req, res){
      let project = req.params.project;

      createAndSaveIssue(req.body)

    })
    
    .put(function (req, res){
      let project = req.params.project;
      // Get values from the update input
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

    })
    
    .delete(function (req, res){
      let project = req.params.project;
      // Get ID from the delete input
      const { _id } = req.body;
    });
    
};
