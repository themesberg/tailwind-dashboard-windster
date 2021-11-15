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

if (document.getElementById('new-products-chart')) {
	const options = {
		colors: ['#0694a2', '#4E4187'],
		series: [
			{
				name: 'Digital',
				color: '#0694a2',
				data: [
					{ x: '01 Feb', y: 170 },
					{ x: '02 Feb', y: 180 },
					{ x: '03 Feb', y: 164 },
					{ x: '04 Feb', y: 145 },
					{ x: '05 Feb', y: 174 },
					{ x: '06 Feb', y: 170 },
					{ x: '07 Feb', y: 155 },
				]
			},
			{
				name: 'Goods',
				color: '#4E4187',
				data: [
					{ x: '01 Feb', y: 120 },
					{ x: '02 Feb', y: 134 },
					{ x: '03 Feb', y: 167 },
					{ x: '04 Feb', y: 179 },
					{ x: '05 Feb', y: 145 },
					{ x: '06 Feb', y: 182 },
					{ x: '07 Feb', y: 143 }
				]
			}
		],
		chart: {
			type: 'bar',
			height: '305px',
			fontFamily: 'Inter, sans-serif',
			foreColor: '#4B5563',
			toolbar: {
				show: false
			}
		},
		plotOptions: {
			bar: {
				columnWidth: '50%',
				borderRadius: 2
			}
		},
		tooltip: {
			shared: true,
			intersect: false,
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			},
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 1
				}
			}
		},
		stroke: {
			show: true,
			width: 5,
			colors: ['transparent']
		},
		grid: {
			show: false
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		xaxis: {
			floating: true,
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
		},
		yaxis: {
			show: false
		},
		fill: {
			opacity: 1
		}
	};

	const chart = new ApexCharts(document.getElementById('new-products-chart'), options);
	chart.render();
}

if (document.getElementById('visitors-chart')) {
	const options = {
		series: [{
			name: 'Visitors',
			data: [500, 590, 600, 520, 610, 550, 600]
		}],
		labels: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
		chart: {
			type: 'area',
			height: '305px',
			fontFamily: 'Inter, sans-serif',
			sparkline: {
				enabled: true
			},
			toolbar: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				shadeIntensity: 1
			},
		},
		plotOptions: {
			area: {
				fillTo: 'end'
			}
		},
		theme: {
			monochrome: {
				enabled: true,
				color: '#0694a2',
			}
		},
		tooltip: {
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			},
		},
	};

	const chart = new ApexCharts(document.getElementById('visitors-chart'), options);
	chart.render();
}

if (document.getElementById('week-signups-chart')) {
	const options = {
		series: [{
			name: 'Users',
			data: [34, 45, 53, 38, 55, 32, 36]
		}],
		labels: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
		chart: {
			type: 'bar',
			height: '305px',
			foreColor: '#4B5563',
			fontFamily: 'Inter, sans-serif',
			toolbar: {
				show: false
			}
		},
		theme: {
			monochrome: {
				enabled: true,
				color: '#0694a2'
			}
		},
		plotOptions: {
			bar: {
				columnWidth: '25%',
				borderRadius: 2,
				colors: {
					backgroundBarColors: ['#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB'],
					backgroundBarRadius: 2
				},
			},
			dataLabels: {
				hideOverflowingLabels: false
			}
		},
		xaxis: {
			floating: true,
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
		},
		tooltip: {
			shared: true,
			intersect: false,
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			}
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 0.8
				}
			}
		},
		fill: {
			opacity: 1
		},
		yaxis: {
			show: false
		},
		grid: {
			show: false
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
	};

	const chart = new ApexCharts(document.getElementById('week-signups-chart'), options);
	chart.render();
}

if (document.getElementById('traffic-channels-chart')) {
	const options = {
		series: [30, 24, 18, 12, 9, 7],
		labels: ['Organic', 'Referral', 'Direct', 'Social', 'Other', 'Email' ],
		colors: ['#16BDCA', '#4E4187', '#0694a2', '#D61F69', '#9061F9', '#6875F5'],
		chart: {
			type: 'donut',
			height: 305,
			fontFamily: 'Inter, sans-serif',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			pie: {
				donut: {
					size: '5%'
				}
			}
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 0.9
				}
			}
		},
		tooltip: {
			shared: true,
			followCursor: false,
			fillSeriesColor: false,
			inverseOrder: true,
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			},
			x: {
				show: true,
				formatter: function (_, { seriesIndex, w }) {
					const label = w.config.labels[seriesIndex];
					return label
				}
			},
			y: {
				formatter: function (value) {
					return value + '%';
				}
			}
		},
		grid: {
			show: false
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
	};

	const chart = new ApexCharts(document.getElementById('traffic-channels-chart'), options);
	chart.render();
}
