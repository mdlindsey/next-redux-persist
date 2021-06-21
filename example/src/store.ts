import { createStore, AnyAction } from 'redux'
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
import { saveState, PERSIST_REDUX } from '../../package/lib'


export interface IState {
    allYourBaseBelongToYou?:boolean
}

const initialState = {}
const reducer = (state:IState=initialState, action:AnyAction) => {
    switch (action.type) {
        case PERSIST_REDUX:
            return { ...state, ...action.payload }
        case HYDRATE:
            return saveState({ ...state, ...action.payload })
        // the rest of your reducer...
        case 'SET_BASE_STATUS':
            return saveState({
                allYourBaseBelongToYou: action.payload
            })
        default:
            return state
    }
}
// create a makeStore function
const makeStore: MakeStore<IState> = (context:Context) => createStore(reducer)

// export an assembled wrapper
export const reduxWrapper = createWrapper<IState>(makeStore, { debug: false })
