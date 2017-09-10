const Twitter = require('twitter-node-client').Twitter;
const Config = require('./../etc/config');
// let Tweet = require('../src/Twitter/Tweet');
const TweetCollection = require('../src/Mongo/TweetCollection');
const ElasticSearchIndex = require('./../src/ElasticSearch/Index');

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

    // let esClient = new ElasticSearch.Client(Config.ElasticSearch);
    // esClient.search({
    //     index: 'movies',
    //     type: 'movie',
    //     body: {
    //         query: {
    //             match: {
    //                 body: 'Francis'
    //             }
    //         }
    //     }
    // });
    // esClient.index({
    //     index: 'twitter',
    //     type: 'tweet',
    //     id: '1',
    //     body: {
    //         title: 'Test 1',
    //         tags: ['y', 'z'],
    //         published: true,
    //     },
    //     refresh: true
    // }, function (error, response) {
    //     console.log(err);
    // });
    // esClient.index.()
    // esClient.create({
    //     index: 'myindex',
    //     type: 'mytype',
    //     id: '1',
    //     body: {
    //         title: 'Test 1',
    //         tags: ['y', 'z'],
    //         published: true,
    //     }
    // }, function (error, response) {
    //
    // });
    // esClient.indices.create({"index": "twitter"}, function(err, response, status){
    //     if (err) {
    //         console.log(err);
    //         throw 'Index could not be created.';
    //     }
    //
    //     console.log('index created', response);
    // });
    // esClient.ping(Config.ElasticSearch, function (err) {
    //     if (err) {
    //         console.log(err);
    //         throw'Elasticsearch is not reachable.';
    //     }
    //
    //     console.log('Elasticsearch connection established.\n');
    // });

    console.log('Indexing finished!\n');
};


let myTwitter = new Twitter(Config.Twiiter.credentials);
myTwitter.getUserTimeline(Config.Twiiter.params, error, success);
