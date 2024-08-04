import React, { FC, Fragment, useEffect, useState } from 'react';
import Pageheader from '../../../layout/layoutcomponent/pageheader';
import { Card, Col } from 'react-bootstrap';
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    LoadPanel,
    Pager,
    Paging,
    SearchPanel,
    Editing,
    Lookup,
} from 'devextreme-react/data-grid';
import { getRooms } from '../../../services/roomServices';
import { IRoom } from '../../../Interfaces/IRoom';
import { getSchedules, postSchedules, putSchedules } from '../../../services/scheduleServices';
import { getMovies } from '../../../services/movieServices';
import { IMovies } from '../../../Interfaces/IMovies';
import { getProjection } from '../../../services/projectionServices';
import { IProjection } from '../../../Interfaces/IProjection';

interface ComponentProps { }
const Schedules: FC<ComponentProps> = () => {
    const [schedules, setSchedules] = useState<Array<IRoom>>();
    const [rooms, setRoom] = useState<Array<IRoom>>();
    const [movies, setMovies] = useState<Array<IMovies>>();
    const [projection, setProjection] = useState<Array<IProjection>>();
    const pageSizes = [10, 25, 50, 100];
    useEffect(() => {
        loadMovies();
        loadRooms();
        loadProjection();
        getSchedule();
    }, [])

    const getSchedule = async () => {
        let result = await getSchedules();
        setSchedules(result)
    }

    const loadRooms = async () => {
        let result = await getRooms();
        setRoom(result)
    }

    const loadMovies = async () => {
        let result = await getMovies();
        setMovies(result)
    }

    const loadProjection = async () => {
        let result = await getProjection();
        setProjection(result)
    }

    const sendRequestApi = React.useCallback(async (e: any) => {
        if (e.changes.length) {
            if (e.changes[0].type === "insert") {
                await postSchedules(e.changes[0].data).finally(() => getSchedule());
            }
            else {
                await putSchedules(e.changes[0].data).finally(() => getSchedule());
            }
        }
    }, []);

    return (
        <Fragment>
            <Pageheader title="Horarios" heading="Listado" active="Horarios" />
            <Col sm={12} lg={12} xl={12}>
                <Card className="card overflow-hidden">
                    <Card.Body>
                        <DataGrid
                            dataSource={schedules}
                            allowColumnReordering={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            showBorders={true}
                            onSaved={sendRequestApi}
                        >
                            <SearchPanel visible={true} />
                            <Column dataField="peliculaId" caption="Pelicula" groupIndex={0}>
                                <Lookup dataSource={movies} displayExpr="titulo" valueExpr="peliculaId" />
                            </Column>
                            <Column dataField="peliculaId" caption="Pelicula">
                                <Lookup dataSource={movies} displayExpr="titulo" valueExpr="peliculaId" />
                            </Column>
                            <Column dataField="salaId" caption='Sala'>
                                <Lookup dataSource={rooms} displayExpr="descripcion" valueExpr="salaId" />
                            </Column>
                            <Column dataField="horaInicio" dataType='datetime' />
                            <Column dataField="horaFinal" dataType='datetime' />
                            <Column dataField="tipoProyeccioId" caption='Proyeccion'>
                                <Lookup dataSource={projection} displayExpr="descripcion" valueExpr="tipoProyeccionId" />
                            </Column>
                            <Column dataField="activo" dataType='boolean' />
                            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                            <Paging defaultPageSize={10} />
                            <FilterRow visible={true} />
                            <HeaderFilter visible={true} />
                            <LoadPanel enabled={true} />
                            <SearchPanel visible={true} />
                            <Editing
                                mode="row"
                                allowUpdating={true}
                                allowDeleting={false}
                                allowAdding={true}
                                useIcons={true}
                            />
                        </DataGrid>
                    </Card.Body>
                </Card>
            </Col>
        </Fragment>
    )
}

export default Schedules