import React from 'react'
import { Carousel } from 'react-bootstrap'
import  "./style.css"

function ListOfBestPosts() {
  return (
    <div >
      <Carousel className='best-list' fade>
      <Carousel.Item>
        <img
          className="carousel-image"
          src="https://icdn.tgrthaber.com.tr/crop/850x500/static/haberler/2021_12/xbuyuk/nusret-hayatini-degistiren-3-donum-noktasini-acikladi-her-sabah-o-tabelaya-bakiy-1640427188.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
          className="carousel-image"
          src="https://icdn.tgrthaber.com.tr/crop/850x500/static/haberler/2021_12/xbuyuk/nusret-hayatini-degistiren-3-donum-noktasini-acikladi-her-sabah-o-tabelaya-bakiy-1640427188.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image"
          src="https://icdn.tgrthaber.com.tr/crop/850x500/static/haberler/2021_12/xbuyuk/nusret-hayatini-degistiren-3-donum-noktasini-acikladi-her-sabah-o-tabelaya-bakiy-1640427188.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default ListOfBestPosts