import AccountDetailCategory from '@/components/atoms/accountDetails/AccountDetailCategory';
import { SectionRoot } from '../styles';
import { SectionProps } from '../types';

export default function OverviewSection({ profileData, sx, ...rootProps }: SectionProps) {
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={3} my={2}>
      <AccountDetailCategory detailType='worksAt' userData={profileData} />
      <AccountDetailCategory detailType='goesTo' userData={profileData} />
      <AccountDetailCategory detailType='livesIn' userData={profileData} />
      <AccountDetailCategory detailType='bornin' userData={profileData} />
      <AccountDetailCategory detailType='relationship' userData={profileData} />
    </SectionRoot>
  );
}
