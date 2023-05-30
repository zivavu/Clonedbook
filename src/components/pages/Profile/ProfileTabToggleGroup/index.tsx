import { ToggleButtonGroup, Typography } from '@mui/material';

import { StyledRoot, StyledToggleButton } from './styles';

import SelectedButtonUnderline from '@/components/atoms/SelectedButtonUnderline';
import { TProfileTabs } from '../types';
import { ProfileTabToggleGroupProps } from './types';

export default function ProfileTabToggleGroup({
  selectedTab,
  setSelectedTab,
  sx,
  ...rootProps
}: ProfileTabToggleGroupProps) {
  const tabs: TProfileTabs[] = ['posts', 'about', 'friends', 'photos', 'music', 'likes'];
  const disabledTabs: TProfileTabs[] = ['music', 'likes'];
  function handleTabSelection(tab: TProfileTabs) {
    if (tab === selectedTab) return;
    setSelectedTab(tab);
  }
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ToggleButtonGroup exclusive value={selectedTab}>
        {tabs.map((tab) => {
          const isDistabled = disabledTabs.includes(tab);
          return (
            <StyledToggleButton
              key={tab}
              value={tab}
              disabled={isDistabled}
              onClick={(e, value) => handleTabSelection(value)}>
              <Typography variant='subtitle2' fontWeight={500} textTransform='capitalize'>
                {tab}
              </Typography>
              {selectedTab === tab && <SelectedButtonUnderline />}
            </StyledToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </StyledRoot>
  );
}
