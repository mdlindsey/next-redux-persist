import { useDispatch, useSelector } from 'react-redux'
import { IState } from 'src/store'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 20vh;
  text-align: center;
  font-family: sans-serif;
`

const Page = () => {
  const dispatch = useDispatch()
  const { allYourBaseBelongToYou } = useSelector<IState, IState>(state => state)
  return (
    <Wrapper>
      <h1>All your base are belong to { allYourBaseBelongToYou ? 'you' : 'us' }</h1>
      <button onClick={() => dispatch({ type: 'SET_BASE_STATUS', payload: !allYourBaseBelongToYou })}>
        { !allYourBaseBelongToYou ? 'Reclaim your base' : 'Forfeit your base' }
      </button>
    </Wrapper>
  )
}

// eslint-disable-next-line import/no-default-export
export default Page
