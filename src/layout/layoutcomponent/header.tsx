import { FC, Fragment, useEffect, useState } from 'react';
import Rightsidebar from './rightsidebar';
import Switcher from './switcher';
import { imagesData } from '../../common/commonimages';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../../common/redux/store';
import { ThemeChanger } from '../../common/redux/action';

interface ComponentProps { }

const Header: FC<ComponentProps> = ({ ThemeChanger }: any) => {

  function menuClose() {
    const theme = store.getState();
    ThemeChanger({ ...theme, "toggled": "close" });

  }

  //Toggle sidebar function

  const toggleSidebar = () => {
    const theme = store.getState();
    let sidemenuType = theme.datanavlayout;

    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, "toggled": "close" });
    }
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataverticalstyle;
        const navStyle = theme.datanavstyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, "datanavstyle": "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, "datanavstyle": "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, "toggled": "", "iconOverlay": '' });
            } else {
              if (window.innerWidth >= 992) {
                // ThemeChanger({ ...theme, "toggled": "icon-overlay-close", "iconOverlay": '' });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, "datanavstyle": "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, "datanavstyle": "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, "toggled": "double-menu-close" });
            }
            else {
              const sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active");
                  ThemeChanger({ ...theme, "toggled": "double-menu-close" });
                } else {
                  ThemeChanger({ ...theme, "toggled": "double-menu-open" });
                }
              }
            }

            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, "toggled": "", "iconOverlay": '' });
            } else {
              ThemeChanger({ ...theme, "toggled": "detached-close", "iconOverlay": '' });
            }

            break;

          // default
          case "default":
            ThemeChanger({ ...theme, "toggled": "icon-overlay-close", "dataverticalstyle": "overlay" });
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.toggled === "menu-click-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            }
            else {
              ThemeChanger({ ...theme, "toggled": "menu-click-closed" });
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (theme.toggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "menu-hover-closed" });

            }
            break;
          case "icon-click":
            if (theme.toggled === "icon-click-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-click-closed" });

            }
            break;
          case "icon-hover":
            if (theme.toggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-hover-closed" });

            }
            break;

        }
      }
    }
    else {
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, "toggled": "open" });

        setTimeout(() => {
          if (theme.toggled == "open") {
            const overlay = document.querySelector("#responsive-overlay");

            if (overlay) {
              overlay.classList.add("active");
              overlay.addEventListener("click", () => {
                const overlay = document.querySelector("#responsive-overlay");

                if (overlay) {
                  overlay.classList.remove("active");
                  menuClose();
                }
              });
            }
          }

          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector("#responsive-overlay");

              if (overlay) {
                overlay.classList.remove("active");
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, "toggled": "close" });
      }
    }

  };


  //toggle dark function

  const ToggleDark = () => {
    const theme = store.getState();
    const isDarkMode = theme.datathememode === 'dark';

    const updatedTheme = {
      ...theme,
      "datathememode": isDarkMode ? 'light' : 'dark',
      "dataheaderstyles": isDarkMode ? 'light' : 'dark',
      "datamenustyles": theme.datanavlayout === 'horizontal' && isDarkMode ? 'dark' : (isDarkMode ? 'light' : 'dark')
    };

    ThemeChanger(updatedTheme);

    if (theme.datathememode === 'light') {
      localStorage.setItem("nowadarktheme", "dark");
      localStorage.removeItem("nowalighttheme");
    } else {
      localStorage.setItem("nowalighttheme", "light");
      localStorage.removeItem("nowadarktheme");
      localStorage.removeItem("darkBgRGB1");
      localStorage.removeItem("darkBgRGB2");
    }
  };

  //fullscreen functionality

  const [isFullScreen, setIsFullScreen] = useState(false);

  const elem = document.documentElement as (HTMLElement & {
    requestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  });

  const openFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.fullscreenElement &&
      !(document as any).msFullscreenElement
    ) {
      requestFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const requestFullscreen = () => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const handleFullscreenChange = () => {
    if (document.fullscreenElement || document.fullscreenElement || (document as any).msFullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  //rightsidebar function

  const [offshow, setoffShow] = useState(false);

  const handleClick = () => {
    setoffShow(true);
  }

  //Switcher

  const [showSwitcher, setShowSwitcher] = useState(false);

  const handleSwitcherClick = () => {
    setShowSwitcher(true);
  }

  return (
    <Fragment>

      <header className="app-header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left align-items-center">

            {/* logo */}
            <div className="header-element">
              <div className="horizontal-logo">
                <Link to={"dashboard/dashboard/"} className="header-logo">
                  <img src={imagesData('desktoplogo')} alt="logo" className="desktop-logo" />
                  <img src={imagesData('togglelogo')} alt="logo" className="toggle-logo" />
                  <img src={imagesData('desktopdark')} alt="logo" className="desktop-dark" />
                  <img src={imagesData('toggledark')} alt="logo" className="toggle-dark" />
                  <img src={imagesData('desktopwhite')} alt="logo" className="desktop-white" />
                  <img src={imagesData('togglewhite')} alt="logo" className="toggle-white" />
                </Link>
              </div>
            </div>

            {/* Toggle icon sidebar */}
            <div className="header-element" onClick={() => toggleSidebar()}>
              <Link aria-label="Hide Sidebar" className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" data-bs-toggle="sidebar" to="#"><span></span></Link>
            </div>

          </div>

          {/* Search field in small screen */}
          <div className="header-content-right">
            <div className="header-element header-search d-block d-sm-none">
              <Dropdown className='header_searchbar' autoClose='outside' >
                <Dropdown.Toggle as='a' variant="" className='header-link'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                </Dropdown.Toggle>
                <Dropdown.Menu as='ul' className='main-header-dropdown dropdown-menu-end'>
                  <li>
                    <Dropdown.Item as='span' className='d-flex align-items-center'>
                      <InputGroup>
                        <Form.Control type="text" placeholder="Search..." aria-label="Search input" aria-describedby="button-addon2" />
                        <Button id="button-addon2">Search</Button>
                      </InputGroup>
                    </Dropdown.Item>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Toggle dark icon */}

            <div className="header-element header-theme-mode">

              <Link to="#" className="header-link layout-setting" onClick={() => ToggleDark()}>
                <span className="light-layout">
                  <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" /></svg>

                </span>
                <span className="dark-layout">
                  <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" /></svg>

                </span>
              </Link>

            </div>

            {/* Fullscreen icon */}
            <div className="header-element header-fullscreen">

              <Link to="#" className="header-link" onClick={openFullscreen}>
                <i className={`bx bx-${isFullScreen ? 'exit-fullscreen' : 'fullscreen'} full-screen-${isFullScreen ? 'close' : 'open'} header-link-icon`}></i>
              </Link>
            </div>

            {/* Right sidebar */}
            <div className="header-element d-md-block d-none">
              <Link to="#" className="header-link" data-bs-toggle="offcanvas" data-bs-target="#sidebar-canvas" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" /></svg>
              </Link>
            </div>
            <Rightsidebar show={offshow} handleClose={() => setoffShow(false)} />

            {/* Profile */}

            <Dropdown className="header-element">
              <Dropdown.Toggle as='a' className="header-link" variant="" id="mainHeaderProfile">
                <div className="d-flex align-items-center">
                  <div className="me-sm-2 me-0">
                    <img src={imagesData('face2')} alt="img" width="32" height="32" className="rounded-circle" />
                  </div>
                  <div className="d-xl-block d-none">
                    <p className="fw-semibold mb-0 lh-1">Keyla Soriano</p>
                    <span className="op-7 fw-normal d-block fs-11">Admin</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu as='ul' className="main-header-dropdown pt-0 overflow-hidden header-profile-dropdown" aria-labelledby="mainHeaderProfile" align='end'>
                <Link to={""} className='dropdown-item d-flex'><i className="far fa-arrow-alt-circle-left fs-16 me-2 op-7"></i>Sign Out</Link>
              </Dropdown.Menu>
            </Dropdown>

            {/* Switcher */}
            <div className="header-element">
              <Link to="#" className="header-link switcher-icon" data-bs-toggle="offcanvas" data-bs-target="#switcher-canvas" onClick={handleSwitcherClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z" /><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z" /></svg>
              </Link>
              <Switcher show={showSwitcher} onClose={() => setShowSwitcher(false)} />
            </div>

          </div>

        </div>

      </header>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Header);