import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
} from 'reactstrap';

const DefaultModal = ({
  modal,
  title,
  toggle,
  accept,
  className,
  acceptText,
  description,
  children,
}) => (
  <div>
    <Modal isOpen={modal} className={className}>
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

export default DefaultModal;
