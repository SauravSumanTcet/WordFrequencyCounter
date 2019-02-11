// file.route.js

const express = require('express');
const request = require('request');
const tttRoutes = express.Router();
const ctrl = require('./file.controller');
const constants = require('./../constant/constant');

let wordMap = {};

/**
 * Route to read text file and get number of unique words in it 
 */
tttRoutes.route('/getMaxWordCount').get((req, res) => {
    // fetch words from file and process
    request.get(constants.uriDictionary.FILE_URI, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            body = body.toLowerCase();
            const lines = body.split(/\n/).filter(line => line.length != 0);

            let sanitized_words = ctrl.getSanitizedWords(lines);

            sanitized_words.forEach(el => {
                el = el.toLowerCase();
                wordMap[el] = wordMap[el] ? wordMap[el] + 1 : 1
            });

            res.send(ctrl.getMaxWordCount(wordMap));

        } else {
            res.status(404).send(error);
        }
    });
});


// Defined getTopN_FrequentWords route with the count of words to return as input param
tttRoutes.route('/getTopN_FrequentWords/:count').get((req, res) => {
    // If input N is not a number send error
    if (isNaN(req.params.count)) {
        res.status(400).send({ 'errMsg': `TypeError: request param is only acceptable in type number` });
        return;
    }
    // If input N is a number
    if (req.params.count > ctrl.getMaxWordCount(wordMap)) {
        res.status(400).send({ 'errMsg': `ArrayLengthExceededError: request param cannot be greater than ${ctrl.getMaxWordCount(wordMap)}` });
        return;
    }
    // If input N is less than 1
    if (req.params.count <= 0) {
        res.status(400).send({ 'errMsg': `RequiredError: request param cannot be <=0` });
        return;
    }

    res.send(ctrl.topN_FrequentWords(wordMap, req.params.count));
});

module.exports = tttRoutes;