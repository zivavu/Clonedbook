import { StyledRoot, StyledToggleButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import SelectedButtonUnderline from '@/components/atoms/SelectedButtonUnderline';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { MiddleSectionProps } from './types';

const mainNavElements: {
  name: string;
  icon: IconName;
  disabled?: boolean;
}[] = [
  {
    name: 'Home',
    icon: 'house',
  },
  {
    name: 'Watch',
    icon: 'clapperboard',
    disabled: true,
  },
  {
    name: 'Groups',
    icon: 'people-group',
    disabled: true,
  },
];

export default function MiddleSection({ sx, classes, ...rootProps }: MiddleSectionProps) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState('Home');

  const handleNavChange = (name: string) => {
    setCurrentPage(name);
  };

  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      {mainNavElements.map((element) => {
        const selected = currentPage === element.name;
        return (
          <StyledToggleButton
            key={element.name}
            sx={{
              cursor: element.disabled ? 'not-allowed' : 'pointer',
            }}
            value={element.name}
            selected={selected}
            onClick={() => handleNavChange('Home')}>
            <Icon
              icon={['fas', element.icon]}
              fontSize='1.3rem'
              color={element.disabled ? theme.palette.text.disabled : theme.palette.text.primary}
            />
            {selected ? <SelectedButtonUnderline /> : null}
          </StyledToggleButton>
        );
      })}
    </StyledRoot>
  );
}
