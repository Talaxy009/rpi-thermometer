function generateChart() {
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
}