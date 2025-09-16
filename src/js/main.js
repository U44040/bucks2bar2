document.addEventListener('DOMContentLoaded', function () {
    let barChart;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    
    
    for (let i = 0; i < cars.length; i++) {
        const element = cars[i];
        console.log(element);
    }

    const getData = type =>
        months.map(month => {
            const input = document.getElementById(`${type}-${month.toLowerCase()}`);
            return input ? Number(input.value) || 0 : 0;
        });

    const renderChart = () => {
        const ctx = document.getElementById('barChart').getContext('2d');
        if (barChart) barChart.destroy();
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
    };

    // Render chart when Chart tab is shown
    document.getElementById('chart-tab')?.addEventListener('shown.bs.tab', renderChart);

    // Update chart when data inputs change
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', () => {
            if (document.getElementById('chart').classList.contains('active')) {
                renderChart();
            }
        });
    });

    // Download canvas as image
    document.getElementById('download-btn')?.addEventListener('click', () => {
        const canvas = document.getElementById('barChart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'bucks2bar-chart.png';
        link.click();
    });

    /**
     * Validates the username input according to the following rules:
     * - At least 8 characters long
     * - Contains at least one uppercase letter
     * - Contains at least one digit
     * - Contains at least one special character (non-alphanumeric)
     * 
     * Updates the input element's CSS classes:
     * - Adds 'is-valid' and removes 'is-invalid' if valid
     * - Adds 'is-invalid' and removes 'is-valid' if invalid
     *
     * @param {HTMLInputElement} usernameInput - The input element containing the username to validate.
     */
    function validateUsername(usernameInput) {
        const username = usernameInput.value;
        // Username must be at least 8 characters, contain an uppercase letter, a digit, and a special character
        const usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        if (usernameRegex.test(username)) {
            usernameInput.classList.remove('is-invalid');
            usernameInput.classList.add('is-valid');
        } else {
            usernameInput.classList.remove('is-valid');
            usernameInput.classList.add('is-invalid');
        }
    }

    document.getElementById('username')?.addEventListener('input', event => {
        console.log(`Username changed to: ${event.target.value}`);
        validateUsername(event.target);
    });
});