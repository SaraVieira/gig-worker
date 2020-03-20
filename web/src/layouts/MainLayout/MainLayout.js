import Navbar from '../../components/Navbar'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  )
}

export default MainLayout
