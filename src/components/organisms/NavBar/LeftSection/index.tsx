import { InputAdornment, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import Icon from '@/components/atoms/Icon/Icon';
import { AlgoliaMock, searchClient } from '@/config/algolia.config';
import SearchPortal from './SearchPortal';
import { StyledRoot, StyledSearchInput } from './styles';
import { LeftSectionProps } from './types';

const MAX_SEARCH_RESULTS = 15;

interface IAlgoliaHit {
  objectID: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  pictureUrl?: string;
}

interface IAlgoliaSearchResponse {
  hits: IAlgoliaHit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  query: string;
}

export default function LeftSection({ sx, classes, ...rootProps }: LeftSectionProps) {
  const theme = useTheme();
  const router = useRouter();
  const searchElement = useRef<HTMLDivElement | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchPopperOpen, setSearchPopperOpen] = useState(false);
  const [userHits, setUserHits] = useState<string[]>([]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query || !searchPopperOpen) {
        setUserHits([]);
        return;
      }

      try {
        const response = (await (searchClient as AlgoliaMock).search(query, {
          attributesToRetrieve: ['objectID'],
        })) as IAlgoliaSearchResponse;

        setUserHits(
          response.hits.slice(0, MAX_SEARCH_RESULTS).map((hit: IAlgoliaHit) => hit.objectID),
        );
      } catch (error) {
        console.error('Search failed:', error);
        setUserHits([]);
      }
    },
    [searchPopperOpen],
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchPopperOpen(false);
      setUserHits([]);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchPopperOpen(true);
  };

  const handleSearchInputClick = () => {
    searchElement.current?.focus();
    setSearchPopperOpen(true);
  };

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
          onClick={handleSearchInputClick}
          onChange={handleSearchInputChange}
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
