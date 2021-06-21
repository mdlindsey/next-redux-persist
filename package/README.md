# NextJS Redux Persistence

Simplify persisted state with server/client parity using NextJS and Redux

## Using the live example

After cloning the repo:

```
npm i -g yarn
yarn install
yarn tsc
yarn example
```

## Using in your own code

Use `saveState()` and `loadState()` in addition to a generic `PERSIST_REDUX` action in your reducer. Everything else will work automatically.

The only change you will need to make to `_app.tsx` is adding `loadState()` to the `getInitialProps()` method. You must pass the `NextAppContext` as the parameter of this method. If you do not have an existing `getInitialProps()` for `_app.tsx` you may use the provided example below.

```ts
// _app.tsx
import { loadState } from 'next-redux-persist'
import { AppContext, AppProps } from 'next/app'

const Page = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />
// ^ Component is always the parent page component in this context
Page.getInitialProps = async ({ Component, ctx }:AppContext) => {
  loadState(ctx) // pass NextAppContext to the loadState() method
  const pageProps = !Component.getInitialProps ? {} : await Component.getInitialProps(ctx)
  // ^ if you aren't familiar, this passes default props to the page being loaded
  return { pageProps }
}

export default reduxWrapper.withRedux(Page) // this is defined in the store file below
```

Now all we have to do is wrap state updates in `saveState()` and allow for our generic `PERSIST_REDUX` reducer.

```ts
// store.ts
import { createStore, AnyAction } from 'redux'
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
import { saveState, PERSIST_REDUX } from 'next-redux-persist'


export interface IState {
    allYourBaseBelongToYou?:boolean
}

const initialState = {}
const reducer = (state:IState=initialState, action:AnyAction) => {
    switch (action.type) {
        // You must add this generic reducer for loadState()
        case PERSIST_REDUX:
            return { ...state, ...action.payload }
        // You should already be doing this for next-redux-wrapper
        case HYDRATE:
            return saveState({ ...state, ...action.payload }) // wrap state updates in saveState()
        // Include the rest of your reducer here...
        case 'SET_BASE_STATUS':
            return saveState({
                allYourBaseBelongToYou: action.payload
            }) // wrap state updates in saveState()
        default:
            return state
    }
}
// create a makeStore function
const makeStore: MakeStore<IState> = (context:Context) => createStore(reducer)
// export an assembled wrapper
export const reduxWrapper = createWrapper<IState>(makeStore, { debug: false }) // this was used to wrap _app.tsx
```

### Footnotes

In the example boilerplate I also included server-side rendering of styled-components since that's another common struggle.
