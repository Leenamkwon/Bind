import React, { memo, useState } from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { ArrowUpwardRounded } from '@material-ui/icons';

export default memo(function ChatLogForm({ chatId }) {
  const [value, setValue] = useState('');

  console.log(chatId);

  return (
    <form>
      <OutlinedInput
        value={value}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && e.shiftKey) {
            return;
          }
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
          }
        }}
        onChange={(e) => setValue(e.target.value)}
        variant='outlined'
        placeholder='문자 메세지'
        multiline
        fullWidth
        endAdornment={
          <InputAdornment position='end'>
            <IconButton edge='end'>{<ArrowUpwardRounded />}</IconButton>
          </InputAdornment>
        }
      />
    </form>
  );
});
