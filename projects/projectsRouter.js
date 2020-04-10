const express = require('express');

const Projects = require('../data/helpers/projectModel.js'); 
const Actions = require('../data/helpers/actionModel.js'); 

const router = express.Router();



// Get
router.get('/', (req, res) => {
    Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving the Projects.' });
    });
});

// Post
router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error inserting project.' });
    });
  });

// Put
router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    Projects.update(id, changes)
    .then(update => {
        res.status(200).json(update);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update User name' });
    });
    
});


// Delete
router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
      .then(post => {
        res.status(200).json({ message: 'The Project has been deleted' });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: 'The Project could not be removed'
        });
      });
  });



function validateProjectId(req, res, next) {
    const { id } = req.params;
    console.log(id);
    Projects.get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({ error: 'Invalid project ID.' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Server error validating project ID' });
      });
  }

module.exports = router;