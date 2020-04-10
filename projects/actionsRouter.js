const express = require('express');

const Actions = require('../data/helpers/actionModel.js'); 

const router = express.Router();


// Get Actions
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving the Actions.' });
    });
});

// Post
router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error inserting action.' });
    });
  });

// Put
router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    Actions.update(id, changes)
    .then(update => {
        res.status(200).json(update);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update User name' });
    });
    
});


// Delete
router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
      .then(post => {
        res.status(200).json({ message: 'The action has been deleted' });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: 'The action could not be removed'
        });
      });
  });

function validateActionId(req, res, next) {
    const { id } = req.params;
    console.log(id);
    Actions.get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(400).json({ error: 'Invalid action ID.' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Server error validating action ID' });
      });
  }

module.exports = router;