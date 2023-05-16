import { ToggleButtonGroup, Typography, useTheme } from '@mui/material';

import { StyledRoot, StyledToggleButton } from './styles';

import SelectedButtonUnderline from '@/components/atoms/SelectedButtonUnderline';
import { useState } from 'react';
import { TProfileTabs } from '../types';
import { ProfileTabToggleGroupProps } from './types';

export default function ProfileTabToggleGroup({ sx, ...rootProps }: ProfileTabToggleGroupProps) {
  const theme = useTheme();

  const tabs: TProfileTabs[] = ['posts', 'about', 'friends', 'photos', 'music', 'likes'];
  const [selectedTab, setSelectedTab] = useState<TProfileTabs>('posts');
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ToggleButtonGroup
        exclusive
        value={selectedTab}
        onChange={(e, value) => setSelectedTab(value)}>
        {tabs.map((tab) => (
          <StyledToggleButton key={tab} value={tab}>
            <Typography variant='subtitle2' fontWeight={500} textTransform='capitalize'>
              {tab}
            </Typography>
            {selectedTab === tab && <SelectedButtonUnderline />}
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>
    </StyledRoot>
  );
}
