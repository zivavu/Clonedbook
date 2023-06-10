import { Button, IconButton, Stack, Typography, darken, lighten, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/Link';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useUserDataByIdQuery } from '@/redux/services/userDataAPI';
import { ITimestamp } from '@/types/timestamp';
import { TUserSex } from '@/types/user';
import { useEffect, useRef, useState } from 'react';
import { TextAccountDetailProps } from '../../types';
import { StyledEditInput, StyledTextDetailValue } from './styles';

export default function TextAccountDetail<T = ITimestamp | TUserSex | string>({
  userId,
  accountDetail,
  CustomEditComponent,
  iconSize = 24,
  showPlaceholder = true,
  preventEdit = false,
  allowWrap,
  editHandler,
  sx,
  ...rootProps
}: TextAccountDetailProps<T>) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  //It's used only in edit mode(when logged user is owner of the account)
  const { refetch: refetchLoggedUser } = useUserDataByIdQuery(loggedUser?.id || '');

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [editInputValue, setEditInputValue] = useState<T | undefined>();

  const inputTextFieldRef = useRef<HTMLInputElement | undefined>();

  useEffect(() => {
    if (inputTextFieldRef.current) {
      inputTextFieldRef.current.focus();
    }
    setEditInputValue(accountDetail.value as T);
  }, [isInEditMode]);

  const isOwner = loggedUser?.id === userId;

  const { icon, label, value, valueLink } = accountDetail;
  const placeholder = accountDetail.placeholder || "Didn't specified";
  if ((!value && !showPlaceholder) || (!value && !isOwner && !preventEdit)) return null;

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={0.5}
      paddingRight={2}
      height={isOwner && !preventEdit ? '40px' : 'auto'}
      sx={sx}
      {...rootProps}>
      <Icon
        icon={icon}
        style={{ minWidth: '36px' }}
        fontSize={iconSize}
        color={theme.palette.grey['500']}
      />

      {!isInEditMode && (
        <>
          <Typography
            variant='subtitle2'
            color={
              showPlaceholder && !value ? theme.palette.text.secondary : theme.palette.text.primary
            }
            sx={{
              whiteSpace: 'nowrap',
            }}
            fontWeight='360'
            pl={0.5}>
            {showPlaceholder && !value ? placeholder : label}
          </Typography>

          {valueLink ? (
            <Link href={valueLink}>
              <StyledTextDetailValue
                variant='subtitle2'
                fontWeight='500'
                sx={{
                  whiteSpace: allowWrap ? 'break-spaces' : 'nowrap',
                }}>
                {value}
              </StyledTextDetailValue>
            </Link>
          ) : (
            <StyledTextDetailValue
              variant='subtitle2'
              fontWeight='500'
              sx={{
                whiteSpace: allowWrap ? 'break-spaces' : 'nowrap',
              }}>
              {value}
            </StyledTextDetailValue>
          )}
        </>
      )}
      {isInEditMode && (
        <Stack direction='row' width='100%' spacing={1} alignItems='center'>
          {CustomEditComponent ? (
            <CustomEditComponent setEditInputValue={setEditInputValue} initialValue={value as T} />
          ) : (
            <StyledEditInput
              size='medium'
              variant='outlined'
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value as T)}
              label={label}
              inputRef={inputTextFieldRef}
            />
          )}

          <Button
            variant='contained'
            onClick={async () => {
              if (editHandler && editInputValue) {
                await editHandler(editInputValue);
                refetchLoggedUser();
              }
              setIsInEditMode(false);
            }}
            sx={{
              padding: theme.spacing(1, 3),
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? darken(theme.palette.primary.main, 0.1)
                    : lighten(theme.palette.primary.main, 0.1),
              },
            }}>
            Save
          </Button>
          <Button
            onClick={() => setIsInEditMode(false)}
            variant='contained'
            sx={{
              padding: theme.spacing(1, 3),
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? darken(theme.palette.secondary.main, 0.1)
                    : lighten(theme.palette.secondary.main, 0.1),
              },
            }}>
            Cancel
          </Button>
        </Stack>
      )}

      {isOwner && !preventEdit && !isInEditMode && (
        <IconButton
          onClick={() => {
            setIsInEditMode((prev) => !prev);
          }}
          sx={{ marginLeft: 'auto !important' }}>
          <Icon icon='pen-to-square' fontSize={iconSize - 2} color={theme.palette.grey['500']} />
        </IconButton>
      )}
    </Stack>
  );
}
