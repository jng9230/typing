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
import { Line } from 'react-chartjs-2';
import { TypingHistory } from '../utils/extraTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: 'top' as const,
      display: false
    },
    title: {
      display: true,
      text: 'WPM History',
    },
  },
  scales: {
    x: {
      offset: true //horizontally centers the chart
    }
  }
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     }
//   ]
// };

const LineChart = ({
  history
}: {
  history: TypingHistory[]
}) => {
  const labels = Array.from('.'.repeat(history.length));
  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: history.map(d => d.WPM),
        borderColor: 'rgb(0, 0, 0)', //line color
        backgroundColor: 'rgba(0, 0, 0, 1)', //dot color
      },
      // {
      //   label: "ACC",
      //   data: history.map(d => d.ACC),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)'
      // }
    ]
  };

  return (
    <div className="flex items-center justify-center max-h-96">
      <Line options={options} data={data} />
    </div>
  )
}

export default LineChart