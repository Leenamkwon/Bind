import React, { useState } from 'react';
import { Avatar, Box, IconButton, Input, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonComponent from '../../../app/layout/ButtonComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    padding: theme.spacing(1),
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

export default function EventDetailedChatForm({ parentId = 0 }) {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);

  function handleFocus() {
    setFocus(true);
  }

  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{ comment: '', parentId }}
        validationSchema={Yup.object({
          comment: Yup.string().min(1, '1').required(),
        })}
        onSubmit={(value, { setSubmitting, resetForm }) => {}}
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
                  className={classes.input}
                  placeholder='공개 댓글 추가...'
                  autoComplete='off'
                  multiline={true}
                  onFocus={handleFocus}
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocus(false);
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

              {focus && (
                <Box display='flex' justifyContent='flex-end' mt={1}>
                  <ButtonComponent
                    onClick={() => setFocus(false)}
                    loading={false}
                    content='취소'
                    type='button'
                    color='inherit'
                  />
                  <ButtonComponent
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    content='전송'
                    type='submit'
                    variant='contained'
                  />
                </Box>
              )}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
