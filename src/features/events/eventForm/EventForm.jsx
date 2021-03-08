import React from 'react';
import { Card, CardActions, CardHeader, Divider, makeStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MytextInput from '../../../app/common/form/MytextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import { categoryData, memberData } from '../../../app/api/categoryOption';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    '& .MuiFormControl-root': {
      margin: theme.spacing(0, 0, 3, 0),
    },
  },
}));

export default function EventForm() {
  const classes = useStyles();

  const initialValues = {
    title: '',
    category: '',
    member: '',
    description: '',
    city: { address: '', latLng: null },
    venue: { address: '', latLng: null },
    date: new Date(),
    like: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string('특수문자를 제외한 일반 문자만 사용 가능합니다.').required('제목은 필수 입력란 입니다.'),
    category: Yup.string().required('카테고리는 필수 선택란 입니다.'),
    member: Yup.number(),
    description: Yup.string().required('내용은 필수 입력란 입니다.'),
    city: Yup.object().shape({
      address: Yup.string().required('City required'),
      latLng: Yup.object().required('정확한 도시를 선택해주세요'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue required'),
      latLng: Yup.object().required('정확한 장소를 선택해주세요'),
    }),
    date: Yup.date().required(),
  });

  return (
    <Card>
      <CardHeader title={`새로운 이벤트 만들기`} />
      <Divider light={true} variant='middle' />
      <CardActions>
        <Formik initialValues={initialValues} validationSchema={validationSchema}>
          {({ values, handleSubmit, dirty, isValid, isSubmitting }) => {
            console.log(values);
            return (
              <Form className={classes.root}>
                <MytextInput label='제목' name='title' />
                <MySelectInput label='카테고리' name='category' option={categoryData} />
                <MySelectInput label='인원' name='member' option={memberData} />
                <MyPlaceInput label='도시' name='city' />
                <MyTextArea label='이벤트 내용' name='description' />
                <MyDateInput label='이벤트 날짜' name='date' />
              </Form>
            );
          }}
        </Formik>
      </CardActions>
    </Card>
  );
}
