// InviteModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function InviteModal({ show, onHide, onSendInvite }) {
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    onSendInvite(userName);
    setUserName('');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Odeslat Pozvánku</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Jméno Uživatele</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Zadejte jméno uživatele"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Odeslat Pozvánku
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default InviteModal;
