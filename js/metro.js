
var panelTemplate;

; (function ($, document, window, undefined) {
    $(function () {
        // save the panel template as clone
        panelTemplate = $(".panelTemplate").clone();

        // download and store metro data
        var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + "http://web.mta.info/status/serviceStatus.txt" + '"') + '&format=xml&callback=?';

        $.getJSON(yql, function (data) {
            var serviceStatus = $.parseXML(data.results[0]);

            updateServiceInfo(serviceStatus);
        });
    });
})(jQuery, document, window);

// update service info
function updateServiceInfo(serviceStatus) {
    // set last updated date
    $(".serviceLastUpdated").text(moment($(serviceStatus).find('timestamp').text(), "M/D/YYYY H:mm:ss A").fromNow());

    // create an accordion for each line
    $(serviceStatus).find('line').each(function (index, item) {
        var newPanel = panelTemplate.clone();
        var lineStatus = $(this).find('status').text();
        var lineText = $(this).find('text').text();

        // add line info
        newPanel.find(".lineTitle").text($(this).find('name').text());
        newPanel.find(".lineStatus").text(lineStatus);

        // add status class
        if (lineStatus === "GOOD SERVICE") {
            newPanel.find(".lineStatus").addClass("lineStatusGood");
        } else {
            newPanel.find(".lineStatus").addClass("lineStatusBad");
        }

        if (lineText.length) {
            // add text as jquery element 
            newPanel.find(".lineText").append($(lineText));

            // add collapse support
            newPanel.find(".panelLink").attr("href", "#collapse" + index);
            newPanel.find(".panel-collapse").attr("id", "collapse" + index);
        } else {
            // disable collapse
            newPanel.find(".panelLink").removeAttr("data-toggle");
        }

        // show the accordion
        newPanel.removeClass("hidden");

        $("#accordion").append(newPanel);
    });
}