import React, { useMemo } from 'react';
import { Box, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import ButtonComponent from '../../app/layout/ButtonComponent';
import { findPassword } from '../../app/firestore/firebaseService';
import { useState } from 'react';

export default function ForgotPassword() {
  const [emailConfirm, setEmailConfirm] = useState(false);
  const initialValues = { email: '' };
  const validation = useMemo(
    () =>
      Yup.object({
        email: Yup.string().email('이메일 양식에 맞지 않습니다.').required('이메일을 입력해주세요.'),
      }),
    []
  );

  return (
    <Box mt={6} p={3}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await findPassword(values.email);
            setEmailConfirm(true);
            setSubmitting(false);
          } catch (error) {
            console.log(error);
            setErrors({ auth: '일치하는 유저가 없습니다, 올바른 이메일을 입력해주세요.' });
          }
        }}
      >
        {({ isSubmitting, errors, handleChange, handleBlur, touched }) => {
          return (
            <Form style={{ width: '100%' }}>
              <TextField
                id='email'
                name='email'
                variant='outlined'
                label='이메일'
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                type='email'
                autoComplete='off'
              />
              {errors.auth && <Alert severity='error'>{errors.auth}</Alert>}
              {emailConfirm && (
                <Alert severity='success'>비밀번호 초기화 이메일을 전송하였습니다. 메일을 확인해주세요.</Alert>
              )}
              <ButtonComponent
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                css={{ width: '100%', margin: '10px 0' }}
                loading={isSubmitting}
                content='비밀번호 찾기'
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
