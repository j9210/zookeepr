const router = require("express").Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/animals/:id', (req, res) => {
const result = findById(req.params.id, animals);
// if there's no record of the searched animal, return 404 status code
if (result) {
  res.json(result);
} else {
  res.send(404);
}
});

router.post('/animals', (req, res) => {
// req.body is where our incoming content will be
// set id based on what the next index of the array will be
req.body.id = animals.length.toString();

// if an data in req.body is incorrect, send back 404 err
if (!validateAnimal(req.body)) {
  res.status(400).send('The animal is not properly formatted.');
} else {
  // add animal to json file and animals array in this function
  const animal = createNewAnimal(req.body, animals);
  res.json(animal);
}
});

module.exports = router;