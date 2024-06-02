import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

axios.defaults.baseURL = 'https://backend-email-number-search.onrender.com/api/contacts';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  number: Yup.string().matches(/^\d{6}$/, 'Number must be 6 digits').nullable(),
});


// Функция для форматирования номера телефона
const formatPhoneNumber = (number) => {
  if (number && number.length === 6) {
    return `${number.slice(0, 2)}-${number.slice(2, 4)}-${number.slice(4, 6)}`;
  }
  return number;
};

export function App() {
  const [contact, setContact] = useState('');
      console.log(contact);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setContact(null);
    try {
      const response = await axios.get('/customer', { params: { email: values.email } });
      if (response.data.length > 0) {
        setContact(response.data[0]);
      } else {
        setContact('');
      }
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <Formik
        initialValues={{ email: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="number">Number:</label>
              <Field type="text" id="number" name="number" />
              <ErrorMessage name="number" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>

      {contact && (
        <div>
          <h2>Results:</h2>
          <p>{contact.email}</p>
          <p>{formatPhoneNumber(contact.number)}</p>
        </div>
      )}
    </div>
  );
};


