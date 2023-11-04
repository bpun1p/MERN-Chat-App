import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
)

export default function ActiTrack() {
  const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const today = new Date();
  const currMonth = month[today.getMonth()];

  const data = {
    labels: getLast7Days(),
    datasets: [{
      label: `# Visitors in the week of ${currMonth}`,
      data: [3, 6, 9, 20, 10, 2, 6],
      borderColor: 'blue',
      pointBorderColor: 'blue',
      tension: 0.4
    }]
  };

  const options = {
    plugs: {
      legend: true
    },
    scales: {
      y: {
        max: 30
      }
    }
  }

  function getLast7Days() {
    const dates = [];
  
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toString().substring(4, 10));
    }
    return dates;
  }

  return (
    <>
      <div style={
        {
          width: '600px', 
          height: '300px', 
          padding: '20px', 
          position: 'absolute',
          bottom: '25px',
          left: '25px', 
          backgroundColor: 'white', 
          borderRadius: '10px'
        }}>
        <Line
          data={data}
          options={options}
        ></Line>
      </div>
    </>
  );
}