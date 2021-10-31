import React from 'react'
import Tabs from './Tabs'
import Header from '../table/Header'
import Body from '../table/Body'

const Container = () => {
  return (
    <div className="root_container">
      <section className="container">
        <article className="marketB">
          <Tabs />
          <Header />
          <Body />
        </article>
      </section>
    </div>
  )
}

export default Container
