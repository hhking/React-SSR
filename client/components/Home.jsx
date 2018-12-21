import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import { switchTitle, getTodayData } from '../store';
import routes from '../routes';

import Nav from './Nav';

class Home extends Component {
  componentDidMount() {
    const { todayData = {}, getTodayData } = this.props;
    !todayData.content && getTodayData && getTodayData();
  }

  render() {
    const { todayData = {} } = this.props;
    const { category, results } = todayData.content || {};

    return (
      <div>
        <Nav />
        <p>React SSR Data Fetch Demo</p>
        <ul>
          {category && category.map((iKey) => {
            return (
              <li key={iKey}>{iKey}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// 暴露数据获取方法，用于 SSR
Home.loadData = getTodayData;

const mapStateToProps = state => ({
  title: state.title,
  todayData: state.todayData,
});

const mapDispatchToProps = {
  switchTitle,
  getTodayData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);