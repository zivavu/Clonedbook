import { generateUsersAndPostToDb } from '@/utils/generateRandomUsers';
import { Button, Typography } from '@mui/material';
import { StyledRoot } from './styles';
import { ContactsSidebarProps } from './types';
export default function ContactsSidebar({ ...rootProps }: ContactsSidebarProps) {
  return (
    <StyledRoot {...rootProps}>
      <Typography>ContactsSidebar</Typography>
      <Button onClick={() => generateUsersAndPostToDb(80, 60)}>AddEm</Button>
    </StyledRoot>
  );
}
