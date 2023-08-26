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
import { getCSSVar } from '../utils/useCSSVar';
import { hextoRGB } from '../utils/hexToRGB';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
  history,
}: {
  history: TypingHistory[],
}) => {
  const labels = Array.from('.'.repeat(history.length));
  const colorHex = getCSSVar("--color-ui")
  const colorArr = hextoRGB(colorHex.slice(1))
  const color = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
        display: false,
      },
      title: {
        display: false,
        text: 'WPM History',
        color: color,
      },
    },
    scales: {
      x: {
        offset: true, //horizontally centers the chart
        display: false
      },
      y: {
        ticks: {
          color: color
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: history.map(d => d.WPM),
        borderColor: color, //line color
        backgroundColor: color, //dot color
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