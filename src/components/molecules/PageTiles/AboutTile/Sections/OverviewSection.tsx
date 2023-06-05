import BornIn from '@/components/atoms/accountDetails/detailCategories/BornIn';
import GoesTo from '@/components/atoms/accountDetails/detailCategories/GoesTo';
import LivesIn from '@/components/atoms/accountDetails/detailCategories/LivesIn';
import Relationship from '@/components/atoms/accountDetails/detailCategories/Relationship';
import WorksAt from '@/components/atoms/accountDetails/detailCategories/WorksAt';
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
