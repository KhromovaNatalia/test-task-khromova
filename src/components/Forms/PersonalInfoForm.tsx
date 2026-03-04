import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { useLoanContext } from '../../context/LoanContext';
import FormLayout from '../Layout/FormLayout';

const PersonalInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, errors, validateStep } = useLoanContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleNext = () => {
    if (validateStep(1)) {
      navigate('/step2');
    }
  };

  return (
    <FormLayout title="Личные данные">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Телефон *</Form.Label>
          <IMaskInput
            mask="0{000} 000 000"
            value={formData.phone}
            onAccept={(value: string) => updateFormData({ phone: value })}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="0XXX XXX XXX"
            type="tel"
          />
          {errors.phone && (
            <div className="invalid-feedback d-block">{errors.phone}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Имя *</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Фамилия *</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Пол *</Form.Label>
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleSelectChange}
            isInvalid={!!errors.gender}
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" onClick={handleNext}>
            Далее
          </Button>
        </div>
      </Form>
    </FormLayout>
  );
};

export default PersonalInfoForm;