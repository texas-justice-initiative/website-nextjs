'use client';

import { ThemeProvider } from 'styled-components';
import theme from '../theme';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers(props: ProvidersProps) {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
