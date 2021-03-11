import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../../features/auth/LoginForm';

export default memo(function ModalManager() {
  const { open, component } = useSelector((state) => state.modal);
  let Component;

  const modal = useMemo(
    () => ({
      LoginForm: LoginForm,
    }),
    []
  );

  if (open && component) {
    let temp = modal[component];
    Component = temp;
  } else {
    Component = null;
  }

  return <>{open ? <Component /> : null}</>;
});
