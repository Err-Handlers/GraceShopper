import React, { useState } from "react";
import { callApi } from "../api/utils";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProductForm from "./EditProductForm";

const Pastries = ({ pastries, setPastries, token, isAdmin }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const token = localStorage.getItem("token");
    const deletePastry = async (pastryId) => {
        try {
        await callApi({
            method: "DELETE",
            path: `/pastries/${pastryId}`,
            token,
        });
        setPastries((prev) => prev.filter((pastry) => pastryId !== pastry.id));
        } catch (error) {
        console.log(error);
        }
    };

    const openModal = () => {
        setShow(pastry)
    };

    return (
        <>
        <center>
            <h1>Pastries</h1>
        </center>
        <div>
            {pastries.map((pastry) => {
            return (
                <div key={pastry.id}>
                <img src={pastry.imageURL} width="400" height="400"></img>
                <h4>Name: {pastry.name}</h4>
                <h4>Description: {pastry.description}</h4>
                <h4>Inventory: {pastry.inventory}</h4>
                <h4>{`Price: $${pastry.priceInCents / 100}.00`}</h4>
                {isAdmin ? (
                    <button
                    onClick={() => {
                        deletePastry(pastry.id);
                    }}
                    >
                    Delete
                    </button>
                ) : null}
                <Button variant="primary" onClick={() => setShow(pastry)}>
                    Edit Product{pastry.name}
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <EditProductForm
                        name={show.name}
                        description={show.description}
                        isGlutenFree={show.isGlutenFree}
                        isSweet={show.isSweet}
                        priceInCents={show.priceInCents}
                        imageURL={show.imageURL}
                    />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <br></br>
                <br></br>
                </div>
            );
            })}
        </div>
        </>
    );
};

export default Pastries;
