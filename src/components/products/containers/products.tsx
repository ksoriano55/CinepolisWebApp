import { FC, Fragment, useEffect, useState } from 'react';
import Pageheader from '../../../layout/layoutcomponent/pageheader';
import { Card, Col } from 'react-bootstrap';
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    LoadPanel,
    Button as Btn,
    Pager,
    Paging,
    SearchPanel,
    Toolbar, Item
} from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import { IMovies } from '../../../Interfaces/IMovies';
import { IProducts } from '../../../Interfaces/IProducts';
import { getProducts } from '../../../services/productServices';
import ProductModal from '../components/productModal';

interface ComponentProps { }
const Movies: FC<ComponentProps> = () => {
    let initialValue: IProducts = { productoId: 0, descripcion: '', precio: 0, disponible: 0, foto: '', imgBase64: '', activo: false }
    const [products, setProducts] = useState<Array<IMovies>>();
    const [productSelected, setProductSelected] = useState<IProducts>(initialValue);
    const [visible, setVisible] = useState(false);
    const pageSizes = [10, 25, 50, 100];
    useEffect(() => {
        getProductsApi();
    }, [])

    const getProductsApi = async () => {
        let result = await getProducts();
        setProducts(result)
    }

    function cellRender(data: any) {
        if (!data || data === "") {
            data = "https://w7.pngwing.com/pngs/901/413/png-transparent-gallery-images-photos-thumbnail.png";
        }
        return (
            <img src={data} alt="ImagenPelicula" width={40} height={40} />
        );
    }

    function onSelectProduct(data: any) {
        setVisible(true);
        setProductSelected(data)
    }

    return (
        <Fragment>
            <Pageheader title="Productos" heading="Productos" active="Listado" />
            <Col sm={12} lg={12} xl={12}>
                <Card className="card overflow-hidden">
                    <Card.Body>
                        <DataGrid
                            dataSource={products}
                            allowColumnReordering={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            showBorders={true}
                        >
                            <SearchPanel visible={true} />
                            <Column type="buttons" caption={"Acciones"}>
                                <Btn
                                    icon="las la-edit"
                                    text={"Editar"}
                                    onClick={(e: any) => onSelectProduct(e.row.data)}
                                />
                            </Column>
                            <Column dataField="foto" cellRender={(rowData) => cellRender(rowData.value)} />
                            <Column dataField="descripcion" />
                            <Column dataField="precio" dataType='number' />
                            <Column dataField="disponible" />
                            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                            <Paging defaultPageSize={10} />
                            <FilterRow visible={true} />
                            <HeaderFilter visible={true} />
                            <LoadPanel enabled={true} />
                            <SearchPanel visible={true} />
                            <Toolbar>
                                <Item location="after">
                                    <Button
                                        text={'Registrar Nuevo'}
                                        icon='las la-plus-circle'
                                        onClick={() => onSelectProduct(initialValue)}
                                    />
                                </Item>
                                <Item name="columnChooserButton" />
                            </Toolbar>
                        </DataGrid>
                    </Card.Body>
                </Card>
            </Col>
            <ProductModal
                visible={visible}
                product={productSelected}
                setVisible={setVisible}
                load={getProductsApi}
            />
        </Fragment>
    )
}

export default Movies