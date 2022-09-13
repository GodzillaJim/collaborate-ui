import React from "react"
import { Modal, Button } from "react-bootstrap"

interface IDelete {
    handleCancel: () => void;
    handleDelete: () => void;
    show: boolean
}
const DeleteDialog = ({ handleDelete, handleCancel, show }: IDelete) => {
    return <Modal show={show} onHide={handleCancel}>
        <Modal.Body>
            <p>Do you want to delete item?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleCancel} variant={"secondary"}>Cancel</Button>
            <Button variant={"danger"} onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
    </Modal>
}

export default DeleteDialog;