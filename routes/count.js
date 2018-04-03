var request = require("request");
var express = require('express');
var router = express.Router();

/* GET request */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var countCtrl = function(req,res){

}

var url = 'http://terriblytinytales.com/test.txt';
request(url, function(error, response, data) {
    if(error){
        //Could not read .txt file
        //Log error
        console.log(error);

		// TODO : Send approprate error message
		res.error = error;
		//res.end()
    }
    else{
        //Retrieved text successfully
        //console.log(data);
        
        //split by non alpha chars  
        var words = data.split(/\W+/);
        words=['a',"A"];
		var jsonArray = [];
        var wordDictionary = createWordMap(words);
        var finalwords = sortByCount(wordDictionary);

        console.log(finalwords);
        console.log('The word "' + finalwords[0].word + '" appears the most in the file ' + finalwords[0].count + ' times');

		res.status(200).send(jsonArray);
    }
    
});

function createWordMap (words) {

	// REFERERED : (key,value) lookup in js (hidden classes in V8 engine) are nearly O(1) operations similar to hashtable. 
	// https://stackoverflow.com/questions/7700987/performance-of-key-lookup-in-javascript-object
	// create map for word counts
	var wordDictionary = {};
	// Holds (key,value) pairs to denote count(value  ) for the given word(key).

	//If no words, max frequency is 0, else start with 1 and keep comparing  
	var maxCount = words.length === 0 ? 0 : 1;  
	words.forEach(function (key) {
		key = key.toLowerCase();
		if (wordDictionary.hasOwnProperty(key)) {
		// i.e === undefined
		wordDictionary[key]++;
		maxCount = Math.max(maxCount, wordDictionary[key]);
		} else {
		wordDictionary[key] = 1;
		}
	});
	console.log("Max Count is " + maxCount);
	return wordDictionary;
}


function sortByCount (wordDictionary) {

	// sort by count in descending order
	var finalwords = [];
	finalwords = Object.keys(wordDictionary).map(function(key) {
		return {
		word: key,
		count: wordDictionary[key]
		};
	});

	finalwords.sort(function(a, b) {
		return b.count - a.count;
	});

	return finalwords;

}

// TODO : Implement with Trie

module.exports = router;
