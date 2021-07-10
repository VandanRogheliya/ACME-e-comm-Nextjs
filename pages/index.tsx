import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import Card from '@components/card/Card'
import HomeCard from '@components/card/HomeCard'
import HomeCardHero from '@components/card/HomeCardHero'

const Home = () => (
  <div>
    <Navbar />
    <div className="flex  flex-col flex-intial lg:flex-row">
      <div className="grid lg:grid-cols-7">
        <div className="lg:col-span-5 lg:row-span-4">
          <HomeCardHero />
        </div>
        <div className="lg:row-span-3 lg:col-span-2">
          <HomeCard />
        </div>
      </div>
    </div>
    <Card />
    <Footer />
  </div>
)

export default Home
