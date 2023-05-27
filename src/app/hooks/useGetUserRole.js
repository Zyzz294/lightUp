import { useSelector } from 'react-redux'

const useGetUserRole = () => {
  let data = useSelector((state) => state.auth.user)

  if (data === null) {
    return 'Role is absent!'
  } else {
    const [admin] = data.roles
    return admin
  }
}

export default useGetUserRole
