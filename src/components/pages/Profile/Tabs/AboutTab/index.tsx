import { List, Stack, Typography, useTheme } from '@mui/material';

import VerticalContentDevider from '@/components/atoms/ContentDeviders/VerticalContentDevider';
import { useState } from 'react';
import ContactAndBasicInfo from './Sections/ContactsAndBasicInfo';
import FamilyAndRelationshipsSection from './Sections/FamilyAndRelationshipsSection';
import OverviewSection from './Sections/OverviewSection';
import WorkAndEducationSection from './Sections/WorkAndEducationSection';
import { StyledListItemButton, StyledRoot } from './styles';
import { AboutTabProps, TAboutSections } from './types';

export default function AboutTab({ loggedUser, profileData, sx, ...rootProps }: AboutTabProps) {
  const theme = useTheme();
  const [currentSection, setCurrentSection] = useState<TAboutSections>('overview');
  const aboutSections: TAboutSections[] = [
    'overview',
    'contact and basic info',
    'work and education',
    'family and relationships',
  ];
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' width='100%'>
        <Stack width='max(25%, 250px)' position='relative'>
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
          <VerticalContentDevider right={0} />
        </Stack>
        <Stack>
          {currentSection === 'overview' && <OverviewSection profileData={profileData} />}
          {currentSection === 'contact and basic info' && (
            <ContactAndBasicInfo profileData={profileData} />
          )}
          {currentSection === 'work and education' && (
            <WorkAndEducationSection profileData={profileData} />
          )}
          {currentSection === 'family and relationships' && (
            <FamilyAndRelationshipsSection profileData={profileData} />
          )}
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
