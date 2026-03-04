import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoanProvider } from './context/LoanContext';
import { ErrorProvider } from './context/ErrorContext';
import { ErrorContainer } from './components/Error/ErrorToast';
import PersonalInfoForm from './components/Forms/PersonalInfoForm';
import AddressWorkForm from './components/Forms/AddressWorkForm';
import LoanParamsForm from './components/Forms/LoanParamsForm';

function App() {
  return (
    <ErrorProvider>
      <LoanProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PersonalInfoForm />} />
            <Route path="/step2" element={<AddressWorkForm />} />
            <Route path="/step3" element={<LoanParamsForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ErrorContainer />
        </BrowserRouter>
      </LoanProvider>
    </ErrorProvider>
  );
}

export default App;