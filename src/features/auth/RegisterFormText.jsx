import React, { useMemo } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../app/common/modal/modalReducer';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// COMPONENT
import SocialLogin from './SocialLogin';
import { registerInFirebase } from '../../app/firestore/firebaseService';
import ButtonComponent from '../../app/layout/ButtonComponent';
import { useHistory } from 'react-router';

export default function RegisterFormText({ type = 'modal' }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { prevLocation } = useSelector((state) => state.auth);
  const initialValues = useMemo(() => ({ displayName: '', email: '', password: '', confirmPassword: '' }), []);
  const validation = useMemo(
    () =>
      Yup.object({
        displayName: Yup.string().max(12, '이름은 최대 12자입니다.').required('이름 양식은 필수입니다.'),
        email: Yup.string().email('이메일 양식에 맞지 않습니다.').required('이메일을 입력해주세요.'),
        password: Yup.string().min(6, '패스워드는 최소 6자리 이상입니다.').required('패스워드를 입력해주세요.'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], '1차 패스워드와 맞지 않습니다')
          .required('패스워드 확인 양식은 필수입니다.'),
      }),
    []
  );

  return (
    <Box p={3}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(modalClose());
            if (type === 'modal') {
              history.push('/events');
            } else {
              history.push(prevLocation?.pathname ?? '/events');
            }
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, touched, isSubmitting, dirty, isValid, errors }) => {
          return (
            <Form>
              <TextField
                id='displayName'
                name='displayName'
                variant='outlined'
                fullWidth
                label='이름'
                size='small'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.displayName && Boolean(errors.displayName)}
                helperText={touched.displayName && errors.displayName}
                autoComplete='off'
                style={{ margin: '10px 0' }}
              />
              <TextField
                id='email'
                name='email'
                variant='outlined'
                fullWidth
                label='이메일'
                size='small'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                type='email'
                autoComplete='off'
                style={{ margin: '10px 0' }}
              />
              <TextField
                id='password'
                name='password'
                variant='outlined'
                fullWidth
                label='패스워드'
                size='small'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                type='password'
                style={{ margin: '10px 0' }}
              />
              <TextField
                id='confirmPassword'
                name='confirmPassword'
                variant='outlined'
                fullWidth
                label='패스워드 확인'
                size='small'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                type='password'
                style={{ margin: '10px 0' }}
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
                content='가입하기'
                fullWidth
              />
              <Box mt={3} mb={3}>
                <Typography align='center' color='textSecondary'>
                  OR
                </Typography>
              </Box>
              <SocialLogin register={true} />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
