import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import Card from '@components/card/Card'
import HomeCard from '@components/card/HomeCard'

import { handleLogin } from '@lib/util'

const Home = () => (
  <div>
    <Navbar />
    <HomeCard />

    <button onClick={handleLogin}>Sign in</button>
    <Card />
    <Footer />
  </div>
)

export default Home
