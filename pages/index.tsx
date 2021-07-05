import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import { handleLogin } from '@lib/util'

const Home = () => (
  <div>
    <Navbar />
    <button onClick={handleLogin}>Sign in</button>
    <Footer />
  </div>
)

export default Home
