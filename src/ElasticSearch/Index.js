let ElasticSearch = require('elasticsearch');

class Index {
    constructor(config) {
        this.index = "twitter";
        this.type = "tweet";
        // this.config = config;
        this.client = new ElasticSearch.Client(config);
    }

    addMultiple(json) {
        this.client.bulk(this.parseTwitterToBulkBody(json), function (err, resp) {
            if(err) {
                throw "Bulk change was not possible";
            }
            console.log(resp);
        });
    }

    parseTwitterToBulkBody(data) {
        let body = [];
        let i,
            len = data.length;

        for(i = 0; i < len; i++) {
            let action = this.indexAction;
            let doc = {};

            action._id = data[i].id;
            body.push(action);

            doc.createdAt = data[i].created_at;
            doc.text = data[i].text;
            body.push(doc);
        }

        return { "body": body };
    }

    ping() {
        this.client.ping({"requestTimeout": 1000}, function (err) {
            if (err) {
                console.log(err);
                throw 'Elasticsearch is not reachable.';
            }

            console.log('Elasticsearch connection established.\n');
        });
    }

    get indexAction() {
        return {
            "index": {
                "_index": this.index,
                "_type": this.type
            }
        };
    }
}

module.exports = Index;
