import React from 'react';
import Helmet from 'react-helmet';

import Nav from './Nav';

const Page = () => (
  <div>
    <Nav />
    <p>Page SSR, with router</p>
    <p>Document head manager with Helmet</p>
    <Helmet>
      <title>Page SSR title set by Helmet</title>
      <meta name="description" content="This is React SSR demo!"/>
    </Helmet>
  </div>
);

export default Page;