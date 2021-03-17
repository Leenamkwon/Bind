import React, { useState, memo } from 'react';
import { Avatar, Box, Button, IconButton, Input, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonComponent from '../../../app/layout/ButtonComponent';
import { addEventChatComment } from '../../../app/firestore/firebaseEventChat';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    padding: theme.spacing(1),
    width: '100%',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  input: {
    paddingLeft: theme.spacing(1),
    width: '100%',
    height: '100%',
  },
  button: {
    marginLeft: 'auto',
    display: 'block',
  },
}));

export default memo(function EventDetailedChatForm({ eventId, parentId, setReply }) {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);

  function handleFocus() {
    setFocus(true);
  }

  function closeChatForm() {
    if (parentId === 0) {
      setFocus(false);
    } else {
      setReply({ target: null, open: false });
    }
  }

  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{ comment: '', parentId }}
        validationSchema={Yup.object({
          comment: Yup.string().min(1, '1').required(),
        })}
        onSubmit={async (value, { setSubmitting, resetForm }) => {
          try {
            await addEventChatComment(eventId, value);
            resetForm({ comment: '' });
            setFocus(false);
            setSubmitting(false);
          } catch (error) {}
        }}
      >
        {({ isSubmitting, handleSubmit, isValid, handleChange, values, handleBlur }) => {
          return (
            <Form>
              <Box display='flex' alignItems='center'>
                <IconButton size='small'>
                  <Avatar className={clsx({ [classes.small]: parentId })} />
                </IconButton>
                <Input
                  name='comment'
                  value={values.comment}
                  className={classes.input}
                  placeholder='공개 댓글 추가...'
                  autoComplete='off'
                  multiline={true}
                  onFocus={handleFocus}
                  onBlur={(e) => {
                    handleBlur(e);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.shiftKey) {
                      return;
                    }
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      isValid && handleSubmit();
                    }
                  }}
                  onChange={handleChange}
                />
              </Box>

              <Box display='flex' justifyContent='flex-end' mt={1} style={{ display: focus ? 'flex' : 'none' }}>
                <ButtonComponent
                  onClick={() => closeChatForm()}
                  loading={false}
                  content='취소'
                  type='button'
                  color='inherit'
                />
                <ButtonComponent
                  onClick={() => handleSubmit()}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  content='전송'
                  type='submit'
                  variant='contained'
                />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
});
