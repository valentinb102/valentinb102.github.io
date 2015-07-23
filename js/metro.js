
; (function ($, document, window, undefined) {
    $(function () {
        // download and store metro data
        var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + "http://web.mta.info/status/serviceStatus.txt" + '"') + '&format=xml&callback=?';

        $.getJSON(yql, function (data) {
            var serviceStatus = $.parseXML(data.results[0]);

            // create an accordion for each line
            console.log($(serviceStatus).find('line'));
        });
    });
})(jQuery, document, window);