import Map from '../Map/Map'
import { socket } from '../socket';
import { useState, useEffect } from 'react';
import { type Scenario } from 'Map/scenario';
import { Button, Center, Fieldset, Text, Slider, Group, LoadingOverlay, Box, Stack, Badge, Collapse, Container } from '@mantine/core';
import styles from "./Home.module.css";
import CoefficientGraph from '@components/CoefficientGraph';
import ForecastGraph from '@components/ForecastGraph';
import classNames from "classnames";
import { CaretDown, CaretLeft, CaretRight, CaretUp, ChartBarHorizontal, Sliders } from "@phosphor-icons/react";
import { useDisclosure } from '@mantine/hooks';
import { BarChart } from '@mantine/charts';
import {StatsGroup} from "@components/TechnicalDataDisplay";
import { DonutChart } from '@mantine/charts';


const ScenarioDialogue = (props: { 
  run: (vhs: number, cms: number, speed: number) => void,
  loading: boolean,
}) => {
  const [vhs, setVhs] = useState(5);
  const [cms, setCms] = useState(10);
  const [speed, setSpeed] = useState(30);

  return (
    <Center mt="lg">
      <div className={styles.bg}></div>
      <Stack align='center' gap={5}>
        <Text mt="xl" c="white" size="30px">Welcome to <u>UNDER</u>.</Text>
        <Text mt="md" mb="xl" c="white">How big is your fleet?</Text>
        <Box pos="relative">
          <LoadingOverlay visible={props.loading} />
          <Fieldset style={{ width: 500 }} variant='filled'>
            <Group mt={15} mb="xs" gap={10}>
              <Text>Number of vehicles</Text>
              <Text p="5px" lh="1" size='xl' className={styles.numberIndicator}>{vhs}</Text>
            </Group>
            <Slider size="lg" min={1} max={20} step={1} value={vhs} onChange={setVhs} label={null} marks={[
              { value: 1, label: '1' },
              { value: 10, label: '10' },
              { value: 20, label: '20' },
            ]}/>
            <Group mt={40} mb="xs" gap={10}>
              <Text>Number of customers</Text>
              <Text p="5px" lh="1" size='xl' className={styles.numberIndicator}>{cms}</Text>
            </Group>
            <Slider size="lg" min={1} max={100} step={1} value={cms} onChange={setCms} label={null} marks={[
              { value: 1, label: '1' },
              { value: 50, label: '50' },
              { value: 100, label: '100' },
            ]}/>
            <Center mt={60}>
              <Button size='md' onClick={() => props.run(vhs, cms, speed)}>Start Scenario</Button>
            </Center>
          </Fieldset>
        </Box>
      </Stack>
    </Center>
  );
}

const Parameters = (props: {optimzationGoals?: OptimizationGoals, sendCoefficient: Function}) => {
  const [coefficient, setCoefficient] = useState(props.optimzationGoals?.coefficient ?? 50);
  const oldCoefficient = props.optimzationGoals?.coefficient;

  const onSubmission = () => {
    props.sendCoefficient(coefficient);
  }

  if (props.optimzationGoals?.algorithm !== "optimal") {
    return <Stack p={15}>
      <Text size='20px' mt={10}>Optimization goal</Text>
      <Text size='16px'style={{maxWidth: "20rem", lineHeight: "1.5rem"}}>The greedy optimization algorithm does not allow changing the goals.</Text>
    </Stack>
  }

  const distanceInKm = props.optimzationGoals.emission / 1000;
  const EMMISSIONS_GRAM_PER_KM = 70;
  const emmissions_kg = Math.round(distanceInKm * EMMISSIONS_GRAM_PER_KM / 10) / 100;
  return (
    <Stack p={15}>
      <Text size='20px' my={10}>Optimization goal</Text>
       <Slider mx={30} size="lg" min={1} max={100} step={1} value={coefficient} onChange={setCoefficient} label={null} marks={[
        { value: 1, label: 'Emissions' },
        { value: 50, label: 'Balanced' },
        { value: 100, label: 'Speed' },
      ]}/>
      <Button mt={30} size='md' onClick={onSubmission} disabled={oldCoefficient == coefficient}>Change routing</Button>
        <Stack>

    <Group>
    
      <Text style={{width: "5rem"}}>Wait time:</Text><Text p="5px" lh="1" size='xl' className={styles.numberIndicator}>{Math.round(props.optimzationGoals.speed / 60)} min</Text>

    </Group>
    <Group>
  
      <Text style={{width: "5rem"}}>Emissions:</Text><Text p="5px" lh="1" size='xl' className={styles.numberIndicator}>{emmissions_kg} kg  CO<sub>2</sub></Text>
      </Group>
    </Stack>
    </Stack>
  );
}

interface ForeCast{
  avg_wait_time: number,
  compute_time: number,
  max_wait_time: number,
  x_axis: any,
  y_axis: any
}

