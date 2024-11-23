import { Outlet, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import ForecastGraph from '@components/ForecastGraph';

const Layout = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed" }}>
      <Navbar />
      <Outlet />
    </div>
  )
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path={"/"} element={<Home />} />
      <Route path={"/other"} element={<ForecastGraph />} />
    </Route>,
  ),
);

export default router;
