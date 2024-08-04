import { FC, Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import Header from './layoutcomponent/header';
import Sidebar from './layoutcomponent/sidebar';
import { Outlet } from 'react-router-dom';
import Footer from './layoutcomponent/footer';
import TabToTop from './layoutcomponent/tabtotop';
import store from '../common/redux/store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import esMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";
// import 'devextreme/dist/css/dx.material.purple.light.css';
import 'devextreme/dist/css/dx.fluent.saas.light.css';
// import 'devextreme/dist/css/dx.fluent.purple-themes.css';

interface ComponentProps { }

const App: FC<ComponentProps> = () => {
  useEffect(() => {
    loadMessages(esMessages);
    locale(navigator.language);
  });
  return (
    <Fragment>
      <Provider store={store}>
        <HelmetProvider>
          <Helmet
            htmlAttributes={{
              lang: "en",
              dir: "ltr",
              "data-nav-layout": "vertical",
              "data-theme-mode": "light",
              "data-header-styles": "light",
              "data-menu-styles": "light",
              "data-vertical-style": "overlay",
            }}
          >
            <body className=''></body>
          </Helmet>
        </HelmetProvider>
        <div className="page">
          <Header />
          <Sidebar />
          <div className="main-content app-content">
            <div className="main-container container-fluid">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
        <TabToTop />
      </Provider>
    </Fragment>
  );
};

export default App;