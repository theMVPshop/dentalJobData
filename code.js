
let DJ = [];
let MJ = [];
let ZD = [];
let svgNS = "http://www.w3.org/2000/svg";

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "DentalJobsFiltered.csv",
        dataType: "text",
        success: function(data) {processData(data, DJ);}
    });

    $.ajax({
        type: "GET",
        url: "uszips.csv",
        dataType: "text",
        success: function(data) {
            processData(data, ZD);
            console.log("zipsDone");
            plotData();
            $('.circle').hover(
                function() {
                    $("#zip span").text($(this).data( "zip" ));
                    $("#city span").text($(this).data( "city" ));
                    $("#state span").text($(this).data( "state" ));
                    $("#pop span").text($(this).data( "pop" ));
                    $("#jobs span").text($(this).data( "jobs" ));
            })
        }
     });

});


function processData(allText, lines) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = new Object();
            for (var j=0; j<headers.length; j++) {
                tarr[headers[j]] = data[j];
            }
            lines.push(tarr);
        }
    }
}


function plotData() {
    console.log("plotData");
    for (let a = 0; a<DJ.length; a++) {
        for (let b = 0; b <ZD.length; b++) {
            if (DJ[a].zip == ZD[b].zip) {
                let circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('fill', "#ff0000");
                circle.setAttribute('fill-opacity', .75);
                circle.setAttribute('cx', (Math.abs(parseFloat(ZD[b].lng)-(-124.7223)))*16.44);
                circle.setAttribute('cy', ((48.3772-parseFloat(ZD[b].lat))*25.28));
                circle.setAttribute('r', 2.25);
                circle.setAttribute('data-zip', DJ[a].zip);
                circle.setAttribute('data-city', DJ[a].city);
                circle.setAttribute('data-state', DJ[a].state);
                circle.setAttribute('data-pop', DJ[a].pop);
                circle.setAttribute('data-jobs', DJ[a].jobs);
                circle.setAttribute('class', "circle");

                let svg = document.querySelector('svg');
                svg.appendChild(circle);
            }
        }
    }
}
