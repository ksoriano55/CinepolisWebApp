import { FC, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { imagesData } from '../../common/commonimages';

interface ComponentProps { }

const Signin: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <HelmetProvider>
                <Helmet>
                    <body className='error-1 bg-primary-gradient'></body>
                </Helmet>
            </HelmetProvider>
            <div className="square-box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="container">
                <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main mx-auto my-auto py-4 justify-content-center">
                        <div className="card-sigin">
                            <div className="main-card-signin d-md-flex">
                                <div className="wd-100p">
                                    <div className="d-flex mb-4">
                                        <Link to="#" ><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo" /></Link>
                                    </div>
                                    <div className="">
                                        <div className="main-signup-header">
                                            <h2>¡Bienvenido a Cinema!</h2>
                                            <h6 className="fw-semibold mb-4">Inicio de Sesión</h6>
                                            <div className="panel panel-primary">
                                                <div className="panel-body tabs-menu-body border-0 p-3">
                                                    <form action="#">
                                                        <div className="form-group">
                                                            <label>Usuario</label> 
                                                            <input className="form-control" placeholder="Ingrese su usuario" type="text" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Contraseña</label> 
                                                            <input className="form-control" placeholder="Ingrese su contraseña" type="password" />
                                                        </div><Link to={"movies"} className="btn btn-primary btn-block">Ingresar</Link>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Signin;