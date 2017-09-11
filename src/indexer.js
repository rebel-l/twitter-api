const Twitter = require('twitter-node-client').Twitter;
const Config = require('./../etc/config');
const TweetCollection = require('./Mongo/TweetCollection');
const ElasticSearchIndex = require('./ElasticSearch/Index');

console.log('Initalise Twitter API ...\n');

let error = function (err, response, data) {
    console.log(err, response, data);
};

let success = function (data) {
    let json = JSON.parse(data);

    // Persist data in database
    let collection = new TweetCollection(Config.MongoDb.url);
    collection.addTweets(json);

    // Persist data in index
    let index = new ElasticSearchIndex(Config.ElasticSearch);
    index.ping();
    index.addMultiple(json);

    console.log('Indexing finished!\n');
};


let myTwitter = new Twitter(Config.Twiiter.credentials);
myTwitter.getUserTimeline(Config.Twiiter.params, error, success);
