import 'core-js/stable'
import React from 'react'
import { render } from 'react-dom'
import { App } from './client/App'
// import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'
import reduxStore from './store/root'

const queryClient = new QueryClient()

render(
  <ReduxProvider store={reduxStore}>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <App />
    </QueryClientProvider>
  </ReduxProvider>,
  document.getElementById('root')
)
