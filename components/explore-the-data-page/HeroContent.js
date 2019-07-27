import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

class HeroContent extends React.Component {
  render() {
    return (
      <div>
        <p>
          This data portal enables you, the user, to filter our data sets the way you want to.{' '}
          <b>
            First, select the data set that interests you from the drop-down menu below. Next, select the filters on the
            right to customize the data set you seek.{' '}
          </b>
          For instance, filter our data to find information in a specific county, related to a specific agency, during a
          certain year or years, or by demographic characteristics.{' '}
          <b>
            The charts will change based on your selections, and also populate filtered, full data sets that you may
            then download.{' '}
          </b>
          Our raw data sets are available via data.world. TJI last updated our data sets on 7/07/2019.
        </p>
        <p>
          <i>
            *Because the charts may become very large, this page is best viewed on a desktop or laptop screen. Got
            feedback?{' '}
            <Link href="/contact">
              <a>Please let us know how we can improve.</a>
            </Link>
          </i>
        </p>
      </div>
    );
  }
}

export default HeroContent;
