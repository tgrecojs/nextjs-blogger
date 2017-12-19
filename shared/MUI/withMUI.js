import React, { Component } from 'react';
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
  ACCENT_COLOR_THREE
} from './theme';

try {
  injectTapEventPlugin();
} catch (e) {
  // Can only be called once per application lifecycle
}

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {

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
      const { userAgent } = this.props;
      const Lato = 'lato, sans-serif';
      const muiTheme = getMuiTheme(
        {
          fontFamily: Lato,
          palette: {
            primary1Color: PRIMARY_COLOR,
            primary2Color: PRIMARY_COLOR_TWO,
            primary3Color: PRIMARY_COLOR_THREE,
            accent1Color: ACCENT_COLOR_ONE,
            accent2Color: ACCENT_COLOR_TWO,
            accent3Color: ACCENT_COLOR_THREE
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
              <meta name='viewport' content='initial-scale=1.0, width=device-width' />
              <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' />
            </Head>
            <MuiThemeProvider muiTheme={muiTheme}>
             <ComposedComponent {...this.props} />
            </MuiThemeProvider>
          </div>
          )
      }
   }
      return HOC;
}

export default withMaterialUI;