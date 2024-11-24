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

  if(data.length < 2) {
    return <>All customers have reached their destination</>
  }
  return (
    <AreaChart
      h={150}
      data={data}
      dataKey="minutes"
      withLegend
      type="percent"
      withXAxis={false}
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
