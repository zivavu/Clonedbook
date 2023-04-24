import { StyledRoot, StyledToggleButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import SelectedButtonUnderline from '@/components/atoms/SelectedButtonUnderline';
import { AddUsersButton } from '@/utils/generateRandomUsers';
import { useState } from 'react';
import { MiddleSectionProps } from './types';

const mainNavElements = [
  {
    name: 'Home',
    icon: 'house',
  },
  {
    name: 'Watch',
    icon: 'clapperboard',
  },
  {
    name: 'Groups',
    icon: 'people-group',
  },
];

export default function MiddleSection({ sx, classes, ...rootProps }: MiddleSectionProps) {
  const [currentPage, setCurrentPage] = useState('Home');

  const handleNavChange = (name: string) => {
    setCurrentPage(name);
  };

  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <AddUsersButton />
      {mainNavElements.map((element) => {
        const selected = currentPage === element.name;
        return (
          <StyledToggleButton
            key={element.name}
            value={element.name}
            selected={selected}
            onClick={() => handleNavChange(element.name)}
          >
            <Icon icon={['fas', element.icon] as never} fontSize='1.3rem'></Icon>
            {selected ? <SelectedButtonUnderline /> : null}
          </StyledToggleButton>
        );
      })}
    </StyledRoot>
  );
}
