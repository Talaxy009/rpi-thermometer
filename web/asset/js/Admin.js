function pushData(range) {
    var jsonPath;
    if (range) {
        jsonPath = "./data/halfDay.json";
    } else {
        jsonPath = "./data/hour.json";
    }
    $.getJSON(jsonPath, function (rawData) {
        if (window.LineChart.data.datasets[0].data.length != 0) {
            var length = window.LineChart.data.datasets[0].data.length;
            for (let i = 0; i < length; i++) {
                window.LineChart.data.datasets[0].data.pop();
                window.LineChart.data.datasets[1].data.pop();
            }
        }
        for (let i = 0; i < 13; i++) {
            window.LineChart.data.datasets[0].data.push(rawData[i].tmp);
            window.LineChart.data.datasets[1].data.push(rawData[i].hmt);
        }
        window.LineChart.update();
    });
};

function setData() {
    $.getJSON('/data/data.json', function (rawData, status) {
        if (status) {
            $('#temperature').text(rawData[0].tmp + '°C');
            $('#humidity').text(rawData[0].hmt + '%');
        } else {
            $('#temperature').text('ERROR');
            $('#humidity').text('ERROR');
        }
    });
};
