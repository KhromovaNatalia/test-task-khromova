import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { FormData, FormErrors } from '../types';

interface LoanContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
  validateStep: (step: number) => boolean;
  resetForm: () => void; 
}

const initialFormData: FormData = {
  phone: '',
  firstName: '',
  lastName: '',
  gender: '',
  workplace: '',
  address: '',
  amount: 200,
  term: 10,
};

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoanContext must be used within LoanProvider');
  }
  return context;
};

interface LoanProviderProps {
  children: ReactNode;
}

export const LoanProvider: React.FC<LoanProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (Object.keys(data)[0]) {
      setErrors(prev => ({ ...prev, [Object.keys(data)[0]]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.phone) newErrors.phone = 'Телефон обязателен';
        else if (!/^0\d{3}\s\d{3}\s\d{3}$/.test(formData.phone)) {
          newErrors.phone = 'Неверный формат телефона (должен быть: 0XXX XXX XXX)';
        }
        
        if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
        if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
        if (!formData.gender) newErrors.gender = 'Пол обязателен';
        break;

      case 2:
        if (!formData.workplace) newErrors.workplace = 'Место работы обязательно';
        if (!formData.address) newErrors.address = 'Адрес обязателен';
        break;

      case 3:
        if (!formData.amount) newErrors.amount = 'Сумма обязательна';
        if (!formData.term) newErrors.term = 'Срок обязателен';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <LoanContext.Provider value={{ 
      formData, 
      updateFormData, 
      errors, 
      setErrors, 
      validateStep,
      resetForm 
    }}>
      {children}
    </LoanContext.Provider>
  );
};