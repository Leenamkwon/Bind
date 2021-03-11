import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import SocialLogin from './SocialLogin';

export default function LoginFormText() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const initialValues = { email: '', password: '' };
  const validation = Yup.object({
    email: Yup.string().email('이메일 양식에 맞지 않습니다.').required('이메일을 입력해주세요.'),
    password: Yup.string().min(6, '비밀번호는 최소 6자리 이상입니다.').required('패스워드를 입력해주세요.'),
  });

  return (
    <Box mt={6} p={3}>
      <Formik initialValues={initialValues} validationSchema={validation}>
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form>
            <TextField name='email' variant='outlined' fullWidth label={<div>이메일</div>} />
            <TextField
              name='password'
              variant='outlined'
              fullWidth
              label={<div>패스워드</div>}
              style={{ margin: '25px 0 10px 0' }}
            />
            {errors.auth && <Alert severity='error'>{errors.auth}</Alert>}
            <Button type='submit' variant='contained' color='primary' size='large' style={{ width: '100%', marginTop: 10 }}>
              로그인
            </Button>
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
