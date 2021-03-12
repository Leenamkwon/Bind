import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';

// COMPONENT
import AccountReAuth from './AccountReAuth';
import AccountCompleteAuth from './AccountCompleteAuth';
import AccountChangeSuc from './AccountChangeSuc';

export default function AccountPage() {
  const [reauthCheck, setReauthCheck] = useState(false);
  const [changeCheck, setChangeCheck] = useState(false);

  const nestedControlFlow = (...params) => {
    const [Com1, Com2, Com3, Com4] = params;
    if (reauthCheck) {
      if (changeCheck) {
        return Com3;
      } else if (!changeCheck) {
        return Com4;
      }
      return Com2;
    } else {
      return Com1;
    }
  };

  return (
    <Grid container justify='center'>
      <Grid item xs={8}>
        <Card raised={true}>
          <CardHeader
            title={nestedControlFlow('본인 인증', '개인 정보 업데이트', '개인정보 업데이트 완료', '개인 정보 업데이트')}
          />
          <CardContent>
            {reauthCheck ? (
              changeCheck ? (
                <AccountChangeSuc />
              ) : (
                <AccountCompleteAuth setChangeCheck={setChangeCheck} />
              )
            ) : (
              <AccountReAuth setReauthCheck={setReauthCheck} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
