import Home from './components/Home';
import About from './components/About';
import Page from './components/Page';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/page',
    component: Page,
    exact: true,
  },
];