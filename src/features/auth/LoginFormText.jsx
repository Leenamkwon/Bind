import React, { useMemo } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import ButtonComponent from '../../app/layout/ButtonComponent';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import { modalClose } from '../../app/common/modal/modalReducer';
import SocialLogin from './SocialLogin';

export default function LoginFormText() {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = useMemo(() => ({ email: '', password: '' }), []);
  const validation = useMemo(
    () =>
      Yup.object({
        email: Yup.string().email('이메일 양식에 맞지 않습니다.').required('이메일을 입력해주세요.'),
        password: Yup.string().min(6, '비밀번호는 최소 6자리 이상입니다.').required('패스워드를 입력해주세요.'),
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
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(modalClose());
            history.push('/events');
          } catch (error) {
            setErrors({ auth: '이메일 또는 비밀번호가 맞지 않습니다.' });
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, touched, isSubmitting, dirty, isValid, errors }) => (
          <Form>
            <TextField
              type='email'
              name='email'
              variant='outlined'
              fullWidth
              label='이메일'
              value={values.email}
              helperText={errors.email}
              error={touched.email && !!errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              type='password'
              name='password'
              variant='outlined'
              fullWidth
              label='패스워드'
              style={{ margin: '25px 0 10px 0' }}
              value={values.password}
              helperText={errors.password}
              error={touched.password && !!errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.auth && <Alert severity='error'>{errors.auth}</Alert>}
            <ButtonComponent
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              css={{ width: '100%', margin: 0 }}
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              content='로그인'
              fullWidth
            />
            <Box mt={3} mb={3}>
              <Typography align='center' color='textSecondary'>
                OR
              </Typography>
            </Box>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
