import Map from '../Map/Map'
import { socket } from '../socket';
import { useState, useEffect, useRef } from 'react';
import { type Scenario } from 'Map/scenario';
import { Button, Center, Fieldset, Text, Slider, Group, LoadingOverlay, Box, Stack } from '@mantine/core';
import classNames from "classnames";
import styles from "./Home.module.css";

const ScenarioDialogue = (props: { 
  run: (vhs: number, cms: number) => void,
  loading: boolean,
}) => {

  const [vhs, setVhs] = useState(5);
  const [cms, setCms] = useState(10);

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
              <Text>Number of vehicels</Text>
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
            <Button mt={50} onClick={() => props.run(vhs, cms)}>Start Scenario</Button>
          </Fieldset>
        </Box>
      </Stack>
    </Center>
  );
}

const ScenarioDisplay = (props: { 
  state: Scenario, 
  times: { [key: string]: number } 
}) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (sectionRef.current === null) return;
      const sectionOffset = sectionRef.current.offsetHeight;
      setContainerHeight(sectionOffset);
    };

    // Calculate on mount and resize
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [sectionRef]);


  return (
    <div style={{ height: "100%", overflow: "scroll" }} ref={sectionRef}>
      {containerHeight > 0 ? <Group h={containerHeight - 60} w={"100%"} p={30}>
        <Box flex={3} h={"100%"} className={classNames(styles.shadow, styles.mapbox)}>
          <Map scenarioState={props.state} startRemainingTimes={props.times} radius={10}/>
        </Box>
        <Stack flex={2} h={"100%"}>
          <Text size='30px'>Graph</Text>
        </Stack>
      </Group> : null }
      <Box h={300} w={20} bg="red"></Box>
    </div>
  );
} 


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scenarioState, setScenarioState] = useState<Scenario>();
  const [startRemainingTimes, setStartRemainingTimes] = useState<{[key: string]: number}>({});

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
      setIsLoading(false);
      console.log(updatedScenario);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('update_scenario', updateScenario);

    socket.onAny((e, a) => console.log("got ev:", e, a))

    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('update_scenario', updateScenario);
      socket.disconnect();
    };


  }, []);

  const startScenario = (vhs: number, cms: number) => {
    setIsLoading(true);
    const SIMULATION_SPEED = 0.05;
    const EFFICIENT_THRESHOLD = 70;
    const USE_EFFICIENT = cms > EFFICIENT_THRESHOLD;
    startScenarios(vhs, cms, SIMULATION_SPEED, USE_EFFICIENT);
  };

  return (
    <div style={{width: "100%", height: "100%"}}>
      {scenarioState ? <ScenarioDisplay 
        state={scenarioState}
        times={startRemainingTimes}
      /> : <ScenarioDialogue 
        run={startScenario}
        loading={isLoading && isConnected}
      />}
    </div>
  );
}

export default Home;