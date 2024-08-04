
import Movies from '../components/movies/containers/movies';
import Products from '../components/products/containers/products';
import Rooms from '../components/rooms/containers/rooms';
import Schedules from '../components/schedules/containers/schedules';
import Prices from '../components/prices/containers/prices';

export const Routingdata = [
  //Pages
  { path: `${import.meta.env.BASE_URL}movies`, element: <Movies /> },
  { path: `${import.meta.env.BASE_URL}products`, element: <Products /> },
  { path: `${import.meta.env.BASE_URL}rooms`, element: <Rooms /> },
  { path: `${import.meta.env.BASE_URL}schedules`, element: <Schedules /> },
  { path: `${import.meta.env.BASE_URL}prices`, element: <Prices /> },
];

export const Sidebarcomponents = [

];
