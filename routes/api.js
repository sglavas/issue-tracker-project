'use strict';

const { createAndSaveIssue, findExercise } = require('./../database/mongoDB')

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let project = req.params.project;
      // Get query parameters from the GET request
      const { assigned_to, status_text, _id, open, issue_title, issue_text, created_by, created_on, updated_on } = req.query;

      // Add project to the document object
      let documentObject = req.query;
      documentObject.project = project;

      // Query the DB with the document object
      let result = await findExercise(documentObject);

      res.json(result);
    })
    
    .post(async function (req, res){
      let project = req.params.project;

      // Add project to the document object
      let documentObject = req.body;
      documentObject.project = project

      // Query the DB with the document object
      let result = await createAndSaveIssue(documentObject);

      res.send(result);

    })
    
    .put(function (req, res){
      let project = req.params.project;


    })
    
    .delete(function (req, res){
      let project = req.params.project;
      // Get ID from the delete input
      const { _id } = req.body;
    });
    
};
