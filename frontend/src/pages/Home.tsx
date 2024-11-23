import Map from '../Map/Map'

import {socket} from '.././socket';

import React, {useState, useEffect} from 'react';

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scenarioState, setScenarioState] = useState([]);

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
      //setScenarioState(previous => [...previous, value]);
      console.log(updatedScenario);
      setScenarioState(updatedScenario);
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

      <Map/>
      <div>Hallo Welt :)</div>
      {isConnected ? <p>test</p> : <p>not connencted</p>}
      <button onClick={() => startScenarios(5, 10, 0.02)}>Start Scenario</button>


      {JSON.stringify(scenarioState)}
    </div>
  );
}

export default Home;