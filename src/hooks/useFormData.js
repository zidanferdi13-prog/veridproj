import { useState } from 'react';

export const useFormData = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  const setForm = (data) => {
    setFormData(data);
  };

  return {
    formData,
    handleChange,
    resetForm,
    setForm,
  };
};
