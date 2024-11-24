import { AreaChart } from '@mantine/charts';
// import { data } from './data';

interface ForeCastData {
  forecast: any
}

function ForecastGraph({forecast}: ForeCastData) {
  let data = [];
  for(let i = 0; i < forecast["x_axis"].length; i++){
    data.push(
      {
        "minutes": parseInt(forecast["x_axis"][i] / 60),
        "done": forecast["y_axis"]["done"][i],
        "driving": forecast["y_axis"]["driving"][i],
        "waiting": forecast["y_axis"]["waiting"][i],
      }
    );
  }
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="minutes"
      withLegend
      type="percent"
      series={[
        { name: 'done', color: 'teal.6' },
        { name: 'driving', color: 'blue.6' },
        { name: 'waiting', color: 'indigo.6' },
      ]}
      curveType = "monotone"
    />
  );
}

export default ForecastGraph;
