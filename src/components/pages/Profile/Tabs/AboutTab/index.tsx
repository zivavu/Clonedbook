import { List, Stack, Typography, useTheme } from '@mui/material';

import { useState } from 'react';
import { StyledListItemButton, StyledRoot } from './styles';
import { AboutTabProps, TAboutSections } from './types';

export default function AboutTab({ loggedUser, profileData, sx, ...rootProps }: AboutTabProps) {
  const theme = useTheme();
  const [currentSection, setCurrentSection] = useState<TAboutSections>('overview');
  const aboutSections: TAboutSections[] = [
    'overview',
    'work and education',
    'places lived',
    'family and relationships',
  ];
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' width='100%'>
        <Stack width='max(25%, 250px)'>
          <Typography ml={theme.spacing(2)} mt={theme.spacing(1.5)} variant='h5' fontWeight={640}>
            About
          </Typography>
          <List sx={{ paddingX: 1 }}>
            {aboutSections.map((name) => (
              <StyledListItemButton
                key={name}
                selected={name === currentSection}
                onClick={() => setCurrentSection(name)}>
                <Typography
                  variant='subtitle2'
                  color={theme.palette.text.secondary}
                  fontWeight={500}
                  textTransform='capitalize'>
                  {name}
                </Typography>
              </StyledListItemButton>
            ))}
          </List>
        </Stack>
        <Stack></Stack>
      </Stack>
    </StyledRoot>
  );
}
