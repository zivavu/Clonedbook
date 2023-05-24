import BornIn from '@/components/atoms/AccountDetaills/DetailCategories/BornIn';
import GoesTo from '@/components/atoms/AccountDetaills/DetailCategories/GoesTo';
import LivesIn from '@/components/atoms/AccountDetaills/DetailCategories/LivesIn';
import Relationship from '@/components/atoms/AccountDetaills/DetailCategories/Relationship';
import WorksAt from '@/components/atoms/AccountDetaills/DetailCategories/WorksAt';
import { SectionRoot } from '../styles';
import { SectionProps } from '../types';

export default function OverviewSection({ profileData, sx, ...rootProps }: SectionProps) {
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={3} my={2}>
      <WorksAt userData={profileData} />
      <GoesTo userData={profileData} />
      <LivesIn userData={profileData} />
      <BornIn userData={profileData} />
      <Relationship userData={profileData} />
    </SectionRoot>
  );
}
