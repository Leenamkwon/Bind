import React, { useMemo } from 'react';
import { TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

// COMPONENT
import ButtonComponent from '../../app/layout/ButtonComponent';
import { emailAndPasswordChange, signOutFirebase } from '../../app/firestore/firebaseService';

export default function AccountCompleteAuth({ setChangeCheck }) {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = useMemo(() => ({ email: '', password: '', confirmPassword: '' }), []);
  const validation = useMemo(
    () =>
      Yup.object({
        email: Yup.string().email('이메일 양식에 맞지 않습니다.'),
        password: Yup.string().min(6, '비밀번호는 최소 6자리 이상입니다.'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], '1차 패스워드와 맞지 않습니다'),
      }),
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          await emailAndPasswordChange(values);
          enqueueSnackbar('계정이 업데이트 되었습니다', { variant: 'success' });
          setSubmitting(false);
          setChangeCheck(true);
          resetForm();
          signOutFirebase();
        } catch (error) {
          setErrors({ auth: error.message });
        }
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, errors, touched, dirty }) => (
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
            value={values.email}
            autoComplete='off'
          />
          <TextField
            type='password'
            name='password'
            variant='outlined'
            fullWidth
            label='패스워드'
            style={{ margin: '10px 0 0 0' }}
            helperText={errors.password}
            error={touched.password && !!errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <TextField
            type='password'
            name='confirmPassword'
            variant='outlined'
            fullWidth
            label='패스워드 확인'
            style={{ margin: '10px 0 10px 0' }}
            helperText={errors.confirmPassword}
            error={touched.confirmPassword && !!errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
          {errors.auth && <Alert severity='error'>{errors.auth}</Alert>}
          <ButtonComponent
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            css={{ width: '100%', margin: 0 }}
            disabled={isSubmitting || !dirty || !values}
            loading={isSubmitting}
            content='업데이트'
            fullWidth
          />
          <Typography color='textSecondary' variant='subtitle2'>
            변경하고 싶지 않은 양식은 빈 상태로 하시면 됩니다.
          </Typography>
        </Form>
      )}
    </Formik>
  );
}
