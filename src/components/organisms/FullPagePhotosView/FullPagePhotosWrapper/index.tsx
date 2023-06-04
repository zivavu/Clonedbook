import { GlobalStyles, Portal } from '@mui/material';

import { StyledRoot } from './styles';

import TopBar from '../TopBar';
import { FullPagePhotosWrapperProps } from './types';

/**
 * @description A wrapper for all FullPagePhotosDisplay components.
 *  Designed to take PhotosCarousel and ElementInfo components as children
 */

export default function FullPagePhotosWrapper({
  setOpen,
  children,
  sx,
  ...rootProps
}: FullPagePhotosWrapperProps) {
  return (
    <>
      <GlobalStyles styles={{ body: { overflowY: 'hidden !important' } }} />
      <Portal>
        <StyledRoot {...rootProps} sx={sx}>
          <TopBar setOpen={setOpen} />
          {children}
        </StyledRoot>
      </Portal>
    </>
  );
}
