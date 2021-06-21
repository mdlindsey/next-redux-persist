import * as cookies from 'js-cookie'

export const PERSIST_REDUX = 'NRP_PERSIST_REDUX_ACTION_TYPE'
export const PERSIST_COOKIE = '_nrpsc64'

export const saveState = <T>(state:T):T => {
    const stateJson = JSON.stringify(state)
    const encodedState = Buffer.from(stateJson).toString('base64')
    cookies.set(PERSIST_COOKIE, encodedState)
    return state
}

export const loadState = <T>(ctx:any):T => {
    const cookieObj = {}
    if (!ctx?.req?.headers?.cookie) {
        return
    }
    for(const c of ctx.req.headers.cookie.split(';')) {
        const [key, value] = c.trim().split('=')
        cookieObj[key] = value
    }
    if (!cookieObj[PERSIST_COOKIE]) {
        return
    }
    const cookieStateJson = Buffer.from(cookieObj[PERSIST_COOKIE], 'base64').toString()
    if (!cookieStateJson) {
        return
    }
    const initialState = JSON.parse(cookieStateJson)
    if (!initialState) {
        return
    }
    ctx.store.dispatch({ type: PERSIST_REDUX, payload: initialState })
}
