import React, { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

// COMPONENT
import ButtonComponent from '../../app/layout/ButtonComponent';
import { reauthFirebase } from '../../app/firestore/firebaseService';

export default function AccountReAuth({ setReauthCheck }) {
  const { currentUser, authenticated } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = useMemo(() => ({ email: '', password: '' }), []);
  const validation = useMemo(
    () =>
      Yup.object({
        email: Yup.string().email('이메일 양식에 맞지 않습니다.').required('이메일을 입력해주세요.'),
        password: Yup.string().min(6, '비밀번호는 최소 6자리 이상입니다.').required('패스워드를 입력해주세요.'),
      }),
    []
  );

  if (!currentUser && !authenticated) return <Redirect to='/' />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const user = await reauthFirebase(values);
          if (user && user.operationType === 'reauthenticate') {
            enqueueSnackbar('본인 인증을 완료하였습니다.', { variant: 'success' });
            setReauthCheck(true);
          }

          setSubmitting(false);
        } catch (error) {
          setErrors({ auth: '이메일 또는 비밀번호가 맞지 않습니다.' });
          setSubmitting(false);
        }
      }}
    >
      {({ handleChange, handleBlur, isSubmitting, errors, touched }) => (
        <Form>
          <TextField
            type='email'
            name='email'
            variant='outlined'
            fullWidth
            label='이메일'
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
            disabled={isSubmitting}
            loading={isSubmitting}
            content='본인 인증'
            fullWidth
          />
        </Form>
      )}
    </Formik>
  );
}
