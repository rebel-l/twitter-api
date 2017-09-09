class Tweet {
    constructor(id, createdAt, text) {
        this.id = id;
        this.createdAt = createdAt;
        this.text = text;
    };

    setAttributeByTwitterJson(json) {
        this.id = json.id;
        this.createdAt = json.created_at;
        this.text = json.text;
    };

    print() {
        console.log('Id: [%s]', this.id);
        console.log('Text: [%s]', this.text);
        console.log('CreatedAt: [%s]', this.createdAt);
    }
}

module.exports = Tweet;