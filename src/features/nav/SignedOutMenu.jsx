import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { AccountCircle, PersonAdd } from '@material-ui/icons';
import { useToggleClick } from '../../app/hooks/useToggleClick';
import ModalWrapper from '../../app/common/modal/ModalWrapper';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../../app/common/modal/modalReducer';

export default function SignedOutMenu() {
  const dispatch = useDispatch();
  const [loginModalOpen, setLoginModalOpen] = useToggleClick(false);

  return (
    <>
      <ButtonGroup aria-label='button group' size='small'>
        <Button
          onClick={() => dispatch(modalOpen('LoginForm'))}
          startIcon={<AccountCircle />}
          color='inherit'
          variant='outlined'
        >
          로그인
        </Button>
        <Button
          onClick={() => dispatch(modalOpen('RegisterForm'))}
          startIcon={<PersonAdd />}
          color='inherit'
          variant='outlined'
        >
          계정 생성
        </Button>
        <ModalWrapper />
      </ButtonGroup>
    </>
  );
}
