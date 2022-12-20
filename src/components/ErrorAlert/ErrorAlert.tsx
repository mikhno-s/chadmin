import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import './ErrorAlert.css';

function ErrorAlert(props: any) {
    const [show, setShow] = useState(true);
    return (
        <  Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Alert show={show} id="errorAlert" variant="danger" onClose={() => { setShow(false); props.setAlertMessage("") }} dismissible>
                <Alert.Heading>Error!</Alert.Heading>
                <p>
                    {props.alertMessage}
                </p>
            </Alert>
        </Modal>
    )
}


export default ErrorAlert;