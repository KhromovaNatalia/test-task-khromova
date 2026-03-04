import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useError } from '../../context/ErrorContext';

export const ErrorContainer: React.FC = () => {
  const { errors, removeError } = useError();

  return (
    <ToastContainer
      className="p-3"
      position="top-end"
      style={{ zIndex: 9999, position: 'fixed', top: '20px', right: '20px' }}
    >
      {errors.map(error => (
        <Toast
          key={error.id}
          onClose={() => removeError(error.id)}
          show={true}
          delay={5000}
          autohide
          className="mb-2 bg-danger text-white"
          style={{ minWidth: '300px', opacity: 0.95 }}
        >
          <Toast.Header closeButton className="border-bottom-0" closeVariant="white">
            <strong className="me-auto">
              <span style={{ marginRight: '8px' }}>❌</span>
              Ошибка сервера
            </strong>
            <small>только что</small>
          </Toast.Header>
          <Toast.Body className="py-3">
            {error.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};