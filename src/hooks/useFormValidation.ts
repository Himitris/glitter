// Créez un nouveau fichier src/hooks/useFormValidation.ts
import { useState, ChangeEvent } from 'react';

type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  isEmail?: boolean;
};

type ValidationErrors = {
  [key: string]: string;
};

type FormValues = {
  [key: string]: string;
};

export const useFormValidation = (initialState: FormValues) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  const validateField = (name: string, value: string, rules: ValidationRules): string => {
    if (rules.required && !value) {
      return 'Ce champ est requis';
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      return `Ce champ doit contenir au moins ${rules.minLength} caractères`;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Ce champ ne doit pas dépasser ${rules.maxLength} caractères`;
    }
    
    if (rules.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Veuillez entrer une adresse email valide';
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Format invalide';
    }
    
    return '';
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rules: ValidationRules = {}
  ) => {
    const { name, value } = event.target;
    
    setValues({
      ...values,
      [name]: value
    });
    
    const error = validateField(name, value, rules);
    
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const validateForm = (validationRules: {[key: string]: ValidationRules}) => {
    const newErrors: ValidationErrors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name] || '', validationRules[name]);
      newErrors[name] = error;
      
      if (error) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues
  };
};