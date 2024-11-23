import Map from '../Map/Map'

import {socket} from '.././socket';

import React, {useState, useEffect} from 'react';
import { Scenario } from 'Map/scenario';

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scenarioState, setScenarioState] = useState<Scenario>();
  const [startRemainingTimes, setStartRemainingTimes] = useState<{[key: string]: number}>();

	function startScenarios(vhs_num: number, cms_num: number, speed: number) {
    socket.emit('start_scenario', vhs_num, cms_num, speed);
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function updateScenario(updatedScenario) {
      // @ts-ignore
      setScenarioState(updatedScenario["data"]);
      setStartRemainingTimes(updatedScenario["start_remaining_time"]);
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
    };


  }, []);
  // @ts-ignore
  return (
    <div style={{width: "100%", height: "500px"}}>

{ scenarioState && <Map scenarioState={scenarioState} startRemainingTimes={startRemainingTimes} /> }
    
      <div>Hallo Welt :)</div>
      {isConnected ? <p>test</p> : <p>not connencted</p>}
      <button onClick={() => startScenarios(5, 10, 0.02)}>Start Scenario</button>

    </div>
  );
}

export default Home;