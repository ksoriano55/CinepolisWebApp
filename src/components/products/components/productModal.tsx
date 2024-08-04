
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
    Form,
    Item, GroupItem, Label,
    ButtonItem,
} from 'devextreme-react/form';
import 'devextreme-react/text-area';
import FileUploader from 'devextreme-react/file-uploader';
import { ButtonType } from 'devextreme/common';
import { IProducts } from '../../../Interfaces/IProducts';
import { postProduct, putProduct } from '../../../services/productServices';
interface ComponentProps {
    visible: boolean,
    product: IProducts,
    setVisible: Dispatch<SetStateAction<boolean>>;
    load: () => Promise<void>;
}
const ProductModal: FC<ComponentProps> = (props) => {
    const [formData, setFormData] = useState(props.product);
    const fileUploaderLabel = { 'aria-label': 'Select Photo' };
    const registerButtonOptions = {
        text: 'Guardar',
        type: 'default' as ButtonType,
        useSubmitBehavior: true,
        width: '120px',
    };

    useEffect(() => {
        setFormData(props.product);
    }, [props.product])
    // const validateForm = useCallback((e: FormTypes.ContentReadyEvent) => {
    //     e.component.validate();
    // }, []);

    const handleSubmit = useCallback(async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (formData.productoId > 0) {
            //Modificar registro existente
            await putProduct(formData)
                .finally(() => { props.setVisible(false), props.load() })
        }
        else {
            //Insertar nuevo registro
            await postProduct(formData)
                .finally(() => { props.setVisible(false), props.load() })
        }

    }, [formData]);

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
                    <Modal.Title as="h6" className="modal-title">Productos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="your-action" onSubmit={handleSubmit}>
                        <Form
                            formData={formData}
                            onFieldDataChanged={(e: any) => setFormData({ ...formData, [e.dataField]: e.value })}>
                            <GroupItem colCount={2}>
                                <Item dataField="descripcion" editorOptions={true}>
                                    <Label text='Producto' />
                                </Item>
                                <GroupItem colCount={2}>
                                    <Item dataField="precio" editorType="dxNumberBox" editorOptions={true}>
                                        <Label text='Precio' />
                                    </Item>
                                    <Item dataField="disponible" editorType="dxNumberBox" editorOptions={true}>
                                        <Label text='Disponible' />
                                    </Item>
                                </GroupItem>
                            </GroupItem>
                            <GroupItem>
                                <div className="fileuploader-container">
                                    <FileUploader
                                        inputAttr={fileUploaderLabel}
                                        selectButtonText="Seleccione Foto"
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

export default ProductModal