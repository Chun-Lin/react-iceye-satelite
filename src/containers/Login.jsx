import React from 'react'
import styled from 'styled-components/macro'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import api from 'api'
import { useDispatch } from 'react-redux'
import { login } from 'redux/user/userRedux'

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #71b17f;
`

const LoginBox = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  @media screen and (max-width: 600px) {
    width: 90%;
    height: 90%;
  }

  @media screen and (max-width: 900px) and (min-width: 600px) {
    width: 70%;
    height: 70%;
  }
`

const FieldWrapper = styled.div`
  margin-top: 20px;
`

const Label = styled.label`
  display: block;
  width: 100px;
  text-align: left;
  margin-bottom: 5px;

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }

  @media screen and (max-width: 900px) and (min-width: 600px) {
    font-size: 24px;
  }
`

const StyledForm = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ErrorMsg = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: red;
  text-align: left;
`

function Login() {
  const dispatch = useDispatch()

  return (
    <LoginContainer>
      <LoginBox>
        <h1>SIGN IN TO YOUR ACCOUNT</h1>
        <Formik
          initialValues={{
            name: '',
            password: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(
              'The name cannot be blank, please input it.'
            ),
            password: Yup.string().required(
              'The passowrd cannot be blank, please input it.'
            ),
          })}
          onSubmit={async values => {
            try {
              const data = await api.getToken({
                userId: values.name,
                password: values.password,
              })

              const token = data.data.access
              await localStorage.setItem('accessToken', token)
              await localStorage.setItem('userId', values.name)
              dispatch(login({ userId: values.name }))
            } catch (err) {
              console.log(err.message)
            }
          }}
        >
          {({
            getFieldProps,
            setFieldValue,
            setFieldTouched,
            touched,
            errors,
            isSubmitting,
            submitForm,
          }) => (
            <StyledForm>
              <div>
                <FieldWrapper>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    width="100%"
                    height="36px"
                    placeholder="Please Enter Your Name"
                    onChange={value => setFieldValue('name', value)}
                    onBlur={() => setFieldTouched('name', true)}
                    {...getFieldProps('name')}
                  />
                  {touched.name && errors.name ? (
                    <ErrorMsg>{errors.name}</ErrorMsg>
                  ) : null}
                </FieldWrapper>
                <FieldWrapper>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    width="100%"
                    height="36px"
                    placeholder="Please Enter Your Password"
                    onChange={value => setFieldValue('password', value)}
                    onBlur={() => setFieldTouched('password', true)}
                    {...getFieldProps('password')}
                  />
                  {touched.password && errors.password ? (
                    <ErrorMsg>{errors.password}</ErrorMsg>
                  ) : null}
                </FieldWrapper>
              </div>
              <Button
                type="submit"
                width="100%"
                height="36px"
                color="white"
                backgroundColor="#71B17F"
                border="none"
                borderRadius="100px"
                disabled={errors?.name || errors?.password || isSubmitting}
                onClick={() => {
                  submitForm()
                }}
              >
                SIGN IN
              </Button>
            </StyledForm>
          )}
        </Formik>
      </LoginBox>
    </LoginContainer>
  )
}

export default Login
