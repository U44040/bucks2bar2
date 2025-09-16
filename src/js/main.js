document.addEventListener('DOMContentLoaded', function () {
    let barChart;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function getData(type) {
        return months.map(month => {
            const input = document.getElementById(`${type}-${month.toLowerCase()}`);
            return input ? Number(input.value) || 0 : 0;
        });
    }

    function renderChart() {
        const ctx = document.getElementById('barChart').getContext('2d');
        if (barChart) {
            barChart.destroy();
        }
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Income',
                        data: getData('income'),
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    },
                    {
                        label: 'Expenses',
                        data: getData('expenses'),
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Monthly Income vs Expenses' }
                }
            }
        });
    }

    // Render chart when Chart tab is shown
    const chartTab = document.getElementById('chart-tab');
    chartTab.addEventListener('shown.bs.tab', renderChart);

    // Optionally, update chart when data inputs change
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function () {
            if (document.getElementById('chart').classList.contains('active')) {
                renderChart();
            }
        });
    });
    // ...existing code...

    // Download canvas as image
    document.getElementById('download-btn').addEventListener('click', function () {
        const canvas = document.getElementById('barChart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'bucks2bar-chart.png';
        link.click();
    });
    document.getElementById('username').addEventListener('input', function (event) {
        const username = event.target.value;
        console.log('Username changed to:', username);
        const usernameInput = event.target;
        // You can add additional logic here as needed
        const usernameRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*\d).{8,}$/;
        if (usernameRegex.test(username)) {
            usernameInput.classList.remove('is-invalid');
            usernameInput.classList.add('is-valid');
        } else {
            usernameInput.classList.remove('is-valid');
            usernameInput.classList.add('is-invalid');
        }

    });

    
});