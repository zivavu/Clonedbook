import { Shadows } from '@mui/material';
const getShadowBaseColor = (mode: 'light' | 'dark', opacity: number) => {
  return mode === 'light' ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`;
};

export const getCustomShadows = (mode: 'light' | 'dark') => {
  const shadows = Array(25).fill('none') as Shadows;
  shadows[1] = `${getShadowBaseColor(mode, 0.1)} 0px 1px 2px 0px`;
  shadows[2] = `${getShadowBaseColor(mode, 0.15)} 0px 1px 2px 0px`;
  shadows[3] = `${getShadowBaseColor(mode, 0.2)} 0px 1px 2px 0px`;
  shadows[4] = `${getShadowBaseColor(mode, 0.2)} 0px 1px 2px 0px`;
  shadows[5] = `${getShadowBaseColor(mode, 0.2)} 0px 1px 2px 0px`;
  shadows[7] = `${getShadowBaseColor(mode, 0.2)} 0px 1px 3px 0px`;
  shadows[8] = `${getShadowBaseColor(mode, 0.2)} 0px 1px 3px 0px`;
  shadows[9] = `${getShadowBaseColor(mode, 0.15)} 0px 0px 5px 0px`;
  shadows[10] = `${getShadowBaseColor(mode, 0.4)} 0px 1px 4px 0px`;
  shadows[11] = `${getShadowBaseColor(mode, 0.4)} 0px 1px 4px 0px`;
  shadows[12] = `${getShadowBaseColor(mode, 0.4)} 0px 1px 4px 0px`;
  shadows[13] = `${getShadowBaseColor(mode, 0.4)} 0px 1px 4px 0px`;
  shadows[14] = `${getShadowBaseColor(mode, 0.2)} 0px 12px 28px 0px,
  ${getShadowBaseColor(mode, 0.1)} 0px 2px 4px 0px,
  rgba(255,255,255,0.5) 0px 0px 0px 1px inset`;

  return shadows;
};
