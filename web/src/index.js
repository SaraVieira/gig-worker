import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import Routes from 'src/Routes'

import history from './utils/history'
import config from './auth_config.json'
import { Auth0Provider } from './react-auth0-spa'

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

import './index.css'
import customTheme from './utils/theme'

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <ThemeProvider theme={customTheme}>
      <>
        <CSSReset />
        <FatalErrorBoundary page={FatalErrorPage}>
          <RedwoodProvider>
            <Routes />
          </RedwoodProvider>
        </FatalErrorBoundary>
      </>
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById('redwood-app')
)
