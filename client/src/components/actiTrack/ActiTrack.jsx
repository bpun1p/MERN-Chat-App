import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const { user } = useSelector((state) => state.auth);
  const [isVisitorCount, setVisitorCount] = useState([]);
  const [islast7Dates, setLast7Dates] = useState([]);

  useEffect(() => {
    const visitorCount = user.visitorData.map(data => data.visitorCount);
    const last7Dates = user.visitorData.map(data => `${data.month}/${data.day}`);
    setVisitorCount(visitorCount);
    setLast7Dates(last7Dates);
  }, [])

  const data = {
    labels: islast7Dates,
    datasets: [{
      label: `Visitors of the week of ${currMonth}`,
      data: isVisitorCount,
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
  console.log(user.visitorData)
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