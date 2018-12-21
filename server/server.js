import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import createStore, { switchTitle } from '../client/store';
import routes from '../client/routes';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get("/*", (req, res) => {
    const context = {};
    // 服务端 store
    const store = createStore();

    store.dispatch(switchTitle("init ssr title"));

    const dataRequirements = 
        routes
            .filter(route => matchPath(req.url, route)) // 路由匹配
            .map(route => route.component)              // 路由对应的组件
            .filter(component => component.loadData)    //查找组件中暴露的数据获取方法
            .map(component => store.dispatch(component.loadData()));

    // console.log(routes, req.url);
    // console.log(dataRequirements);
    Promise.all(dataRequirements).then(() => {
        const jsx = (
            <Provider store={store}>
                <StaticRouter context={context} location={req.url}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>
        );
        const reactDom = renderToString(jsx);
        const reduxState = store.getState();
        const helmetData = Helmet.renderStatic();
    
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(htmlTemplate(reactDom, reduxState, helmetData));
    });
});

app.listen(3000, () => {
  console.log('Listening on port 3000: http://localhost:3000')
});

function htmlTemplate(reactDom, reduxState, helmetData) {
  return `
      <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${helmetData.title.toString() && "<title>React SSR</title>"}
            ${helmetData.meta.toString()}
            <script>
                window.REDUX_DATA = ${JSON.stringify(reduxState)}
            </script>
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}