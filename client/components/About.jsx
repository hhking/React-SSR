import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import { switchTitle } from '../store';

import Nav from './Nav';

const About = (props) => (
  <div>
    <Nav />
    <p>About SSR!</p>
    <p>Title data from redux: {props.title && props.title.content}</p>
    <button onClick={() => props.switchTitle('clicked')}>Click Me</button>
    <button onClick={() => props.switchTitle('changed')}>change title</button>
  </div>
);

const mapStateToProps = state => ({
  title: state.title,
});

const mapDispatchToProps = {
  switchTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(About);