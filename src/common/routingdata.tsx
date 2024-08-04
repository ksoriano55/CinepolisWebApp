
import Movies from '../components/movies/containers/movies';
import Products from '../components/products/containers/products';
import Rooms from '../components/rooms/containers/rooms';
import Schedules from '../components/schedules/containers/schedules';
import Prices from '../components/prices/containers/prices';

export const Routingdata = [
  //Pages
  { path: `/movies`, element: <Movies /> },
  { path: `/products`, element: <Products /> },
  { path: `/rooms`, element: <Rooms /> },
  { path: `/schedules`, element: <Schedules /> },
  { path: `/prices`, element: <Prices /> },
];

export const Sidebarcomponents = [

];
