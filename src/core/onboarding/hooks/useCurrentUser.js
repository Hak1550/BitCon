import { useSelector } from 'react-redux'

const useCurrentUser = () => useSelector(state => state.auth)

export default useCurrentUser
