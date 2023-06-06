import { IconButton, Stack, Typography, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/Link';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useEffect, useRef, useState } from 'react';
import { TextAccountDetailProps } from '../../types';
import { StyledEditInput, StyledTextDetailValue } from './styles';

export default function TextAccountDetail({
  userId,
  accountDetail,
  iconSize = 24,
  showPlaceholder = true,
  preventEdit = false,
  allowWrap,
  sx,
  ...rootProps
}: TextAccountDetailProps) {
  const theme = useTheme();
  const { data: loggedUser } = useLoggedUserQuery({});
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(accountDetail.value);

  const inputTextFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputTextFieldRef.current) {
      inputTextFieldRef.current.focus();
    }
    setEditInputValue(accountDetail.value);
  }, [isInEditMode]);

  const isOwner = loggedUser?.id === userId;

  const { icon, label, value, valueLink } = accountDetail;
  const placeholder = accountDetail.placeholder || "Didn't specified";
  if ((!value && !showPlaceholder) || (!isOwner && preventEdit)) return null;

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
        <>
          <StyledEditInput
            size='medium'
            variant='outlined'
            value={editInputValue}
            onChange={(e) => setEditInputValue(e.target.value)}
            label={label}
            inputRef={inputTextFieldRef}
          />
        </>
      )}

      {isOwner && !preventEdit && (
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
