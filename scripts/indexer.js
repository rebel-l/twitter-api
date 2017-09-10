let Twitter = require('twitter-node-client').Twitter;
let Config = require('./../etc/config');
let Tweet = require('../src/Twitter/Tweet');
let TweetCollection = require('../src/Mongo/TweetCollection');

console.log('Initalise Twitter API ...\n');

let error = function (err, response, data) {
    console.log(err, response, data);
};

let success = function (data) {
    let collection = new TweetCollection(Config.MongoDb.url);
    collection.addTweets(JSON.parse(data));
    console.log('Indexing finished!\n');
};


let myTwitter = new Twitter(Config.Twiiter.credentials);
myTwitter.getUserTimeline(Config.Twiiter.params, error, success);
