import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface SuccessModalProps {
  show: boolean;
  onHide: () => void;
  fullName: string;
  amount: number;
  term: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  show,
  onHide,
  fullName,
  amount,
  term,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onHide();
    navigate('/');
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Заявка одобрена!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <h5 className="mb-0">
          Поздравляем, <span style={{ color: '#6c5ce7', fontWeight: 600 }}>{fullName}</span>.<br />
          Вам одобрена <span style={{ color: '#6c5ce7', fontWeight: 600 }}>${amount}</span> на{' '}
          <span style={{ color: '#6c5ce7', fontWeight: 600 }}>{term} дней</span>.
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose} style={{ minWidth: '120px' }}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;