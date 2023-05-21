import { Box, CSSObject, keyframes, styled } from '@mui/material';

const placeholderElementStyles: CSSObject = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: `300% 300%`,
};

const gradientColors = 'rgba(0,0,0,0) 20%, rgba(150,150,150,0.3) 50%, rgba(0,0,0,0) 80%';

export const StyledGradient1 = styled(Box)(({ theme }) => ({
  background: `linear-gradient(${gradientColors})`,
  animation: `${gradient1} 2.5s infinite`,
  ...placeholderElementStyles,
}));

export const StyledGradient2 = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${gradientColors})`,
  animation: `${gradient2} 2.5s infinite`,
  ...placeholderElementStyles,
}));

const gradient1 = keyframes`
0%{
  background-position: 0% 0%;
}
25%{
  background-position: 100% 100%;
}
50%{
  background-position: 100% 100%;
}
75%{
  background-position: 0% 0%;
}
100%{
  background-position: 0% 0%;
}
`;

const gradient2 = keyframes`
0%{
  background-position: 100% 100%;
}
25%{
  background-position: 100% 100%;
}
50%{
  background-position: 0% 0%;
}
75%{
  background-position: 0% 0%;
}
100%{
  background-position: 100% 100%;
}
`;
