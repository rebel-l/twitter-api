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

function success(data) {
    console.log(data);
}