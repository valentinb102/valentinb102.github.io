
var panelTemplate;
var trainLineColors = {
    "ACE": {
        "color": "#fff",
        "background-color": "#2850AD"
    },
    "BDFM": {
        "color": "#fff",
        "background-color": "#FF6319"
    },
    "G": {
        "color": "#fff",
        "background-color": "#6CBE45"
    },
    "JZ": {
        "color": "#fff",
        "background-color": "#996633"
    },
    "L": {
        "color": "#fff",
        "background-color": "#A7A9AC"
    },
    "NQR": {
        "color": "#000",
        "background-color": "#FCCC0A"
    },
    "S": {
        "color": "#fff",
        "background-color": "#808183"
    },
    "123": {
        "color": "#fff",
        "background-color": "#EE352E"
    },
    "456": {
        "color": "#fff",
        "background-color": "#00933C"
    },
    "7": {
        "color": "#fff",
        "background-color": "#B933AD"
    }
};

; (function ($, document, window, undefined) {
    $(function () {
        // save the panel template as clone
        panelTemplate = $(".panelTemplate").clone();

        // download and store metro data
        var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + "http://web.mta.info/status/serviceStatus.txt" + '"') + '&format=xml&callback=?';

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
        var lineName = $.trim($(this).find('name').text());
        var lineStatus = $.trim($(this).find('status').text());
        var lineText = $.trim($(this).find('text').text());

        // add line info
        newPanel.find(".lineName").text(lineName);
        newPanel.find(".lineStatus").text(lineStatus);

        // add line color
        if (trainLineColors[lineName]) {
            newPanel.find(".lineName").css(trainLineColors[lineName]);
        }

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
            newPanel.find(".panelLink").addClass("lineStatusGood").removeAttr("href").removeAttr("data-toggle");
        }

        // show the accordion
        newPanel.removeClass("hidden");

        $("#accordion").append(newPanel);
    });
}

// mta specific stuff
function ShowHide(id) {
    $("#" + id).toggle();
}