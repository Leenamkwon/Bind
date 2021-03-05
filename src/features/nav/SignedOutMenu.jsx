import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function SignedOutMenu() {
  return (
    <>
      <ButtonGroup aria-label='button group'>
        <Button startIcon={<AccountCircleIcon />} color='inherit' variant='outlined'>
          로그인
        </Button>
        <Button startIcon={<PersonAddIcon />} color='inherit' variant='outlined'>
          계정 생성
        </Button>
      </ButtonGroup>
    </>
  );
}
