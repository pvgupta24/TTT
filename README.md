# TTL
- Demo [here](https://ttldemo.herokuapp.com/)

### Server
- The node server listens for get requests at `/api/count` and uses `routes/count.js` to handle it.

- The .txt file is requested using the request module, split and converted into an array of words.

- Each word is mapped to its count/frequency i.e a (key,value) pair dictionary is generated.

- `N` is retrieved from the request parameters and the first n words are sent back.


### Client
- Angular based client has a single AppComponent which sends a request to get words with their frequencies by sending `N` as a parameter.

- Retrieved data is displayed in a table.

- Karma-Jasmine is used for basic unit testing.
