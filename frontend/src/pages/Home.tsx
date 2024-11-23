import Map from '../Map/Map'
import { socket } from '../socket';
import { useState, useEffect } from 'react';
import { type Scenario } from 'Map/scenario';
import { Button, Center, Fieldset, Text, Slider, Group, LoadingOverlay, Box, Stack } from '@mantine/core';
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
        <Text mt="md" mb="xl" c="white">Create a scenario to continue.</Text>
        <Box pos="relative">
          <LoadingOverlay visible={props.loading} />
          <Fieldset style={{ width: 500 }} variant='filled'>
            <Group mt={15} mb="xs" gap={10}>
              <Text>Number of vehicels</Text>
              <Text p="5px" lh="1" size='xl' className={styles.numberIndicator}>{vhs}</Text>
            </Group>
            <Slider size="lg" min={0} max={50} step={1} value={vhs} onChange={setVhs} label={null} marks={[
              { value: 0, label: '0' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
            ]}/>
            <Group mt={40} mb="xs" gap={10}>
              <Text>Number of customers</Text>
              <Text p="5px" lh="1" size='xl' className={styles.numberIndicator}>{cms}</Text>
            </Group>
            <Slider size="lg" min={0} max={200} step={1} value={cms} onChange={setCms} label={null} marks={[
              { value: 0, label: '0' },
              { value: 100, label: '100' },
              { value: 200, label: '200' },
            ]}/>
            <Button mt={50} onClick={() => props.run(vhs, cms)}>Start Scenario</Button>
          </Fieldset>
        </Box>
      </Stack>
    </Center>
  );
}

const ScenarioDisplay = (props: { state: Scenario, times: { [key: string]: number } }) => {
  return (
    <div style={{height: "100%"}}>
      <Map scenarioState={props.state} startRemainingTimes={props.times} />
    </div>
  );
} 


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scenarioState, setScenarioState] = useState<Scenario>();
  const [startRemainingTimes, setStartRemainingTimes] = useState<{[key: string]: number}>({});

	function startScenarios(vhs_num: number, cms_num: number, speed: number) {
    socket.emit('start_scenario', vhs_num, cms_num, speed);
  }

  useEffect(() => {
    function onConnect() {
      setIsLoading(false);
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function updateScenario(updatedScenario) {
      setScenarioState(updatedScenario["data"]);
      setStartRemainingTimes(updatedScenario["start_remaining_time"]);
      setIsLoading(false);
      console.log(updatedScenario);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('update_scenario', updateScenario);

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
    startScenarios(vhs, cms, 0.1)
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
