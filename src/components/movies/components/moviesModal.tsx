
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { IMovies } from '../../../Interfaces/IMovies';
import { Modal } from 'react-bootstrap';
import {
    Form,
    Item, GroupItem, Label,
    ButtonItem,
} from 'devextreme-react/form';
import 'devextreme-react/text-area';
import FileUploader from 'devextreme-react/file-uploader';
import { IGender } from '../../../Interfaces/IGender';
import { ButtonType } from 'devextreme/common';
import { postMovies, putMovies } from '../../../services/movieServices';
import { IMovieType } from '../../../Interfaces/IMovieType';
interface ComponentProps {
    visible: boolean,
    movie: IMovies,
    setVisible: Dispatch<SetStateAction<boolean>>;
    gender: Array<IGender>;
    movieType: Array<IMovieType>;
    load: () => Promise<void>;
}
const MoviesModal: FC<ComponentProps> = (props) => {
    const [formData, setFormData] = useState(props.movie);
    const editorOptions = { items: props.gender, searchEnabled: true, value: 'generoId', displayExpr: "descripcion" };
    const movieTypeOptions = { items: props.movieType, searchEnabled: true, value: 'tipoPeliculaId', displayExpr: "tipoPeliculas" };
    const textAreaOptions = { height: 90 };
    const fileUploaderLabel = { 'aria-label': 'Select Photo' };
    const registerButtonOptions = {
        text: 'Guardar',
        type: 'default' as ButtonType,
        useSubmitBehavior: true,
        width: '120px',
    };

    useEffect(() => {
        setFormData(props.movie);
    }, [props.movie])
    // const validateForm = useCallback((e: FormTypes.ContentReadyEvent) => {
    //     e.component.validate();
    // }, []);

    const handleSubmit = useCallback(async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (formData.peliculaId > 0) {
            //Modificar registro existente
            await putMovies(formData)
                .finally(() => { props.setVisible(false), props.load() })
        }
        else {
            //Insertar nuevo registro
            await postMovies(formData)
                .finally(() => { props.setVisible(false), props.load() })
        }

    }, [formData]);

    const handleOnChange = (e: any) => {
        setFormData({ ...formData, [e.dataField]: e.value })
    }

    const handleFileChange = async (e: any) => {
        const file = e.value[0];
        let imgBase64: any = await convertFileToBase64(file);
        setFormData({ ...formData, imgBase64: imgBase64 });
    };


    const convertFileToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
        });
    };

    return (
        <div id="container">
            <Modal show={props.visible} onHide={() => props.setVisible(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title as="h6" className="modal-title">Peliculas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="your-action" onSubmit={handleSubmit}>
                        <Form
                            // onContentReady={validateForm}
                            formData={formData}
                            onFieldDataChanged={(e: any) => handleOnChange(e) /*setFormData({ ...formData, [e.dataField]: e.value })*/}>
                            <GroupItem colCount={2}>
                                <Item dataField="genero" editorType="dxSelectBox" editorOptions={editorOptions}>
                                    <Label text='Genero' />
                                </Item>
                                <Item dataField="titulo" editorOptions={true}>
                                    <Label text='Titulo' />
                                </Item>
                                <GroupItem colCount={2}>
                                    <Item dataField="tipoPelicula" editorType="dxSelectBox" editorOptions={movieTypeOptions}>
                                        <Label text='Tipo' />
                                    </Item>
                                    <Item dataField="fechaLanzamiento" editorType="dxDateBox">
                                        <Label text='Fecha Lanzamiento' />
                                    </Item>

                                </GroupItem>

                                <GroupItem colCount={2}>
                                    <Item dataField="hora" editorType="dxNumberBox" editorOptions={true}>
                                        <Label text='Hora' />
                                    </Item>
                                    <Item dataField="minutos" editorType="dxNumberBox" editorOptions={true}>
                                        <Label text='Minutos' />
                                    </Item>
                                </GroupItem>
                                <Item dataField="sinopsis" colSpan={2} editorType="dxTextArea" editorOptions={textAreaOptions}>
                                    <Label text='Sinopsis' />
                                </Item>
                            </GroupItem>
                            <GroupItem>
                                <div className="fileuploader-container">
                                    <FileUploader
                                        inputAttr={fileUploaderLabel}
                                        selectButtonText="Seleccione Portada"
                                        labelText=""
                                        accept="image/*"
                                        uploadMode="useForm"
                                        onValueChanged={handleFileChange} />
                                </div>
                            </GroupItem>
                            <GroupItem cssClass="buttons-group">
                                <ButtonItem buttonOptions={registerButtonOptions} />
                            </GroupItem>
                        </Form>
                    </form>

                </Modal.Body>
            </Modal>

        </div>
    );
}

export default MoviesModal