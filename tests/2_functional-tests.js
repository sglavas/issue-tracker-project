const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Issue = require('../database/models');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    // Define suite-scope array
    let testData = [];


    // Add before and after hooks to isolate the tests
    before(async function() {
        await Issue.deleteMany({ project: "test" });
    });


    after(async function() {
        await Issue.deleteMany({ project: "test" });
    });

    // #1
    test('#1 Create an issue with every field: POST request to /api/issues/test', (done) => {
        this.timeout(10000);
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/test')
            .send({
                issue_title: "Fix UI Error",
                issue_text: "UI not rendering",
                created_by: "Mario",
                assigned_to: "Fabio",
                status_text: "In QA"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.issue_title, 'Fix UI Error');
                assert.equal(res.body.issue_text, 'UI not rendering');
                assert.equal(res.body.created_by, 'Mario');
                assert.equal(res.body.assigned_to, 'Fabio');
                assert.equal(res.body.status_text, 'In QA');

                // Destructure the object
                const { assigned_to, status_text, open, _id, issue_title, issue_text, created_by, created_on, updated_on } = res.body;
                const responseObject = { assigned_to, status_text, open, _id, issue_title, issue_text, created_by, created_on, updated_on };

                // Push the response object to the test array
                testData.push(responseObject);
                done();
            });
    });
    // #2
    test('#2 Create an issue with every field: POST request to /api/issues/test', (done) => {
        this.timeout(5000);
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/test')
            .send({
                issue_title: "Fix GUI Error",
                issue_text: "Missing accessibility features",
                created_by: "John",
                assigned_to: "Luigi",
                status_text: "In QA"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.issue_title, 'Fix GUI Error');
                assert.equal(res.body.issue_text, 'Missing accessibility features');
                assert.equal(res.body.created_by, 'John');
                assert.equal(res.body.assigned_to, 'Luigi');
                assert.equal(res.body.status_text, 'In QA');

                // Destructure the object
                const { assigned_to, status_text, open, _id, issue_title, issue_text, created_by, created_on, updated_on } = res.body;
                const responseObject = { assigned_to, status_text, open, _id, issue_title, issue_text, created_by, created_on, updated_on };
                
                // Push the response object to the test array
                testData.push(responseObject);

                done();
            });
    });



    // #3
    test('#3 Create an issue with only required fields: POST request to /api/issues/test', (done) => {
        this.timeout(5000);
        chai
        .request(server)
        .keepOpen()
        .post('/api/issues/test')
        .send({
            issue_title: "Fix OAuth Error",
            issue_text: "OAuth crashing",
            created_by: "Fabio",
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.issue_title, 'Fix OAuth Error');
            assert.equal(res.body.issue_text, 'OAuth crashing');
            assert.equal(res.body.created_by, 'Fabio');

            // Destructure the object
            const { open, _id, issue_title, issue_text, created_by, created_on, updated_on } = res.body;
            const responseObject = { open, _id, issue_title, issue_text, created_by, created_on, updated_on };
            
            // Push the response object to the test array
            testData.push(responseObject);

            done();
        });
    });
    
    // #4
    test('#4 Create an issue with missing required fields: POST request to /api/issues/test', (done) => {
        this.timeout(5000);
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/test')
            .send({
                assigned_to: "Fabio",
                status_text: "In QA"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.error, 'required field(s) missing');
                done();
            });
    })


    // #5
    test('#5 View issues on a project: GET request to /api/issues/test', (done) => {

        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/test')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(testData, res.body);
                done();
            });
    })


    // #6
    test('#6 View issues on a project with one filter: GET request to /api/issues/test', (done) => {
        // Filter the test array
        const filteredTestArray = testData.filter(object => object.status_text === "In QA");

        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/test?status_text=In QA')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(filteredTestArray, res.body);
                done();
            });
    })


    // #7
    test('#7 View issues on a project with multiple filters: GET request to /api/issues/test', (done) => {
        // Filter the test array
        const filteredTestArray = testData.filter(object => object.status_text === "In QA" && object.assigned_to === "Fabio");

        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/test?status_text=In QA&assigned_to=Fabio')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(filteredTestArray, res.body);
                done();
            });
    })

    // #8
    test('#8 Update one field on an issue: PUT request to /api/issues/test', (done) => {
        // Filter the test array
        const filteredTestArray = testData.filter(object => object.status_text === "In QA" && object.assigned_to === "Fabio");

        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id: filteredTestArray[0]._id,
                assigned_to: "Mario"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual( res.body, { result: 'successfully updated', _id: filteredTestArray[0]._id })
                done();
            });
    })

    // #9
    test('#9 Update multiple fields on an issue: PUT request to /api/issues/test', (done) => {
        // Filter the test array
        const filteredTestArray = testData.filter(object => object.status_text === "In QA" && object.assigned_to === "Fabio");

        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id: filteredTestArray[0]._id,
                assigned_to: "Mario",
                created_by: "Fabio"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual( res.body, { result: 'successfully updated', _id: filteredTestArray[0]._id })
                done();
            });
    })

    // #10
    test('#10 Update an issue with missing _id: PUT request to /api/issues/test', (done) => {
        // Filter the test array
        const filteredTestArray = testData.filter(object => object.status_text === "In QA" && object.assigned_to === "Fabio");

        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                assigned_to: "Mario",
                created_by: "Fabio"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(res.body, { error: 'missing _id' });
                done();
            });
    })

    // #11
    test('#11 Update an issue with no fields to update: PUT request to /api/issues/test', (done) => {
        // Filter the test array
        const filteredTestArray = testData.filter(object => object.status_text === "In QA" && object.assigned_to === "Fabio");

        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id: filteredTestArray[0]._id,
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(res.body, { error: 'no update field(s) sent', '_id': filteredTestArray[0]._id });
                done();
            });
    })

    // #12
    test('#12 Update an issue with an invalid _id: PUT request to /api/issues/test', (done) => {

        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id: '6910689cdaf2c2b783f2874d',
                assigned_to: "Mario",
                created_by: "Fabio"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(res.body, { error: 'could not update', _id: '6910689cdaf2c2b783f2874d' })
                done();
            });
    })

    // #13
    test('#13 Delete an issue: DELETE request to /api/issues/test', (done) => {
        // Filter the test array
        const filteredTestArray = testData.filter(object => object.status_text === "In QA" && object.assigned_to === "Fabio");

        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/test')
            .send({
                _id: filteredTestArray[0]._id
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(res.body, { result: 'successfully deleted', '_id': filteredTestArray[0]._id })
                done();
            });
    })

    // #14
    test('#14 Delete an issue with an invalid _id: DELETE request to /api/issues/test', (done) => {

        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/test')
            .send({
                _id: '6910689cdaf2c2b783f2874d'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(res.body, { error: 'could not delete', '_id': '6910689cdaf2c2b783f2874d' });
                done();
            });
    })

    // #15
    test('#15 Delete an issue with missing _id: DELETE request to /api/issues/test', (done) => {

        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/test')
            .send({
                _id: ''
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.deepEqual(res.body, { error: 'missing _id' });
                done();
            });
    })

});
