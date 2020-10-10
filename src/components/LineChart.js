require("./Chart.min.js");

export function generateChart() {
    var ctx = document.getElementById('LineChart');
    var LineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['60分前', '55分前', '50分前', '45分前', '40分前', '35分前',
                '30分前', '25分前', '20分前', '15分前', '10分前', '5分前', '现在'
            ],
            datasets: [{
                label: '温度',
                backgroundColor: [
                    'rgba(255, 35, 0, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 35, 0, 1)'
                ],
                borderWidth: 1,
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 35, 0, 1)',
                pointBackgroundColor: 'rgba(255, 35, 0, 0.5)'
            }, {
                label: '湿度',
                backgroundColor: [
                    'rgba(0, 155, 161, 0.3)'
                ],
                borderColor: [
                    'rgba(0, 155, 161, 1)'
                ],
                borderWidth: 1,
                pointRadius: 5,
                pointBorderColor: 'rgba(0, 155, 161, 1)',
                pointBackgroundColor: 'rgba(0, 155, 161, 0.5)',
                fill: '-1'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    window.LineChart = LineChart;
}; //生成表格

export function pushData(range) {
    var jsonPath;
    if (range) {
        jsonPath = "./data/halfDay.json";
    } else {
        jsonPath = "./data/hour.json";
    }
    $.getJSON(jsonPath, function (rawData) {
        if (LineChart.data.datasets[0].data.length != 0) {
            var length = window.LineChart.data.datasets[0].data.length;
            for (let i = 0; i < length; i++) {
                LineChart.data.datasets[0].data.pop();
                LineChart.data.datasets[1].data.pop();
            }
        }
        for (let i = 0; i < 13; i++) {
            LineChart.data.datasets[0].data.push(rawData[i].tmp);
            LineChart.data.datasets[1].data.push(rawData[i].hmt);
        }
        LineChart.update();
    });
}; //注入表格数据

export function setData() {
    $.getJSON('/data/data.json', function (rawData, status) {
        if (status) {
            $('#temperature').text(rawData[0].tmp + '°C');
            $('#humidity').text(rawData[0].hmt + '%');
        } else {
            $('#temperature').text('ERROR');
            $('#humidity').text('ERROR');
        }
    });
}; //更新实时温湿度
