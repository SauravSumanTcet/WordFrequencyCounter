//file.controller.js

const constants = require('./../constant/constant');
/**
 * Process each line to get word array and process each word 
 * in that array to sanitize by checking for special characters 
 * at the start/end and in between word 
 * @param {Array<string>} lineArr
 */
function getSanitizedWords(lineArr) {
    let sanitized_words = [];
    lineArr.forEach(line => {
        const wordsInLine = line.split(/\s/).filter(word => word.length != 0);
        wordsInLine.forEach(word => {

            let startInd = 0;
            let endInd = word.length - 1;
            let charArr = Array.from(word);

            for (let i = 0; i <= endInd; i++) {
                if (constants.spclCharsSet.has(charArr[i])) {
                    continue;
                }
                startInd = i;
                break;
            }

            for (let i = endInd; i > startInd; i--) {
                if (constants.spclCharsSet.has(charArr[i])) {
                    continue;
                }
                endInd = i;
                break;
            }

            if (endInd !== startInd) {
                const sanitized_word = word.substr(startInd, endInd - startInd + 1);
                if (isNaN(sanitized_word)) {
                    if (!sanitized_word.match(constants.urlRegex)) {
                        sanitized_word.split(constants.delimiter).forEach(w => {
                            sanitized_words.push(w);
                        });
                    } else {
                        sanitized_words.push(sanitized_word);
                    }
                }
            }
        });
    });
    return sanitized_words;
}

/**
 * Returns arrary of [key,value] sorted by value of each key in wordMap
 * @param {Object} wordMap 
 * @param {number} count  
 */
function topN_FrequentWords(wordMap, count) {
    let sortable = [];
    for (let word in wordMap) {
        sortable.push([word, wordMap[word]]);
    }

    sortable.sort((a, b) => {
        return -a[1] + b[1];
    });

    return sortable.filter((el, i) => i < count);
}

/**
 * Return number of unique word in the text file in JSON format
 * @param {Object} wordMap 
 */
function getMaxWordCount(wordMap) {
    return { maxVal: Object.keys(wordMap).length };
}

module.exports =
    {
        getSanitizedWords: getSanitizedWords,
        topN_FrequentWords: topN_FrequentWords,
        getMaxWordCount: getMaxWordCount
    };