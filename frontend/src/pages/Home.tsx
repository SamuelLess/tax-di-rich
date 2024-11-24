import Map from '../Map/Map'
import { socket } from '../socket';
import { useState, useEffect } from 'react';
import { type Scenario } from 'Map/scenario';
import { Button, Center, Fieldset, Text, Slider, Group, LoadingOverlay, Box, Stack, Badge, Collapse } from '@mantine/core';
import styles from "./Home.module.css";
import CoefficientGraph from '@components/CoefficientGraph';
import ForecastGraph from '@components/ForecastGraph';
import classNames from "classnames";
import { CaretDown, CaretLeft, CaretRight, CaretUp, ChartBarHorizontal, Sliders } from "@phosphor-icons/react";
import { useDisclosure } from '@mantine/hooks';



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

const ScenarioDisplay = (props: { 
  state: Scenario, 
  times: { [key: string]: number }
  status: Object,
  forecast: Object
}) => {
  
  const [statOpened, { toggle: toggleStat }] = useDisclosure(false);
  const [paramOpened, { toggle: toggleParam }] = useDisclosure(false);

  const statusCol = (() => {
    switch (props.state.status) {
      case "RUNNING": return "#378a00"; // Green
      case "COMPLETED": return "#1563b0"; // Blue
      // case "CREATED"
      default: return "#d18315"; // Orange
    }
  })()

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
            Test
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
              <ForecastGraph />
            </Stack>
            <Stack className={styles.shadowbox} p={15} flex={1}>
              <Text size='20px' my={10}>Graph</Text>
              <ForecastGraph />
            </Stack>
          </Group>

          <Group>
            <Stack className={styles.shadowbox} p={15} flex={1}>
              <Text size='20px' my={10}>Graph</Text>
              <ForecastGraph />
            </Stack>
            <Stack className={styles.shadowbox} p={15} flex={1}>
              <Text size='20px' my={10}>Graph</Text>
              <ForecastGraph />
            </Stack>
          </Group>
        </Stack>
      </Box> : null}
    </Group>
  );
} 


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scenarioState, setScenarioState] = useState<Scenario>();
  const [startRemainingTimes, setStartRemainingTimes] = useState<{[key: string]: number}>({});
  const [status, setStatus] = useState<Object>({});
  const [forecast, setForecast] = useState<Object>({});

	function startScenarios(vhs_num: number, cms_num: number, speed: number, use_efficient: boolean) {
    socket.emit('start_scenario', vhs_num, cms_num, speed, use_efficient);
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
      setIsLoading(false);
    }

    function updateForecast(updatedForecast: Object) {
      setForecast(updatedForecast);
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
        forecast={forecast}
      /> : <ScenarioDialogue 
        run={startScenario}
        loading={isLoading && isConnected}
      />}
    </div>
  );
}

export default Home;
