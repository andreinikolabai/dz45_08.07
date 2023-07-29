import React, { useState } from 'react';
import './App.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, phone } = formData;

    // Виконуємо валідацію полів
    let formIsValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      setErrors({ ...errors, name: 'Будь ласка, введіть ім\'я' });
      formIsValid = false;
    } else {
      setErrors({ ...errors, name: '' });
    }

    if (!email) {
      setErrors({ ...errors, email: 'Будь ласка, введіть електронну пошту' });
      formIsValid = false;
    } else if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: 'Будь ласка, введіть коректну електронну пошту' });
      formIsValid = false;
    } else {
      setErrors({ ...errors, email: '' });
    }

    if (!phone) {
      setErrors({ ...errors, phone: 'Будь ласка, введіть номер телефону' });
      formIsValid = false;
    } else if (!/^\d{10,12}$/.test(phone)) {
      setErrors({ ...errors, phone: 'Номер телефону повинен містити від 10 до 12 цифр' });
      formIsValid = false;
    } else {
      setErrors({ ...errors, phone: '' });
    }

    if (formIsValid) {
      // Виконуємо дії після успішної відправки форми
      alert('Дані успішно відправлено: ' + JSON.stringify(formData));

      // Затираємо поля форми
      setFormData({
        name: '',
        email: '',
        phone: '',
      });

      setErrors({
        name: '',
        email: '',
        phone: '',
      });
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Ім'я:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Електронна пошта:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Телефон:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span>{errors.phone}</span>}
        </div>
        <button type="submit">Відправити</button>
      </form>
  );
};

export default ContactForm;