# NextJS Redux Persistence

```ts
import { PERSIST_REDUX } from 'next-redux-persist'

const reducer = (state:IState=initialState, action:AnyAction) => {
    switch (action.type) {
        case PERSIST_REDUX:
            return action.payload
        case HYDRATE:
            return saveStateToCookie({ ...state, ...action.payload })
    }
}
```