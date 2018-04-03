var request = require("request");
var express = require('express');
var router = express.Router();

/* GET request */
router.get('/', function(req,res){
	var n = req.query.n;
	console.log("Counting " + n);
	var url = 'http://terriblytinytales.com/test.txt';
	request(url, function(error, response, data) {
		if(error){
			//Could not read .txt file
			//Log error
			console.log(error);
	
			// TODO: Send approprate error message
			res.error = error;
			res.end()
		}
		else{
			//Retrieved text successfully
			//console.log(data);
			
			//split by non alpha chars  
			var words = data.split(/\W+/);
			// words = ['a',"A"];
			var jsonArray = [];
			var wordDictionary = createWordMap(words);
			var sortedWords = sortByCount(wordDictionary);
			firstN = sortedWords.slice(0, n);
			//TODO: Change for larger arrays : If n is large better to use O(n) algo
			// Array arr of lists length maxCount which is calculated
			// Traverse array once, push to arr[count] for given count
			// First n elements in reverse order to be returned

			// console.log(sortedWords);	
			res.status(200).send(firstN);
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
		var sortedWords = [];
		sortedWords = Object.keys(wordDictionary).map(function(key) {
			return {
				word: key,
				count: wordDictionary[key]
			};
		});
	
		// sortedWords.sort(function(a, b) {
		// 	return b.count - a.count;
		// });
		bubbleSort(sortedWords, n)
		return sortedWords;
	
	}
	//Bubble sort to get n greatest elements : Good for smaller arrays
	function bubbleSort(items, n) {
		console.log(items[0].count);
		var length = items.length;
		for (var i = 0; i < n; i++) { 
			//Number of passes = n
		  for (var j = (length - 1); j > i ; j--) { 
			//Compare the adjacent positions
			if(items[j].count > items[j-1].count) {
			  //Swap
			  var tmp = items[j];
			  items[j] = items[j-1];
			  items[j-1] = tmp;
			}
		  }        
		}
	  }

	// TODO: Implement with Trie
	
});

module.exports = router;
