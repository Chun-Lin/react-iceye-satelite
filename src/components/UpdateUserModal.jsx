import React from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { GrClose } from 'react-icons/gr'

import Button from './shared/Button'
import Input from './shared/Input'
import api from 'api'
import { logout } from 'redux/user/userRedux'
import { useDispatch } from 'react-redux'

const UpdateUserModalWrapper = styled.div`
  width: 40vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 600px) {
    width: 90vw;
    height: 80vh;
  }

  @media screen and (min-width: 600px) and (max-width: 900px) {
    width: 70vw;
    height: 50vh;
  }
`

const ModalHeader = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  font-size: 24px;
`

const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px 20px;
  font-size: 20px;
`

const StyledForm = styled(Form)`
  width: 100%;
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

const ErrorMsg = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: red;
  text-align: left;
`

function UpdateUserModal({ onClose }) {
  const dispatch = useDispatch()

  return (
    <UpdateUserModalWrapper>
      <ModalHeader>
        <span>Update User Info</span>
        <GrClose onClick={onClose} data-testid="closeBtn" />
      </ModalHeader>
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
            await api.updateUserInfo({
              name: values.name,
              password: values.password,
            })
            await localStorage.removeItem('userId')
            await localStorage.removeItem('accessToken')
            await dispatch(logout())
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
          <>
            <ModalContent>
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
              </StyledForm>
              <Button
                type="submit"
                width="100%"
                height="36px"
                color="white"
                backgroundColor="#71B17F"
                border="none"
                borderRadius="100px"
                disabled={errors?.name || errors?.password || isSubmitting}
                onClick={() => submitForm()}
              >
                UPDATE
              </Button>
            </ModalContent>
          </>
        )}
      </Formik>
    </UpdateUserModalWrapper>
  )
}

export default UpdateUserModal
