/* global google */
import React from 'react';
import { Avatar, Card, CardActions, CardHeader, Divider, makeStyles } from '@material-ui/core';
import { EventAvailable, Send } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MytextInput from '../../../app/common/form/MytextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import ButtonComponent from '../../../app/layout/ButtonComponent';
import { categoryData, memberData } from '../../../app/api/categoryOption';

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
}));

export default function EventForm() {
  const classes = useStyles();

  const initialValues = {
    title: '',
    category: '',
    member: 1,
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
      address: Yup.string().required('도시는 필수 입력란 입니다.'),
      latLng: Yup.object().required('정확한 도시를 선택해주세요'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('장소는 필수 입력란 입니다.'),
      latLng: Yup.object().required('정확한 장소를 선택해주세요'),
    }),
    date: Yup.date(),
  });

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
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema}>
          {({ values, handleSubmit, dirty, isValid, isSubmitting }) => {
            console.log(values);
            return (
              <Form className={classes.root}>
                <MytextInput label='제목' name='title' />
                <MySelectInput label='카테고리' name='category' option={categoryData} />
                <MySelectInput label='인원' name='member' option={memberData} />
                <MyPlaceInput label='도시' name='city' />
                <MyPlaceInput
                  label='장소'
                  name='venue'
                  disabled={!values.city.latLng}
                  options={{
                    location: new google.maps.LatLng(values.city.latLng),
                    radius: 500,
                    type: ['establishment'],
                  }}
                />
                <MyTextArea label='이벤트 내용' name='description' />
                <MyDateInput label='이벤트 날짜' name='date' />
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <ButtonComponent variant='contained' loading={false} content='취소' />
                  <ButtonComponent
                    startIcon={<Send />}
                    color='primary'
                    loading={isSubmitting}
                    disabled={!isValid || !dirty || isSubmitting}
                    type='submit'
                    content='전송'
                    variant='contained'
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </CardActions>
    </Card>
  );
}
