import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import BarChart from '../charts/chartsjs/BarChart';

class Banner extends React.Component {
  render() {
    const { numDeaths, year, yearData } = this.props;
    return (
      <React.Fragment>
        <Wrapper>
          <ColumnLeft>
            <h1>
              Since 2005, <span className="text--red">{numDeaths.toLocaleString()}</span> deaths have been reported in
              Texas Custody.
            </h1>
            <div className="bar-chart bar-chart--container">
              <BarChart title="" meta={year} metaData={yearData} />
              <div className="bar-chart__title">Deaths in Custody Since 2005</div>
            </div>
          </ColumnLeft>
          <ColumnRight>
            <ChartChange>Custodial Deaths</ChartChange>
            <ChartChange>Civilians Shot by Officers</ChartChange>
            <ChartChange>Officers Shot by Civilians</ChartChange>
          </ColumnRight>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Banner;

const Wrapper = styled.div`
  order: 0;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  background: ${props => props.theme.colors.grayLightest};
  padding: 2rem;

  @media screen and (min-width: ${props => props.theme.medium}) {
    align-items: stretch;
  }
`;

const ColumnLeft = styled.div`
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 75%;
    padding-right: 2rem;
  }

  h1 {
    color: ${props => props.theme.colors.black};
    border-bottom-width: 0;
  }

  .bar-chart--container {
    width: 100%;
    height: auto;

    .bar-chart__title {
      text-align: center;
    }
  }
`;

const ColumnRight = styled.div`
  width: 100%;
  font-size: ${props => props.theme.sidebarFont__size};
  line-height: 1.25;

  @media screen and (min-width: ${props => props.theme.medium}) {
    display: flex;
    flex-flow: column;
    width: 25%;
    padding: 1rem 0 1rem 2rem;
    border-left: 1px solid ${props => props.theme.colors.black};
  }
`;

const ChartChange = styled.button`

`;