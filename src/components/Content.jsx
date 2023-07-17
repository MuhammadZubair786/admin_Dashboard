import React from "react";
import styles from "../styles/Home.module.css";
import { Doughnut } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	ArcElement,
	Tooltip,
	Legend,
  } from 'chart.js'
  ChartJS.register(
	CategoryScale,
	LinearScale,
	ArcElement,
	PointElement,
	BarElement,
	LineElement,
	Title,
	Tooltip,
	Legend
  )
//data for bar chart
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
	  {
		label: 'Earning Revenge',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: 'rgba(255, 99, 132, 0.5)',
	  },
	
	],
  };

//doughnut chart data set

const data1 = {
	labels: ["Organic", "Social Media", "Websites"],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
		},
	],
};

export const options = {
	responsive: true,
	plugins: {
	  legend: {
		position: 'top' ,
	  },
	  title: {
		display: false,
		text: 'Earning Revenge',
	  },
	},
  };
  
  
  
function Content() {
	return (
		<div >
			{/* chart started  */}
			<div className={styles.charts}>
				<div className={styles.bar}>
					<h2>Earning Revenge</h2>
					<Bar options={options} width={10} height={10} data={data} />
				</div>
				<div className={styles.circle}>
					<h2>Sale by Category</h2>
					<Doughnut data={data1} width={10} height={10}  />
				</div>
			</div>
		</div>
	);
}

export default Content;





 
