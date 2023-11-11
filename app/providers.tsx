'use client';

import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import StyledComponentsRegistry from './registry';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers(props: ProvidersProps) {
  const { children } = props;
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
