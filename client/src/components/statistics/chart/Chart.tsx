import './Chart.sass';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		borderColor: string;
		backgroundColor: string;
	}[];
}

const Chart = ({ labels, datasets }: ChartProps) => {
	const [chartData, setChartData] = useState<{
		labels: string[];
		datasets: {
		label: string;
		data: number[];
		borderColor: string;
		backgroundColor: string;
		}[];
	}>({
		labels: [],
		datasets: [],
	});

	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		setChartData({
			labels: labels,
			datasets: datasets,
		});
		setChartOptions({
			responsive: true,
			plugins: {
				legend: {
					position: "top",
				},
				title: {
					display: true,
					text: "Бюджет",
				},
			},
		});
	}, [labels, datasets]);

	return (
		<div className="chart">
			<Bar options={chartOptions} data={chartData} />
		</div>
	);
};

export default Chart;
