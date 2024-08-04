import { Fragment } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./index.scss";
import { Routingdata } from './common/routingdata';
import App from './layout/App';
import Authenticationlayout from './layout/Authenticationlayout';
import Error500 from './components/authentication/500error';
import Login from './components/authentication/login';
import Tickets from './components/tickets/tickets';
import Scrolltotop from './Scrolltotop';

//Form
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Scrolltotop />
        <Routes>
          {/* authentication layout */}
          <Route path={"/"} element={<Authenticationlayout />}>
            <Route path="*" element={<Error500 />} />
            <Route index path={""} element={<Login />} />
            <Route path="tickets/:id" element={<Tickets />} />
            {/* other authentication */}
            <Route path={"pages/authentication/500error"} element={<Error500 />} />
          </Route>
          {/* main layout */}
          <Route path={"/"} element={<App />} >
            {Routingdata.map((idx) => (
              <Route path={idx.path} element={idx.element} key={Math.random()} />
            ))}
          </Route>

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </Fragment>
);

