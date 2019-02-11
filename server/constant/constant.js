//constant.js

// File api 
const uriDictionary = {
    FILE_URI: 'http://terriblytinytales.com/test.txt'
}

// To match any word as url
const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

//To check weather any word starting with special characters from the following set
const spclCharsSet = new Set(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '_', '/', '\\', '|', '`', ',', '.', '?', '<', '>']);

// To find any two or more words are separated by characters in delimiters array
const delimiter = '/';

module.exports = { uriDictionary, urlRegex, spclCharsSet, delimiter };