import { ErrorMessage, Field, Form } from 'formik'
import styled from 'styled-components'

export const  ContentContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #010101;
  background-color: #f5f5f5;
  padding: 20px;
`

export const  FormContent = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

export const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const StyledField = styled(Field)`
  width: 92%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 40px;
  
  &:focus {
    outline: none;
    border-color: #007BFF;
  }
`;

export const StyledButton = styled.button`
  padding: 10px ;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrMessage = styled(ErrorMessage)`
  font-size: 12px;
  line-height: 1;
  color: red;
`

export const ResultsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 300px;
  color: #007BFF;
`;

export const ResultItem = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: #333;
`;

export const NotFoundMessage = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #ffdddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 300px;
  text-align: center;
  color: #d8000c;
`;