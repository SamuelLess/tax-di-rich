import { AreaChart } from '@mantine/charts';
import { data } from './data';

function ForecastGraph() {
  return (
    <AreaChart
      h={300}
      data={
        [
          {
            seconds: 0,
            Graph1: 10,
            Graph2: 0,
            Graph3: 0,
          },
          {
            seconds: 0.0,
            Graph1: 9,
            Graph2: 1,
            Graph3: 0,
          },
          {
            seconds: 0.0,
            Graph1: 8,
            Graph2: 2,
            Graph3: 0,
          },
          {
            seconds: 0.0,
            Graph1: 7,
            Graph2: 3,
            Graph3: 0,
          },
          {
            seconds: 0.0,
            Graph1: 6,
            Graph2: 4,
            Graph3: 0,
          },
          {
            seconds: 403.00307014478653,
            Graph1: 6,
            Graph2: 3,
            Graph3: 1,
          },
          {
            seconds: 408.38369701702294,
            Graph1: 6,
            Graph2: 2,
            Graph3: 2,
          },
          {
            seconds: 472.81320897715807,
            Graph1: 5,
            Graph2: 3,
            Graph3: 2,
          },
          {
            seconds: 562.3066185734754,
            Graph1: 5,
            Graph2: 2,
            Graph3: 3,
          },
          {
            seconds: 588.8338601088357,
            Graph1: 4,
            Graph2: 3,
            Graph3: 3,
          },
          {
            seconds: 609.4697708404669,
            Graph1: 4,
            Graph2: 2,
            Graph3: 4,
          },
          {
            seconds: 802.8385152344069,
            Graph1: 3,
            Graph2: 3,
            Graph3: 4,
          },
          {
            seconds: 855.7614797000042,
            Graph1: 3,
            Graph2: 2,
            Graph3: 5,
          },
          {
            seconds: 892.1671799198497,
            Graph1: 3,
            Graph2: 1,
            Graph3: 6,
          },
          {
            seconds: 941.3237611931127,
            Graph1: 2,
            Graph2: 2,
            Graph3: 6,
          },
          {
            seconds: 996.1331862883179,
            Graph1: 1,
            Graph2: 3,
            Graph3: 6,
          },
          {
            seconds: 1029.610829778254,
            Graph1: 1,
            Graph2: 2,
            Graph3: 7,
          },
          {
            seconds: 1318.8565817959288,
            Graph1: 0,
            Graph2: 3,
            Graph3: 7,
          },
          {
            seconds: 1703.764312729108,
            Graph1: 0,
            Graph2: 2,
            Graph3: 8,
          },
          {
            seconds: 1820.8219350828717,
            Graph1: 0,
            Graph2: 1,
            Graph3: 9,
          },
          {
            seconds: 1909.8230080717753,
            Graph1: 0,
            Graph2: 0,
            Graph3: 10,
          },
        ]        
      }
      dataKey="date"
      type="percent"
      series={[
        { name: 'waiting', color: 'indigo.6' },
        { name: 'driving', color: 'blue.6' },
        { name: 'arrived', color: 'teal.6' },
      ]}
      curveType = "monotone"
    />
  );
}