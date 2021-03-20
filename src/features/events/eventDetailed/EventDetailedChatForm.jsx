import React, { useState, memo, useCallback } from 'react';
import { Avatar, Box, IconButton, Input, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { addEventChatComment, updateChatComment } from '../../../app/firestore/firebaseEventChat';
import ButtonComponent from '../../../app/layout/ButtonComponent';

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

export default memo(function EventDetailedChatForm({ eventId, parentId, setReply, reply }) {
  const classes = useStyles();
  const [focus, setFocus] = useState(() => (parentId ? true : false));

  function test() {
    switch (reply?.type) {
      case 'edit':
        return reply.text;
      default:
        return '';
    }
  }

  function handleFocus() {
    setFocus(true);
  }

  const closeChatForm = useCallback(() => {
    if (parentId === 0) {
      setFocus(false);
    } else {
      setReply({ target: null, open: false, type: 'write', text: '' });
    }
  }, [parentId, setReply]);

  const handleSubmitChat = useCallback(
    async (value, { setSubmitting, resetForm }) => {
      try {
        if (parentId !== 0 && reply.type === 'edit') {
          await updateChatComment(eventId, reply.target, value.comment);
        } else {
          await addEventChatComment(eventId, value);
          resetForm({ comment: '' });
        }
        closeChatForm();
        setFocus(false);
        setSubmitting(false);
      } catch (error) {}
    },
    [closeChatForm, eventId, parentId, reply]
  );

  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{ comment: test(), parentId }}
        validationSchema={Yup.object({
          comment: Yup.string().min(1, '1').required(),
        })}
        onSubmit={handleSubmitChat}
      >
        {({ isSubmitting, handleSubmit, isValid, handleChange, values, handleBlur }) => {
          return (
            <Form>
              <Box display='flex' alignItems='center'>
                <IconButton size='small'>
                  <Avatar className={clsx({ [classes.small]: parentId })} />
                </IconButton>
                <Input
                  autoFocus={!!parentId}
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
                  color='primary'
                />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
});
