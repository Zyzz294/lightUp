import Page404 from '../components/pages/Page404/Page404'
import useGetUserRole from '../hooks/useGetUserRole'

const WithAdmin = (Component) => {
  const admin = useGetUserRole()
  if (admin === 'ROLE_ADMIN') return () => <Component />

  return () => <Page404 />
}
export default WithAdmin
