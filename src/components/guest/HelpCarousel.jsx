import React from 'react';
import Carousel, { CarouselSlide } from '@/components/common/Carousel';

const HelpCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      image: '/images/helpcarousel1.jpg',
      alt: 'Bantuan penggunaan WBS',
    },
    {
      id: 2,
      image: '/images/helpcarousel2.jpg',
      alt: 'Panduan pelaporan',
    },
    {
      id: 3,
      image: '/images/helpcarousel3.jpg',
      alt: 'Pusat bantuan WBS',
    },
  ];

  return (
    <div className="relative w-full">
      {/* Hero Overlay dengan judul */}
      <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Butuh Bantuan?
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

export default HelpCarousel;