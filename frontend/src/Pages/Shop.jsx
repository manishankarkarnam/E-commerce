import React from 'react'
import Hero from '../Components/Hero/Hero.jsx'
import Popular from '../Components/Popular/Popular.jsx'
import Offers from '../Components/Offers/Offers.jsx'
import NewCollections from '../Components/NewCollections/NewCollections.jsx'
import NewsLetter from '../Components/NewsLetter/NewsLetter.jsx'

const Shop = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Hero />
      <Popular />
      <Offers />
      <div id="new-collections-section">
        <NewCollections />
      </div>
      <NewsLetter />
    </div>
  )
}

export default Shop