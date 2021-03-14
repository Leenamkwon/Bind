/* global google */
import React, { useMemo, useState } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardHeader, Divider, makeStyles, Fab } from '@material-ui/core';
import { CloudUpload, EventAvailable, Send, CloudDone } from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import cuid from 'cuid';

// COMPONENT
import MytextInput from '../../../app/common/form/MytextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import ButtonComponent from '../../../app/layout/ButtonComponent';
import { categoryData, memberData } from '../../../app/api/categoryOption';
import { addEventToFirestore, updateEventThumbImg } from '../../../app/firestore/firestoreService';
import { uploadEventThumbImgStorage } from '../../../app/firestore/fireStorageService';
import { getFileExtension } from '../../../app/util/util';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    '& .MuiFormControl-root': {
      margin: theme.spacing(0, 0, 3, 0),
    },
  },
  card: {
    boxShadow: theme.shadows[7],
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function EventForm() {
  const classes = useStyles();
  const [imageFile, setImageFile] = useState({ open: false, files: [] });

  const initialValues = useMemo(
    () => ({
      title: '',
      category: '',
      member: 1,
      description: '',
      city: { address: '', latLng: null },
      date: new Date(),
    }),
    []
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string('특수문자를 제외한 일반 문자만 사용 가능합니다.').required('제목은 필수 입력란 입니다.'),
        category: Yup.string().required('카테고리는 필수 선택란 입니다.'),
        member: Yup.number(),
        description: Yup.string().required('내용은 필수 입력란 입니다.'),
        city: Yup.object().shape({
          address: Yup.string().required('도시는 필수 입력란 입니다.'),
          latLng: Yup.object().required('정확한 도시를 선택해주세요'),
        }),
        date: Yup.date(),
      }),
    []
  );

  function handleSaveImage(file) {
    setImageFile({ open: false, files: file });
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar>
            <EventAvailable color='primary' />
          </Avatar>
        }
        title={`이벤트 만들기`}
        subheader={`사람들과 활동을 시작해보세요.`}
        className={classes.root}
      />
      <Divider light={true} variant='middle' />
      <CardActions>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const event = await addEventToFirestore(values);

              if (imageFile['files'].length > 0) {
                const filename = cuid() + '.' + getFileExtension(imageFile['files'][0]?.['name']);
                const uploadTask = uploadEventThumbImgStorage(event, imageFile['files'][0], filename);
                const unsubscribe = uploadTask.on('state_changed', null, null, (complete) => {
                  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    updateEventThumbImg(event, downloadURL);
                    unsubscribe();
                    setSubmitting(false);
                  });
                });
              } else {
                setSubmitting(false);
              }
            } catch (error) {
              setSubmitting(false);
            }
          }}
        >
          {({ dirty, isValid, isSubmitting }) => {
            return (
              <Form className={classes.root}>
                <MytextInput label='제목' name='title' autoComplete='off' />
                <Box display='flex' flexWrap='wrap'>
                  <MySelectInput label='카테고리' name='category' option={categoryData} />
                  <MySelectInput label='인원' name='member' option={memberData} />
                </Box>

                <MyTextArea label='이벤트 내용' name='description' />
                <MyPlaceInput label='도시' name='city' />
                <MyDateInput label='이벤트 날짜' name='date' />

                <Fab
                  variant='extended'
                  color='primary'
                  aria-label='add'
                  onClick={() => setImageFile({ open: true, files: [] })}
                >
                  {imageFile['files'].length > 0 ? (
                    <CloudDone className={classes.margin} />
                  ) : (
                    <CloudUpload className={classes.margin} />
                  )}
                  {imageFile['files'].length > 0 ? '업로드 완료' : '이미지 업로드'}
                </Fab>
                <DropzoneDialog
                  open={imageFile.open}
                  onSave={handleSaveImage}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
                  initialFiles={[]}
                  showPreviews={true}
                  maxFileSize={3000000}
                  filesLimit={1}
                  onClose={() => setImageFile({ open: false, files: [] })}
                />

                <Box display='flex' flexDirection='row-reverse'>
                  <ButtonComponent variant='contained' loading={false} content='취소' />
                  <ButtonComponent
                    startIcon={<Send />}
                    color='primary'
                    loading={isSubmitting}
                    disabled={!isValid || !dirty || isSubmitting}
                    type='submit'
                    content='올리기'
                    variant='contained'
                  />
                </Box>
              </Form>
            );
          }}
        </Formik>
      </CardActions>
    </Card>
  );
}
