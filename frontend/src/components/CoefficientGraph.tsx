import {BarChart} from '@mantine/charts';

function meterToKwh(meter: number) {
  const km = meter / 1000;
  return Math.round(km * 0.1 * 100) / 100;
}
function CoefficientGraph({data}: any) {
  if(data.length < 2) {
    return <i>Not enough data!</i>
  }

  let points = [];
  for(let i = 0; i < data.length; i++) {
    points.push({name: i+1, kWh: meterToKwh(data[i])}); 
  }
  return (
    <BarChart
      h={200}
      data={points}
      dataKey="name"
      withRightYAxis
      yAxisLabel="kWh"
      rightYAxisLabel=""
      series={[
        { name: 'kWh', color: 'pink.6' },
      ]}
    />
  );
}

export default CoefficientGraph;