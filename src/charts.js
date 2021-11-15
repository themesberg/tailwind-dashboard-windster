import ApexCharts from 'apexcharts';

if (document.getElementById('main-chart')) {
	const options = {
		chart: {
			height: 420,
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			foreColor: '#6B7280',
			toolbar: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				enabled: true,
				opacityFrom: 0.45,
				opacityTo: 0
			}
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif',
			},
		},
		grid: {
			show: true,
			borderColor: '#F3F4F6',
			strokeDashArray: 1,
			padding: {
				left: 35,
				bottom: 15
			}
		},
		series: [
			{
				name: 'Revenue',
				data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
				color: '#0694a2'
			},
			{
				name: 'Revenue (previous period)',
				data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
				color: '#4E4187'
			}
		],
		markers: {
			size: 5,
			strokeColors: '#ffffff',
			hover: {
				size: undefined,
				sizeOffset: 3
			}
		},
		xaxis: {
			categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
			labels: {
				style: {
					colors: ['#6B7280'],
					fontSize: '14px',
					fontWeight: 500,
				},
			},
			axisBorder: {
				color: '#F3F4F6',
			},
			axisTicks: {
				color: '#F3F4F6',
			}
		},
		yaxis: {
			labels: {
				style: {
					colors: ['#6B7280'],
					fontSize: '14px',
					fontWeight: 500,
				},
				formatter: function (value) {
					return '$' + value;
				}
			},
		},
		legend: {
			fontSize: '14px',
			fontWeight: 500,
			fontFamily: 'Inter, sans-serif',
			labels: {
				colors: ['#6B7280']
			},
			itemMargin: {
				horizontal: 10
			}
		},
		responsive: [
			{
				breakpoint: 1024,
				options: {
					xaxis: {
						labels: {
							show: false
						}
					}
				}
			}
		]
	};

	const chart = new ApexCharts(document.getElementById('main-chart'), options);
	chart.render();
}
