import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useContacts from '../hooks/useContacts';

const Problem2 = () => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const { data, isLoading } = useContacts();

  const handleCloseA = () => setShowA(false);
  const handleShowA = () => setShowA(true);

  const handleCloseB = () => setShowB(false);
  const handleShowB = () => setShowB(true);

  const handleSwitchToA = () => {
    setShowB(false);
    setShowA(true);
  };
  const handleSwitchToB = () => {
    setShowA(false);
    setShowB(true);
  };

  if (isLoading) return <Spinner />;

  if (data) console.log(data);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleShowA}>
            All Contacts
          </button>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showA}
            onHide={handleCloseA}>
            <Modal.Header closeButton>
              <Modal.Title>Modal A</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal A</Modal.Body>
            <Modal.Footer className="my-custom-footer">
              <div className="gap-1 d-flex">
                <input className="" type="checkbox" id="even-only" />
                <label className="" htmlFor="even-only">
                  Only even
                </label>
              </div>

              <div className="gap-2 d-flex">
                <Button variant="primary" onClick={handleShowA}>
                  All Contacts
                </Button>
                <Button variant="secondary" onClick={handleSwitchToB}>
                  US Contacts
                </Button>
                <Button variant="danger" onClick={handleCloseA}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleShowB}>
            US Contacts
          </button>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showB}
            onHide={handleCloseB}>
            <Modal.Header closeButton>
              <Modal.Title>Modal B</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal B</Modal.Body>
            <Modal.Footer className="my-custom-footer">
              <div className="gap-1 d-flex">
                <input className="" type="checkbox" id="even-only" />
                <label className="" htmlFor="even-only">
                  Only even
                </label>
              </div>

              <div className="gap-2 d-flex">
                <Button variant="primary" onClick={handleSwitchToA}>
                  All Contacts
                </Button>
                <Button variant="secondary" onClick={handleShowB}>
                  US Contacts
                </Button>
                <Button variant="danger" onClick={handleCloseB}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Problem2;
