import Header from './components/Header'
import Hero from './sections/Hero'
import Stay from './sections/Stay'
import Itinerary from './sections/Itinerary'
import Pack from './sections/Pack'
import Food from './sections/Food'
import Important from './sections/Important'
import Memories from './sections/Memories'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stay />
        <Itinerary />
        <Pack />
        <Food />
        <Important />
        <Memories />
      </main>
      <Footer />
    </>
  )
}
