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
import { IMovies } from '../../../Interfaces/IMovies';
import { getProjection } from '../../../services/projectionServices';
import { IProjection } from '../../../Interfaces/IProjection';
import { getCategory } from '../../../services/categoryServices';
import { IPrice } from '../../../Interfaces/IPrices';
import { getPrices, postPrices, putPrices } from '../../../services/priceServices';

interface ComponentProps { }
const Prices: FC<ComponentProps> = () => {
    const [prices, setPrices] = useState<Array<IPrice>>();
    const [category, setCategory] = useState<Array<IMovies>>();
    const [projection, setProjection] = useState<Array<IProjection>>();
    const pageSizes = [10, 25, 50, 100];
    useEffect(() => {
        loadCategory();
        loadProjection();
        getPrice();
    }, [])

    const getPrice = async () => {
        let result = await getPrices();
        setPrices(result)
    }

    const loadCategory = async () => {
        let result = await getCategory();
        setCategory(result)
    }

    const loadProjection = async () => {
        let result = await getProjection();
        setProjection(result)
    }

    const sendRequestApi = React.useCallback(async (e: any) => {
        if (e.changes.length) {
            if (e.changes[0].type === "insert") {
                await postPrices(e.changes[0].data).finally(() => getPrice());
            }
            else {
                await putPrices(e.changes[0].data).finally(() => getPrice());
            }
        }
    }, []);

    return (
        <Fragment>
            <Pageheader title="Precios" heading="Listados" active="Precios" />
            <Col sm={12} lg={12} xl={12}>
                <Card className="card overflow-hidden">
                    <Card.Body>
                        <DataGrid
                            dataSource={prices}
                            allowColumnReordering={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            showBorders={true}
                            onSaved={sendRequestApi}
                        >
                            <SearchPanel visible={true} />                           
                           <Column dataField="precioId" allowEditing={false}/>
                            <Column dataField="categoriaId" caption="Categoria">
                                <Lookup dataSource={category} displayExpr="descripcion" valueExpr="categoriaId" />
                            </Column>
                            <Column dataField="tipoProyeccionId" caption='Proyeccion'>
                                <Lookup dataSource={projection} displayExpr="descripcion" valueExpr="tipoProyeccionId" />
                            </Column>
                            <Column dataField="monto" dataType='number' />
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

export default Prices