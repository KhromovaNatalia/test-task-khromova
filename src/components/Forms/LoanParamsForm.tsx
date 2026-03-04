import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useLoanContext } from '../../context/LoanContext';
import { useError } from '../../context/ErrorContext';
import FormLayout from '../Layout/FormLayout';
import SuccessModal from '../Modal/SuccessModal';

const LoanParamsForm: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, errors, validateStep, resetForm } = useLoanContext();
  const { addError } = useError();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ amount: parseInt(e.target.value) });
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ term: parseInt(e.target.value) });
  };

  const handleBack = () => {
    navigate('/step2');
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setSubmitting(true);
    try {
      const response = await axios.post('https://dummyjson.com/products/add', {
        title: `${formData.firstName} ${formData.lastName}`,
        description: 'Loan application',
        price: formData.amount,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: 'Loan',
        category: formData.workplace
      });
      
      if (response.status === 200 || response.status === 201) {
        setShowModal(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Ошибка при отправке заявки:', axiosError);
      
      if (axiosError.response) {
        const status = axiosError.response.status;
        const responseData = axiosError.response.data as any;
        
        if (status === 400) {
          addError(`Ошибка 400: ${responseData?.message || 'Неверные данные запроса'}`);
        }
        if (status >= 500) {
          addError(`Ошибка сервера ${status}: Внутренняя ошибка`);
        } else {
          addError(`Ошибка HTTP ${status}: ${axiosError.message}`);
        }
      } else if (axiosError.code === 'ERR_NETWORK') {
        addError('Ошибка сети. Сервер недоступен');
      } else if (axiosError.code === 'ECONNABORTED') {
        addError('Таймаут запроса. Сервер не отвечает');
      } else {
        addError(`Ошибка: ${axiosError.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
    navigate('/');
  };

  return (
    <>
      <FormLayout title="Параметры займа">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Сумма займа: ${formData.amount}</Form.Label>
            <Form.Range
              min={200}
              max={1000}
              step={100}
              value={formData.amount}
              onChange={handleAmountChange}
            />
            <div className="d-flex justify-content-between">
              <small>$200</small>
              <small>$1000</small>
            </div>
            {errors.amount && (
              <div className="text-danger small mt-1">{errors.amount}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Срок займа: {formData.term} дней</Form.Label>
            <Form.Range
              min={10}
              max={30}
              step={1}
              value={formData.term}
              onChange={handleTermChange}
            />
            <div className="d-flex justify-content-between">
              <small>10 дней</small>
              <small>30 дней</small>
            </div>
            {errors.term && (
              <div className="text-danger small mt-1">{errors.term}</div>
            )}
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleBack}>
              Назад
            </Button>
            <Button 
              variant="success" 
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Отправка...' : 'Подать заявку'}
            </Button>
          </div>
        </Form>
      </FormLayout>

      <SuccessModal
        show={showModal}
        onHide={handleCloseModal}
        fullName={`${formData.lastName} ${formData.firstName}`}
        amount={formData.amount}
        term={formData.term}
      />
    </>
  );
};

export default LoanParamsForm;