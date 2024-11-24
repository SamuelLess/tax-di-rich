import {BarChart, LineChart} from '@mantine/charts';
// import { data } from './data';

function CoefficientGraph({data}: any) {
  if(data.length < 2) {
    return <i>Not enough data!</i>
  }
  let points = [];
  for(let i = 0; i < data.length; i++) {
    points.push({name: i+1, C02: data[i]});
  }
  return (
    <BarChart
      h={200}
      data={points}
      dataKey="name"
      withLegend
      withRightYAxis
      yAxisLabel="CO2"
      rightYAxisLabel=""
      series={[
        { name: 'C02', color: 'pink.6' },
      ]}
    />
  );
}

export default CoefficientGraph;