import React, { memo } from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { ArrowUpwardRounded } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { sendMessage } from '../../app/firestore/firebaseRealChat';

export default memo(function ChatLogForm({ chatId }) {
  const initialState = { chatForm: '' };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={Yup.object({ chatForm: Yup.string().min(1).required() })}
      onSubmit={async (values, { resetForm }) => {
        try {
          sendMessage(chatId, values.chatForm);
          resetForm();
        } catch (error) {}
      }}
    >
      {({ values, handleSubmit, handleChange }) => (
        <Form>
          <OutlinedInput
            name='chatForm'
            value={values.chatForm}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                return;
              }
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onChange={handleChange}
            variant='outlined'
            placeholder='문자 메세지'
            multiline={true}
            fullWidth
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={handleSubmit}>
                  {<ArrowUpwardRounded />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Form>
      )}
    </Formik>
  );
});
