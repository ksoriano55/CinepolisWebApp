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
    Toolbar, Item,
    Lookup
} from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import { IMovies } from '../../../Interfaces/IMovies';
import { getMovies } from '../../../services/movieServices';
import MoviesModal from '../components/moviesModal';
import { IGender } from '../../../Interfaces/IGender';
import { getGenders } from '../../../services/genderServices';
import { getmovieType } from '../../../services/moviesTypeServices';
import { IMovieType } from '../../../Interfaces/IMovieType';

interface ComponentProps { }
const Movies: FC<ComponentProps> = () => {
    let initialGender: Array<IGender> = [{ generoId: 0, descripcion: "", activo: false }]
    let initialmovieType: Array<IMovieType> = [{ tipoPeliculaId: 0, tipoPeliculas: "", activo: false }]
    let initialValue: IMovies = { generoId: 0, tipoPeliculaId: 0, foto: "", titulo: "", sinopsis: "", fechaLanzamiento: new Date(), minutos: 0, hora: 0, activo: false, peliculaId: 0, genero: initialGender[0], tipoPelicula: initialmovieType[0] }
    const [movies, setMovies] = useState<Array<IMovies>>();
    const [movieSelected, setMovieSelected] = useState<IMovies>(initialValue);
    const [genders, setGenders] = useState<Array<IGender>>(initialGender);
    const [moviesType, setMoviesType] = useState<Array<IMovieType>>(initialmovieType);
    const [visible, setVisible] = useState(false);
    const pageSizes = [10, 25, 50, 100];
    useEffect(() => {
        getmoviesType();
        getMoviesApi();
        getGenderApi();
    }, [])

    const getMoviesApi = async () => {
        let result = await getMovies();
        setMovies(result)
    }

    const getGenderApi = async () => {
        let result = await getGenders();
        setGenders(result)
    }

    const getmoviesType = async () => {
        let result = await getmovieType();
        setMoviesType(result)
    }

    function cellRender(data: any) {
        return (
            <img src={data} alt="ImagenPelicula" width={40} height={40} />
        );
    }

    function cellTime(data: any) {
        return data.data.hora + "h " + data.data.minutos + "min";
    }

    function onSelectMovie(data: any) {
        setMovieSelected(data)
        setVisible(true);
    }

    return (
        <Fragment>
            <Pageheader title="Peliculas" heading="Peliculas" active="Listado" />
            <Col sm={12} lg={12} xl={12}>
                <Card className="card overflow-hidden">
                    <Card.Body>
                        <DataGrid
                            dataSource={movies}
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
                                    onClick={(e: any) => onSelectMovie(e.row.data)}
                                />
                            </Column>
                            <Column dataField="tipoPeliculaId" caption="Clasificacion" groupIndex={0}>
                                <Lookup dataSource={moviesType} displayExpr="tipoPeliculas" valueExpr="tipoPeliculaId" />
                            </Column>
                            <Column dataField="foto" cellRender={(rowData) => cellRender(rowData.value)} />
                            <Column dataField="titulo" />
                            <Column dataField="fechaLanzamiento" caption='Lanzamiento' dataType='date' />
                            <Column dataField="genero.descripcion" caption='Genero' />
                            <Column dataField="hora" caption='Duracion' cellRender={cellTime} />
                            <Column dataField="sinopsis" caption='Sinopsis' />
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
                                        onClick={() => onSelectMovie(initialValue)}
                                    />
                                </Item>
                                <Item name="columnChooserButton" />
                            </Toolbar>
                        </DataGrid>
                    </Card.Body>
                </Card>
            </Col>
            <MoviesModal
                visible={visible}
                movie={movieSelected}
                movieType={moviesType}
                setVisible={setVisible}
                gender={genders!}
                load={getMoviesApi}
            />
        </Fragment>
    )
}

export default Movies