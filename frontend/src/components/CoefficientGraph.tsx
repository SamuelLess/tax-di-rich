import { LineChart } from '@mantine/charts';
// import { data } from './data';

function CoefficientGraph() {
  return (
    <LineChart
      h={300}
      data={[
        { name: '1', sum: 4000, max: 2400 },
        { name: '2', sum: 3000, max: 1398 },
        { name: '3', sum: 2000, max: 9800 },
        { name: '4', sum: 2780, max: 3908 },
        { name: '5', sum: 1890, max: 4800 },
        { name: '6', sum: 2390, max: 3800 },
        { name: '7', sum: 3490, max: 4300 }
      ]}
      dataKey="name"
      withLegend
      withRightYAxis
      yAxisLabel="sum"
      rightYAxisLabel="max"
      series={[
        { name: 'sum', color: 'pink.6' },
        { name: 'max', color: 'cyan.6', yAxisId: 'right' },
      ]}
    />
  );
}

export default CoefficientGraph;
