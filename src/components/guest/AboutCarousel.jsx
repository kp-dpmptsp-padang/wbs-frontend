import React from 'react';
import Carousel, { CarouselSlide } from '@/components/common/Carousel';

const AboutCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      image: '/images/aboutcarousel1.jpg',
      alt: 'Tim WBS bekerja bersama',
    },
    {
      id: 2,
      image: '/images/aboutcarousel2.jpg',
      alt: 'Kantor WBS',
    },
    {
      id: 3,
      image: '/images/aboutcarousel3.jpg',
      alt: 'Workshop pelatihan whistleblowing',
    },
  ];

  return (
    <div className="relative w-full">
      {/* Hero Overlay dengan judul */}
      <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Tentang Kami
        </h1>
      </div>

      {/* Carousel */}
      <Carousel 
        autoplay={true} 
        autoplayInterval={5000}
        showArrows={false}
        showDots={true}
        dotPosition="bottom"
        dotStyle="light"
        transition="fade"
        className="h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {carouselItems.map((item) => (
          <CarouselSlide key={item.id}>
            <div className="w-full h-full">
              <img 
                src={item.image} 
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default AboutCarousel;