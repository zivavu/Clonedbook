import { InputAdornment, useTheme } from '@mui/material';

import { StyledRoot, StyledSearchInput } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { usersIndex } from '@/config/algolia.config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SearchPortal from './SearchPortal';
import { LeftSectionProps } from './types';

export default function LeftSection({ sx, classes, ...rootProps }: LeftSectionProps) {
  const theme = useTheme();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchPopperOpen, setSearchPopperOpen] = useState(false);
  const searchElement = useRef<HTMLDivElement | null>(null);

  const [userHits, setUserHits] = useState<string[]>([]);

  useEffect(() => {
    if (!searchTerm || !searchPopperOpen) return;

    const search = usersIndex.search as (query: string, options?: any) => Promise<any>;

    search(searchTerm, {
      attributesToRetrieve: ['objectID'],
    }).then(({ hits }) => {
      setUserHits(hits.slice(0, 15).map((hit: any) => hit.objectID));
    });
  }, [searchTerm, searchPopperOpen]);

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchPopperOpen(false);
      setUserHits([]);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <>
      <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
        <Link
          href='/'
          style={{
            height: '40px',
            paddingRight: theme.spacing(1),
          }}>
          <Image
            unoptimized
            src='/clonedbook-logo-200.png'
            width={40}
            height={40}
            alt='Site logo'
          />
        </Link>

        <StyledSearchInput
          data-testid='search-input'
          sx={{
            width: '240px',
            minWidth: searchPopperOpen ? '240px' : '40px',
            transform: searchPopperOpen
              ? 'translateX(-6px) scaleX(1.05)'
              : 'translateX(0) scaleX(1)',
            transition: 'transform 0.1s ease-in-out',
          }}
          ref={searchElement}
          size='small'
          placeholder='Search Clonedbook'
          value={searchTerm}
          onClick={() => {
            searchElement.current?.focus();
            setSearchPopperOpen(true);
          }}
          onChange={(e) => {
            if (!e.target.value) setUserHits([]);
            setSearchPopperOpen(true);
            setSearchTerm(e.target.value);
          }}
          startAdornment={
            <InputAdornment
              position='start'
              sx={{
                paddingLeft: theme.spacing(1),
                width: searchPopperOpen ? '0' : '28px',
                transform: searchPopperOpen ? 'translateX(-18px)' : 'translateX(0)',
                opacity: searchPopperOpen ? 0 : 1,
                transition: 'all 0.1s ease-in-out',
              }}>
              <Icon icon='search' fontSize={16} color={theme.palette.text.secondary} />
            </InputAdornment>
          }
        />
      </StyledRoot>
      <SearchPortal
        open={searchPopperOpen}
        setOpen={setSearchPopperOpen}
        searchElement={searchElement.current}
        userHits={userHits}
        searchTerm={searchTerm}
      />
    </>
  );
}
