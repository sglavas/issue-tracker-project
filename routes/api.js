'use strict';

const { createAndSaveIssue, findIssue, findAndUpdateIssue, removeIssue } = require('./../database/mongoDB')
const populateArray = require('./../utils/populateArray');


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
      let result = await findIssue(documentObject);
      
      // If nothing matches the query
      if(result === "[]" || !result){
        // Send empty array
        res.json(result);
        return;
      }

      // If the query has matches, populate the array with the necessary information in the correct format
      const populatedArray = populateArray(result);
      // Send response
      res.json(populatedArray);

    })
    
    .post(async function (req, res){
      let project = req.params.project;

      // If the required fields are missing
      if(!req.body.issue_title || !req.body.issue_text || !req.body.created_by){
        res.send({ error: 'required field(s) missing' });
        return;
      }

      // Add project to the document object
      let documentObject = req.body;
      documentObject.project = project

      // Query the DB with the document object
      let result = await createAndSaveIssue(documentObject);

      res.send(result);

    })
    
    .put(async function (req, res){
      let project = req.params.project;

      const { assigned_to, status_text, _id, open, issue_title, issue_text, created_by } = req.body;
      
      // If the id is missing
      if(!_id){
        res.send({ error: 'missing _id' });
        return;
      }

      // If all update fields are empty
      if(!assigned_to && !status_text && !open && !issue_title && !issue_text && !created_by){
        res.send({ error: 'no update field(s) sent', '_id': _id });
        return;
      }



      // Add project to the document object
      let documentObject = req.body;
      documentObject.project = project;

      // Define the open property and add it to the document object
      let openProperty = req.body.open ? false : true

      documentObject.open = openProperty;

      // Query the DB with the document object
      let result = await findAndUpdateIssue(documentObject);

      // If no document was found, send error response
      if(!result){
        res.send({ error: "could not update", _id: documentObject._id});
        return;
      }

      res.send({ result: "successfully updated", "_id": result._id });

    })
    
    .delete(async function (req, res){
      let project = req.params.project;

      // Add project to document object
      let documentObject = req.body;
      documentObject.project = project;

      // If the id is missing
      if(!req.body._id){
        res.send({ error: 'missing _id' });
        return;
      }

      // Query the DB with the document object
      const result = await removeIssue(documentObject)

      // If no document was found, send error response
      if(!result){
        res.send({ error: "could not delete", _id: documentObject._id});
        return;
      }

      // If a document was removed, send success response
      res.send({ result:"successfully deleted", _id: result._id});
    });
    
};
