import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ContentContainer, ErrMessage, FormContent, NotFoundMessage, ResultItem, ResultsContainer, StyledButton, StyledField, StyledLabel } from './App.styled';
import Loader from './Loader/Loader';

axios.defaults.baseURL = 'https://backend-email-number-search.onrender.com/api/contacts';

const initialValues = {
  email: '',
  number: '',
};

const validationSchema = Yup.object({
  email: Yup.string().matches(/^\w+([.-]?\w+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address').required('Required'),
  number: Yup.string().matches(/^\d{6}$/, 'Number must be 6 digits').nullable(),
});

const formatPhoneNumber = (number) => {
  if (number && number.length === 6) {
    return `${number.slice(0, 2)}-${number.slice(2, 4)}-${number.slice(4, 6)}`;
  }
  return number;
};


export function App() {
  const [contact, setContact] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelTokenSource = useRef(null);

  useEffect(() => {
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('Component unmounted');
      }
    };
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setContact('');
    setNotFound(false);
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('New request initiated');
    }
    cancelTokenSource.current = axios.CancelToken.source();

    try {
      const response = await axios.post('/customer', {
        email: values.email,
      }, {
        cancelToken: cancelTokenSource.current.token,
      });
      if (response.data.length > 0) {
        setContact(response.data[0]);
      } else {
        setNotFound(true);
      }
      resetForm();
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error(error);
      }
    } finally {
      setSubmitting(false);      
    }
  };

  return (
    <ContentContainer >
      <Formik
        initialValues={ initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <FormContent>
            <div>
              <StyledLabel htmlFor="email">Email:</StyledLabel>
              <StyledField type="email" id="email" name="email" placeholder="john@gmail.com" />
              <ErrMessage name="email" component="div" />
            </div>
            <div>
              <StyledLabel htmlFor="number">Number:</StyledLabel>
              <StyledField type="text" id="number" name="number" placeholder="777777" />
              <ErrMessage name="number" component="div" />
            </div>
            <StyledButton type="submit" >
              Submit
            </StyledButton>
          </FormContent>
        )}
      </Formik>
      {loading && <Loader />}
      {contact && (
        <ResultsContainer>
          <h2>Results:</h2>
          <ResultItem>{contact.email}</ResultItem>
          <ResultItem>{formatPhoneNumber(contact.number)}</ResultItem>
        </ResultsContainer>
      )}

      {notFound && (
        <NotFoundMessage>
          <h2>Oops nothing found :\</h2>
        </NotFoundMessage>
      )}
    </ContentContainer>
  );
};