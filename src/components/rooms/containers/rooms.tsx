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
import { getRooms, postRooms, putRooms } from '../../../services/roomServices';
import { ICinema } from '../../../Interfaces/ICinema';
import { getCinema } from '../../../services/cinemaServices';
import { IRoom } from '../../../Interfaces/IRoom';

interface ComponentProps { }
const Rooms: FC<ComponentProps> = () => {
    const [rooms, setRooms] = useState<Array<IRoom>>();
    const [cinemas, setCinemas] = useState<Array<ICinema>>();
    const pageSizes = [10, 25, 50, 100];
    useEffect(() => {
        loadCinema();
        getRoom();
    }, [])

    const getRoom = async () => {
        let result = await getRooms();
        setRooms(result)
    }

    const loadCinema = async () => {
        let result = await getCinema();
        setCinemas(result)
    }

    const sendRequestApi = React.useCallback(async (e: any) => {
        if (e.changes.length) {
            if(e.changes[0].type === "insert"){
                await postRooms(e.changes[0].data).finally(() => getRoom());
            }
            else{
                await putRooms(e.changes[0].data).finally(() => getRoom());
            }
        }
    }, []);

    return (
        <Fragment>
            <Pageheader title="Salas" heading="Salas" active="Listado" />
            <Col sm={12} lg={12} xl={12}>
                <Card className="card overflow-hidden">
                    <Card.Body>
                        <DataGrid
                            dataSource={rooms}
                            allowColumnReordering={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            showBorders={true}
                            onSaved={sendRequestApi}
                        >
                            <SearchPanel visible={true} />
                            <Column dataField="salaId" allowEditing={false} />
                            <Column dataField="cineId" caption="Cine">
                                <Lookup dataSource={cinemas} displayExpr="descripcion" valueExpr="cineId" />
                            </Column>
                            <Column dataField="descripcion" />
                            <Column dataField="capacidad" dataType='number' />
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

export default Rooms