interface Status{
  averageDistance: number,
  customerWaiting: number,
  distances: any,
  status: any,
  totalCustomers: number,
  totalDistance: number,
  totalTime: 6488,
  totalTrip: number,
  totalVehicles: number,
  vehiclesAvailable: number,
  vehiclesMoving: number
}
const ScenarioDisplay = (props: { 
  state: Scenario, 
  times: { [key: string]: number }
  status: Object,
  forecast: ForeCast,
  parametersPanel: JSX.Element
}) => {
  
  const [statOpened, { toggle: toggleStat }] = useDisclosure(false);
  const [paramOpened, { toggle: toggleParam }] = useDisclosure(false);
  //const [fore]

  const statusCol = (() => {
    switch (props.state.status) {
      case "RUNNING": return "#378a00"; // Green
      case "COMPLETED": return "#1563b0"; // Blue
      // case "CREATED"
      default: return "#d18315"; // Orange
    }
  })()

  console.log(props.status);
  return (
    <Group style={{ height: "100%" }} gap={0}>
      <Box flex={3} h={"100%"} className={classNames(styles.mapbox, { [`${styles.mapbr}`]: statOpened })}>
        <Map scenarioState={props.state} startRemainingTimes={props.times} radius={0}/>
        <Stack className={styles.floatTRbox}>
          <Group className={classNames(styles.shadowbox, styles.floatboxinner)}>
            <Badge size='lg' color={statusCol}>{props.state.status}</Badge>
            <Button
              size='compact-md'
              variant="filled" 
              leftSection={<Sliders weight='fill' />} 
              rightSection={paramOpened ? <CaretUp /> : <CaretDown />}
              onClick={toggleParam}
            >Parameters</Button>
            <Button
              size='compact-md'
              variant="filled" 
              leftSection={<ChartBarHorizontal weight='fill' />} 
              rightSection={statOpened ? <CaretLeft /> : <CaretRight />}
              onClick={toggleStat}
            >Statistics</Button>
          </Group>
          <Collapse in={paramOpened} className={classNames(styles.shadowbox, styles.floatboxinner)}>
            {props.parametersPanel}
          </Collapse>
        </Stack>
      </Box>
      {statOpened ? <Box flex={2} h={"100%"} style={{ overflowX: "hidden", overflowY: "scroll" }}>
        <Stack p={20}>
          <Stack className={styles.shadowbox} p={15} flex={1}>
            <Text size='20px' my={10}>Graph</Text>
            <Box flex={1}>
              <CoefficientGraph />
            </Box>
          </Stack>
          <Group>
            <Stack className={styles.shadowbox} p={15} flex={1}>
              <Text size='20px' my={10}>Graph</Text>
              <ForecastGraph forecast = {props.forecast} />
            </Stack>
            <Stack className={styles.shadowbox} p={15} flex={1}>
              <Text size='20px' my={10}>Graph</Text>
              <ForecastGraph forecast = {props.forecast}></ForecastGraph>
            </Stack>
          </Group>
          <Group>
            <Stack className={styles.shadowbox} p={15} flex={1}>
              <Text size='20px' my={10}>Taxi</Text>
              <DonutChart
              data={[
                { name: 'USA', value: 400, color: 'blue' },
                { name: 'Other', value: 200, color: 'green' },
              ]}
            />
            </Stack>
            <Stack className={styles.shadowbox} p={15} flex={1}>
              <Text size='20px' my={10}>Graph</Text>
              <ForecastGraph forecast = {props.forecast}></ForecastGraph>
            </Stack>
          </Group>
          <Group>
          <Box flex={1}>
            <StatsGroup data = {
              [
                {
                  title: 'Compute Time per call',
                  stats: `${props.forecast["compute_time"].toFixed(3)}s`,
                },
                {
                  title: 'CPU usage',
                  stats: `${1} %`,
                },
                {
                  title: 'RAM usage',
                  stats: `${1} &`,
                },
              ]
            }></StatsGroup>
            </Box>
          </Group>
        </Stack>
      </Box> : null}
    </Group>
  );
} 

interface OptimizationGoals {
  algorithm: "greedy" | "optimal",
  coefficient: number,
  speed: number,
  emission: number
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scenarioState, setScenarioState] = useState<Scenario>();
  const [startRemainingTimes, setStartRemainingTimes] = useState<{[key: string]: number}>({});
  const [status, setStatus] = useState<Object>({});
  const [forecast, setForecast] = useState<ForeCast>();
  const [optimizationGoals, setOptimizationGoals] = useState<OptimizationGoals>();

	function startScenarios(vhs_num: number, cms_num: number, speed: number, use_efficient: boolean) {
    socket.emit('start_scenario', vhs_num, cms_num, speed, use_efficient);
  }

  function sendCoefficient(coefficient: number) {
    socket.emit('update_optimization_goals', coefficient);
  }

  useEffect(() => {
    function onConnect() {
      setIsLoading(false);
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function updateScenario(updatedScenario: any) {
      setScenarioState(updatedScenario["data"]);
      setStartRemainingTimes(updatedScenario["start_remaining_time"]);
      setStatus(updatedScenario["status"]);
      setOptimizationGoals(updatedScenario["optimization_goals"]);
      setIsLoading(false);
    }

    function updateForecast(updatedForecast: ForeCast) {
      setForecast(updatedForecast);
      console.log("test", updatedForecast);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('update_scenario', updateScenario);
    socket.on('update_forecast', updateForecast);

    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('update_scenario', updateScenario);
      socket.off('update_forecast', updateForecast);
      socket.disconnect();
    };
  }, []);

  const startScenario = (vhs: number, cms: number, speed_x: number) => {
    setIsLoading(true);
    const EFFICIENT_THRESHOLD = 70;
    const USE_EFFICIENT = cms > EFFICIENT_THRESHOLD;
    startScenarios(vhs, cms, 1/speed_x, USE_EFFICIENT);
  };

  return (
    <div style={{width: "100%", height: "100%"}}>
      {scenarioState ? <ScenarioDisplay 
        state={scenarioState}
        times={startRemainingTimes}
        status={status}
        forecast={forecast!}
        parametersPanel={ <Parameters 
          optimzationGoals={optimizationGoals}
          sendCoefficient = {sendCoefficient}
          /> }
      /> : <ScenarioDialogue 
        run={startScenario}
        loading={isLoading && isConnected}
      />}
    </div>
  );
}

export default Home;