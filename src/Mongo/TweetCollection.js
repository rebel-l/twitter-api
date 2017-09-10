let MongoClient = require('mongodb').MongoClient;

class TweetCollection {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    addTweets(tweets) {
        let data = this.parseTwitterToModel(tweets);
        MongoClient.connect(this.connectionString, function (err, db) {
            if (err != null) {
                throw 'Connection to MongoDb failed';
            }

            console.log('MongoDb connection successful!');

            let collection = db.collection('tweets');
            collection.insertMany(data, function (err) {
                if (err != null) {
                    throw 'Document was not inserted';
                }

                db.close();
            });
        });
    }

    parseTwitterToModel(data) {
        let i;
        let len = data.length;
        let collection = [];

        for(i = 0; i < len; i++) {
            collection.push({
                "_id": data[i].id,
                "createdAt": data[i].created_at,
                "text": data[i].text
            });
        }

        return collection;
    }
}

module.exports = TweetCollection;