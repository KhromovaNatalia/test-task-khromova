import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useLoanContext } from '../../context/LoanContext';
import { useError } from '../../context/ErrorContext';
import FormLayout from '../Layout/FormLayout';
import { type WorkplaceCategory } from '../../types';

const AddressWorkForm: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, errors, validateStep } = useLoanContext();
  const { addError } = useError();
  const [categories, setCategories] = useState<WorkplaceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        const categoryList = response.data.map((cat: WorkplaceCategory) => ({
          slug: cat.slug || cat,
          name: cat.name || cat,
          url: cat.url || ''
        }));
        setCategories(categoryList);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Ошибка при загрузке категорий:', axiosError);
        
        if (axiosError.response) {
          const status = axiosError.response.status;
          if (status >= 400 && status < 500) {
            addError(`Клиентская ошибка: ${status} - ${axiosError.message}`);
          } else if (status >= 500) {
            addError(`Серверная ошибка: ${status} - Внутренняя ошибка сервера`);
          } else {
            addError(`Ошибка HTTP: ${status}`);
          }
        } else if (axiosError.code === 'ERR_NETWORK') {
          addError('Ошибка сети. Сервер недоступен');
        } else if (axiosError.code === 'ECONNABORTED') {
          addError('Таймаут запроса. Сервер не отвечает');
        } else {
          addError(`Ошибка соединения: ${axiosError.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    if (validateStep(2)) {
      navigate('/step3');
    }
  };

  return (
    <FormLayout title="Адрес и место работы">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Место работы *</Form.Label>
          <Form.Select
            name="workplace"
            value={formData.workplace}
            onChange={handleSelectChange}
            isInvalid={!!errors.workplace}
            disabled={loading}
          >
            <option value="">
              {loading ? 'Загрузка...' : 'Выберите место работы'}
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.workplace}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Адрес проживания *</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleBack}>
            Назад
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Далее
          </Button>
        </div>
      </Form>
    </FormLayout>
  );
};

export default AddressWorkForm;