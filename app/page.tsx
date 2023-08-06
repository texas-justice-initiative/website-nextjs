import React from 'react';
import Homepage from './home-page';

export const metadata = {
  title: 'Home Page',
  description:
    'Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas.',
};

export default function Page() {
  return <Homepage />;
}
