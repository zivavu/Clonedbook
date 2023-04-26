import { GlobalStyles, Modal, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { FullPagePostViewProps } from './types';

export default function FullPagePostView({
  post,
  setOpen,
  sx,
  ...rootProps
}: FullPagePostViewProps) {
  const theme = useTheme();
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Modal open onClose={() => setOpen(false)}>
        <StyledRoot sx={sx} {...rootProps}></StyledRoot>
      </Modal>
    </>
  );
}
