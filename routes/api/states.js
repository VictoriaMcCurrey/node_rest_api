const express = require('express');
//const { default: regex } = require('uuid/dist/regex');
const router = express.Router();
const StatesDB = require('../../model/States');
const data = {};
data.states = require('../../model/states.json');

// /states/?contig=true All state data for contiguous states (Not AK or HI)

// /states/?contig=false All state data for non-contiguous states (AK, HI)

// get all states = /states/ All state data returned
router.route('/')
    .get((req, res) => {
        res.json(data.states);
    });

// get single state = /states/:state All data for the state URL parameter
router.route('/:state')
    .get((req, res) => {
        let state = data.states.find((state) => state.code === req.params.state.toUpperCase());
        res.json(state);
    });

// /states/:state/funfact A random fun fact for the state URL parameter
router.route('/:state/funfacts')
    .get((req, res) => {
        console.log("here from fun fact get request")
        let fact = StatesDB.find({ stateCode: req.params.stateCode.toUpperCase()}).exec();
        res.json(fact);
    })
router.route('/:state/funfacts')
    .post((req, res) => {
       console.log("here from fun fact post request")
        let result = StatesDB.create({
            stateCode: req.body.stateCode,
            funfacts: req.body.funfacts
        });
        res.status(201).json(result);
    });

// get state and capital = /states/:state/capital { ‘state’: stateName, ‘capital’: capitalName }
router.route('/:state/capital')
    .get((req, res) => {
        let state = data.states.find((state) => state.code === req.params.state.toUpperCase());
        res.json({ state: `${state.state}`, capital: `${state.capital_city}` });
    });

// get state and nickname = /states/:state/nickname { ‘state’: stateName, ‘nickname’: nickname }
router.route('/:state/nickname')
    .get((req, res) => {
        let state = data.states.find((state) => state.code === req.params.state.toUpperCase());
        res.json({ state: `${state.state}`, nickname: `${state.nickname}` });
    });

// get state and population = /states/:state/population { ‘state’: stateName, ‘population’: population }
router.route('/:state/population')
    .get((req, res) => {
        let state = data.states.find((state) => state.code === req.params.state.toUpperCase());
        res.json({ state: `${state.state}`, population: `${state.population}` });
    });

// /states/:state/admission { ‘state’: stateName, ‘admitted’: admissionDate }
router.route('/:state/admission')
    .get((req, res) => {
        let state = data.states.find((state) => state.code === req.params.state.toUpperCase());
        res.json({ state: `${state.state}`, admission: `${state.admission_date}` });
    });

module.exports = router;