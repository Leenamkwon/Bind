import React, { useMemo } from 'react';
import { Box, TextField, Fab } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

// COMPONENT
import ButtonComponent from '../../../app/layout/ButtonComponent';
import { userUpdate } from '../../../app/firestore/firestoreService';
import { matchURLRegex } from '../../../app/util/util';

export default function ProfileHeaderForm({ handleEdit, profile }) {
  const initialValues = useMemo(() => {
    return {
      description: profile?.description || '',
      home: profile?.home ?? '',
      links: profile?.links ?? [{ link: '', key: 0 }],
    };
  }, [profile?.description, profile?.home, profile?.links]);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box mt={3}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          description: Yup.string(),
          home: Yup.string(),
          links: Yup.array(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await userUpdate(values);
            enqueueSnackbar('업데이트 되었습니다.', { variant: 'success' });
          } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, isSubmitting, dirty }) => {
          console.log();
          return (
            <Form style={{ width: '100%' }}>
              <TextField
                value={values.description}
                onChange={handleChange}
                multiline={true}
                rows={2}
                name='description'
                variant='outlined'
                autoComplete='off'
                fullWidth
                label='소개'
              />
              <Box mt={2} display='flex' alignItems='center'>
                <TextField
                  name='home'
                  value={values.home}
                  onChange={handleChange}
                  variant='outlined'
                  autoComplete='off'
                  label='거주지'
                  size='small'
                  style={{ marginRight: 10 }}
                />
                <FieldArray name='links'>
                  {({ push, remove }) => (
                    <Box display='flex' alignItems='center' p={1} style={{ height: 70 }}>
                      {values.links.map((link, index) => (
                        <div key={index}>
                          <TextField
                            name={`links.${index}.link`}
                            value={link.link}
                            onChange={handleChange}
                            variant='outlined'
                            autoComplete='off'
                            label={`링크 ${index + 1}`}
                            size='small'
                            style={{ marginRight: 5 }}
                            error={link.link.length > 3 && !matchURLRegex(link.link)}
                            helperText={link.link.length > 3 && !matchURLRegex(link.link) && '유효한 URL이 아닙니다.'}
                          />
                          {values.links.length - 1 === index && index !== 0 && (
                            <Fab
                              size='small'
                              color='primary'
                              aria-label='add'
                              style={{ marginLeft: 10 }}
                              onClick={() => remove(index)}
                            >
                              <Delete />
                            </Fab>
                          )}
                          {values.links.length - 1 === index && index !== 2 && (
                            <Fab
                              size='small'
                              color='primary'
                              aria-label='add'
                              style={{ marginLeft: 10 }}
                              onClick={() => push({ link: '', key: index + 1 })}
                            >
                              <Add />
                            </Fab>
                          )}
                        </div>
                      ))}
                    </Box>
                  )}
                </FieldArray>
              </Box>
              <Box display='flex' justifyContent='flex-end'>
                <ButtonComponent variant='outlined' content='취소' onClick={() => handleEdit(false)} />
                <ButtonComponent
                  type='submit'
                  disabled={isSubmitting || !dirty}
                  loading={isSubmitting}
                  variant='contained'
                  content='수정'
                />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
