import React, { useState } from 'react';
import './App.css';

const Formik = () => {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: !name ? ' Будь ласка, введіть ім\'я' : '',
      email: !email ? ' Будь ласка, введіть електронну пошту' : !emailRegex.test(email) ? ' Будь ласка, введіть коректну електронну пошту' : '',
      phone: !phone ? ' Будь ласка, введіть номер телефону' : !/^\d{12}$/.test(phone) ? ' Номер телефону повинен містити до 12 цифр' : '',
    };

    setErrors(newErrors);

    const formIsValid = !Object.values(newErrors).some((error) => error !== '');

    if (formIsValid) {
      alert('Дані успішно відправлено: ' + JSON.stringify(formData));

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
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Електронна пошта:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Телефон:</label>
          <input type="phone" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        <button type="submit">Відправити</button>
      </form>
  );
};

export default Formik;