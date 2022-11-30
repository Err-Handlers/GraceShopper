import React, { useState, useEffect } from "react";
import { callApi } from "../api/utils";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProductForm from "./EditProductForm";

const Pastries = ({ token, isAdmin, pastryToEdit }) => {
  const [pastries, setPastries] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [selectedPastry, setSelectedPastry] = useState(null);
  // const token = localStorage.getItem("token");

  const fetchPastries = async () => {
    const data = await callApi({
      path: "/pastries",
    });
    setPastries(data);
  };

  useEffect(() => {
    fetchPastries();
  }, []);

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
  function onPastryEdited() {
    console.log("pastry was updated");
    fetchPastries();
    handleClose();
  }
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
                  variant="secondary"
                  onClick={() => {
                    deletePastry(pastry.id);
                  }}
                >
                  Delete
                </button>
              ) : null}
              {isAdmin ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedPastry(pastry);
                    setShow(true);
                  }}
                >
                  Edit Product {pastry.name}
                </Button>
              ) : null}

              <br></br>
              <br></br>
            </div>
          );
        })}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProductForm
              pastry={selectedPastry}
              isAdmin={isAdmin}
              token={token}
              setPastries={setPastries}
              pastryToEdit={pastryToEdit}
              onPastryEditedHandler={onPastryEdited}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
                            Save Changes
                    </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Pastries;
