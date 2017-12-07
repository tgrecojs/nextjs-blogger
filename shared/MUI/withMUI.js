import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Head from 'next/head';
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TWO,
  PRIMARY_COLOR_THREE,
  ACCENT_COLOR_ONE,
  ACCENT_COLOR_TWO,
  ACCENT_COLOR__THREE} from './theme';

try {
  injectTapEventPlugin();
} catch (e) {
  // prevent injectTapEventPlugin():
  // Can only be called once per application lifecycle
}

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {
    static propTypes = {
      userAgent: PropTypes.string
    }
    /**
     * 
     * `static`
     * The static keyword defines a static method for a class. Static methods are called without instantiating their class and cannot be called through a class instance. 
     * Static methods are often used to create utility functions for an application. 
     */

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
      const subProps = await ComposedComponent.getInitialProps(ctx)

      return {
        ...subProps,
        userAgent
      };
    }

    render() {
      const { userAgent = 'all' } = this.props;
      const Lato = '\'lato\', sans-serif';
      const muiTheme = getMuiTheme(
        {
          fontFamily: Lato,
          palette: {
            primary1Color: PRIMARY_COLOR
          },
          appBar: {
            height: 50
          }
        },
        {
          userAgent
        }
      );

      return (
        <div>
          <Head>
            <title>Nextjs Blogger</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
          </Head>
          <MuiThemeProvider muiTheme={muiTheme}>
            <ComposedComponent
              {...this.props}
            />
          </MuiThemeProvider>
        </div>
      );
    }
  };

  return HOC;
};

export default withMaterialUI;
