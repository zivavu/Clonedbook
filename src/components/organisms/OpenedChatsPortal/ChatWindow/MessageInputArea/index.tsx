import { IconButton, TextField, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import createUserChatMessage from '@/common/firebase/createData/createUserChatMessage';
import Icon from '@/components/atoms/Icon/Icon';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useForm } from 'react-hook-form';
import { MessageInputAreaProps } from './types';

export default function MessageInputArea({ chatId, sx, ...rootProps }: MessageInputAreaProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (!loggedUser) return;
    await createUserChatMessage({ chatId, senderId: loggedUser.id, text: data.messageText });
    reset();
  });
  return (
    <form style={{ display: 'contents' }}>
      <StyledRoot direction='row' sx={sx} {...rootProps}>
        <IconButton sx={{ width: '30px', height: '30px' }}>
          <Icon icon='plus-circle' fontSize='20px' />
        </IconButton>
        <TextField
          variant='outlined'
          fullWidth
          placeholder='Aa'
          multiline
          size='small'
          {...register('messageText', { required: true, maxLength: 4000 })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          sx={{
            backgroundColor: theme.palette.background.default,
            fontSize: theme.typography.subtitle2.fontSize,
            borderRadius: theme.spacing(2),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(2),
          }}
        />
      </StyledRoot>
    </form>
  );
}
