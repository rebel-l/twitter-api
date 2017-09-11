$(document).ready(function () {
    var ajaxUrl = 'ajax';

    $('#search').submit(function (element) {
        var data = {
          "q": $('#text')[0].value
        };

        $.post(ajaxUrl, data, success, 'json');
        console.log();

        element.preventDefault();
    });
});

var Renderer = {
    getTotal: function(count) {
        var total = document.createElement('h2');
        total.innerHTML = 'Treffer insgesamt: ' + count;
        return total;
    },
    getTweetHeadline: function() {
        var headline = document.createElement('h2');
        headline.innerHTML = 'Gefundene Tweets:';
        return headline;
    },
    getHit: function(hit) {
        var li = document.createElement('li');
        li.innerHTML = hit._source.text + ' (' + hit._source.createdAt + ')';
        return li;
    },
    getHits: function (hits) {
        var list = document.createElement('ol');
        var i, len = hits.length;

        for(i = 0; i < len; i++) {
            list.appendChild(this.getHit(hits[i]))
        }
        return list;
    }
};

function success(data) {
    var resultDom = $('#result')[0];
    resultDom.innerHTML = '';
    resultDom.append(Renderer.getTotal(data.total));
    if(data.total > 0) {
        resultDom.append(Renderer.getTweetHeadline());
        resultDom.append(Renderer.getHits(data.hits));
    }
}

