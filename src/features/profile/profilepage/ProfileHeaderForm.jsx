import React from 'react';
import { Box, TextField, Fab } from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import { Add, Delete } from '@material-ui/icons';
import ButtonComponent from '../../../app/layout/ButtonComponent';

export default function ProfileHeaderForm({ handleEdit }) {
  const initialValues = { description: '', home: '', links: [{ text: '' }] };

  return (
    <Box mt={3}>
      <Formik initialValues={initialValues}>
        {({ values, handleChange }) => {
          console.log(values);
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
                  onChange={handleChange}
                  variant='outlined'
                  autoComplete='off'
                  label='거주지'
                  size='small'
                  style={{ marginRight: 10 }}
                />
                <FieldArray name='links'>
                  {({ push, remove }) => (
                    <>
                      {values.links.map((_, index) => (
                        <div key={index}>
                          <TextField
                            name={`links.${index}.text`}
                            onChange={handleChange}
                            variant='outlined'
                            autoComplete='off'
                            label={`링크 ${index + 1}`}
                            size='small'
                            style={{ marginRight: 5 }}
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
                              onClick={() => push({ text: '' })}
                            >
                              <Add />
                            </Fab>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </Box>
              <Box display='flex' justifyContent='flex-end'>
                <ButtonComponent variant='outlined' content='취소' onClick={() => handleEdit(false)} />
                <ButtonComponent variant='contained' content='수정' />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
