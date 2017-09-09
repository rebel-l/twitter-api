let Twitter = require('twitter-node-client').Twitter;
let Config = require('./../etc/config');
let Tweet = require('../src/Twitter/Tweet');

console.log('Initalise Twitter API ...\n');

let error = function (err, response, data) {
    console.log(err, response, data);
};

let success = function (data) {
    data = JSON.parse(data);
    let i;
    let len = data.length;
    // console.log('Response: [%s]', data);
    // console.log(len);
    for(i = 0; i < len; i++) {
        let tweet = new Tweet();
        tweet.setAttributeByTwitterJson(data[i]);
        tweet.print();
        console.log();
    }
};

let myTwitter = new Twitter(Config.credentials);
myTwitter.getUserTimeline(Config.params, error, success);

// let tweet = new Tweet(123, '01.01.1970', 'Test');
// console.log(tweet.id);

console.log('Indexing finished!\n');



