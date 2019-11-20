import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Primary from '../components/Primary';
import AboutSidebar from '../components/AboutSidebar';

const pageTitle = 'Thanks!';

const Thanks = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>{pageTitle}</h1>
      <p>
        As a non-profit organization, putting together an initiative like TJI wouldn't be possible without the generous
        support of so many different people. We would like to thank all of those who have helped us make this possible.
        If you would like to contribute, or have an idea or creative talent you can provide to TJI, please feel free to
        reach out!
      </p>
      <h2>Logo Design</h2>
      <p>
        A big thanks to Anica Jorgan from{' '}
        <a href="https://austinlogodesigns.com/" target="_blank" rel="noopener noreferrer">
          Austin Logo Designs
        </a>{' '}
        for the beautiful Texas Justice Initiative logo!
      </p>
      <h2>Icons</h2>
      <Icons>
        <li>
          Icons on the main page made by
          <a title="Gregor Cresnar" href="https://www.flaticon.com/authors/gregor-cresnar">
            Gregor Cresnar
          </a>{' '}
          and{' '}
          <a title="Pixel perfect" href="https://www.flaticon.com/authors/pixel-perfect">
            Pixel perfect
          </a>{' '}
          from{' '}
          <a title="Flaticon" href="https://www.flaticon.com/">
            www.flaticon.com,
          </a>{' '}
          licensed by{' '}
          <a
            title="Creative Commons BY 3.0"
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC 3.0
          </a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=%E2%80%98person%E2%80%99&amp;creator=1840742&amp;i=883979">
            ‘person’ icon
          </a>{' '}
          by Gan Khoon Lay from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=cop&amp;creator=1840742&amp;i=2740666">‘cop’ icon</a> by Gan
          Khoon Lay from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=%E2%80%98jail%E2%80%99&amp;i=1673366">‘jail’ icon</a> by SBTS
          from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=%E2%80%98institution%E2%80%99&amp;i=43313">
            ‘institution’ icon
          </a>{' '}
          by Loïc Poivet from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=%E2%80%98explosion%E2%80%99&amp;i=2733102">‘explosion’ icon</a>{' '}
          by Abdul Wahhab from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=%E2%80%98PDF%E2%80%99&amp;i=323801">‘PDF’ icon</a>
          by Alfredo @ IconsAlfredo.com from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=data%20entry&amp;i=977713">‘data entry’ icon</a> by Gan Khoon
          Lay from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=update&amp;creator=2168492&amp;i=1290740">‘updates’ icon</a> by
          Maxim Basinski from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=data%20cleaning&amp;i=2228139">‘data cleaning’ icon</a> by
          Chanut is Industries from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=data%20world&amp;i=1926731">‘Cloud’ icon</a> by Eucalyp from{' '}
          <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=word%20to%20excel&amp;i=193096">‘Word to Excel’ icon</a> by
          Hakan Yalcin from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=upload&amp;creator=753582&amp;i=148000">‘Upload’ icon</a> by
          Gregor Cresnar from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=analytics&amp;creator=753582&amp;i=158271">‘analytics’ icon</a>{' '}
          by Gregor Cresnar from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=data&amp;creator=4478358&amp;i=2698239">‘Data’ icon</a> by
          Flatart from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
        <li>
          <a href="https://thenounproject.com/search/?q=spreadsheet&amp;i=968519">‘spreadsheet’ icon</a> by Jamison
          Wieser from <a href="https://thenounproject.com/">the Noun Project</a>, licensed by{' '}
          <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">CC 3.0.</a>
        </li>
      </Icons>
    </Primary>

    <AboutSidebar />
  </React.Fragment>
);
export default Thanks;

const Icons = styled.ul`
  li {
    margin: 1em 0;
  }
`;
