import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
} from 'reactstrap';

const UpdateModal = ({
  children,
  modal,
  title,
  accept,
  toggle,
  acceptText,
}) => (
  <div>
    <Modal isOpen={modal}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={accept}>{acceptText}</Button>
        {' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);

export default UpdateModal;
