const CLOSING_PRICES = [305, 345, 312, 373, 368, 420, 442, 520, 581, 701, 848, 1048, 1069, 876, 671, 772, 866, 961, 1097, 1135, 720, 942, 1025, 953, 1048, 1274, 1394, 1412, 1487, 1679, 1454, 1726, 1800, 2300, 1975, 2305];
const CLOSING_PRICES_MINUS = [0, 40, 7, 68, 63, 115, 137, 215, 276, 396, 543, 743, 764, 571, 366, 467, 561, 656, 792, 830, 415, 637, 720, 648, 743, 969, 1089, 1107, 1182, 1374, 1149, 1421, 1495, 1995, 1670, 2000];
const YEARS = [1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

const STEP = 9;

const initialData = {
    labels: YEARS, datasets: [
        {
            label: 'CLOSING_PRICES',
            borderWidth: 1,
            data: CLOSING_PRICES,
            yAxisID: "y",
            pointHitRadius: 30
        },
        {
            label: 'CLOSING_PRICES_MINUS',
            borderWidth: 1,
            fill: true,
            data: CLOSING_PRICES_MINUS,
            yAxisID: "y1",
            pointStyle: false,
            dragData: false
        },
        {
            label: 'STRICH',
            borderWidth: 1,
            data: Array(YEARS.length).fill(900),
            pointStyle: false,
            dragData: false
        },
        {
            label: 'STRICH',
            borderWidth: 1,
            data: Array(YEARS.length).fill(600),
            pointStyle: false,
            dragData: false,
        }
        ]
};

// Config
const config = {
    type: 'line',
    data: initialData,
    options: {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left'
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',

                grid: {
                    drawOnChartArea: false,
                    color: "#ff3f00",
                }
            }
        },
        plugins: {
            dragData: {
                onDragStart: function (e, datasetIndex, index, value) {
                }, onDrag: function (e, datasetIndex, index, value) {
                    updateSurroundingData(datasetIndex, index, value);
                }, onDragEnd: function (e, datasetIndex, index, value) {
                }
            }
        }
    }
};

// Create chart instance
const myChart = new Chart(document.getElementById('myChart'), config);

// Function to update surrounding data
function updateSurroundingData(datasetIndex, index, value) {
    console.log(datasetIndex);
    const dataset = myChart.data.datasets[datasetIndex].data;

    if (index > 0) {
        dataset[index - 1] = value - (value * 0.1); // Update previous data point
    }

    if (index < dataset.length - 1) {
        dataset[index + 1] = value - (value * 0.05); // Update next data point
    }

    let maxDataValue = Math.max(...dataset);
     // Round up to the nearest 10
    myChart.options.scales.y1.max = Math.ceil(maxDataValue / 10) * 10;

    myChart.update();
}





function onSliderChange(value) {
    const CLOSING_PRICES_SHOW = CLOSING_PRICES.slice(value, value + STEP);
    const CLOSING_PRICES_MINUS_SHOW = CLOSING_PRICES_MINUS.slice(value, value + STEP);
    const barChartLabels = YEARS.slice(value, value + STEP);

    myChart.data.datasets[0].data = CLOSING_PRICES_SHOW;
    myChart.data.datasets[1].data = CLOSING_PRICES_MINUS_SHOW;
    myChart.data.labels = barChartLabels;

    myChart.update();
}

const slider = document.getElementById('slider');

slider.addEventListener('input', (event) => {
    const value = parseInt(event.target.value, 10);
    onSliderChange(value);
});