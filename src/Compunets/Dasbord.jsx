import React from 'react'

import Card from 'react-bootstrap/Card';
import {Line} from 'react-chartjs-2';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Dasbord() {

  const data ={
    labels:["jan","feb","march"],
   datasets:[
    {
        label: 'Votes',
        data: [50, 30, 20,45,10,100,12,34],
        // fill: true,
        backgroundColor: 'yellow',
        borderColor: 'pink',
    },
   ],
}


  // Sample data for the chart
  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [100, 200, 150, 300, 250, 400],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };



  return (
    <div style={{marginLeft:"27%"}}>

<Container >
  <Row>
    <Col style={{marginTop:"20px"}} className="col-lg-4 col-md-3 col-sm-12">
    <Card style={{ width: '18rem'}}>
  <Line data={data}/>
</Card>
     </Col>
     <Col style={{marginTop:"20px"}} className="col-lg-4 col-md-3 col-sm-12">
     <Card style={{ width: '18rem'}}>
  <Line data={data}/>
</Card>
     </Col>
     <Col style={{marginTop:"20px"}} className="col-lg-4 col-md-3 col-sm-12">
     
     <Card style={{ width: '18rem'}}>
  <Line data={data}/>
</Card>
     
     </Col>
  </Row>

  <Row>
    <Col>
    <Line data={data1} options={options} />
    
    </Col>
  </Row>
</Container>




      

    </div>
  )
}

export default Dasbord
