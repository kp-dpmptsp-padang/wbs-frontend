import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

// Individual slide component
export const CarouselSlide = ({ 
  children, 
  className = '',
  ...rest 
}) => {
  return (
    <div className={`carousel-slide flex-shrink-0 w-full ${className}`} {...rest}>
      {children}
    </div>
  );
};

const Carousel = ({
  children,
  autoplay = false,
  autoplayInterval = 5000,
  showArrows = true,
  showDots = true,
  infiniteLoop = true,
  dotPosition = 'bottom',
  dotStyle = 'default',
  arrowSize = 'md',
  transition = 'slide',
  className = '',
  slideClassName = '',
  onSlideChange,
  ...rest
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoplayTimerRef = useRef(null);
  const slidesContainerRef = useRef(null);
  
  // Filter only CarouselSlide components from children
  const slides = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === CarouselSlide
  );
  
  const slideCount = slides.length;
  
  // Prevent autoplay for single slide
  const shouldAutoplay = autoplay && slideCount > 1;
  
  // Reset autoplay timer when slide changes or autoplay settings change
  useEffect(() => {
    if (shouldAutoplay) {
      startAutoplayTimer();
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentSlide, shouldAutoplay, autoplayInterval]);
  
  const startAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    
    autoplayTimerRef.current = setInterval(() => {
      if (!isAnimating) {
        goToSlide((currentSlide + 1) % slideCount);
      }
    }, autoplayInterval);
  }, [currentSlide, slideCount, autoplayInterval, isAnimating]);
  
  const goToSlide = (index) => {
    if (index < 0) {
      index = infiniteLoop ? slideCount - 1 : 0;
    } else if (index >= slideCount) {
      index = infiniteLoop ? 0 : slideCount - 1;
    }
    
    if (index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      
      if (onSlideChange) {
        onSlideChange(index);
      }
      
      // Reset animation flag after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 700); // Match transition duration
    }
  };
  
  const prevSlide = () => {
    if (!isAnimating) {
      goToSlide(currentSlide - 1);
    }
  };
  
  const nextSlide = () => {
    if (!isAnimating) {
      goToSlide(currentSlide + 1);
    }
  };
  
  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && !isAnimating) {
      nextSlide();
    } else if (isRightSwipe && !isAnimating) {
      prevSlide();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Arrow button styles based on size
  const arrowSizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12"
  };
  
  // Dot styles
  const dotStyleClasses = {
    default: "bg-white border border-gray-300 hover:bg-gray-200 carousel-dot-active:bg-primary carousel-dot-active:border-primary",
    primary: "bg-gray-200 carousel-dot-active:bg-primary",
    light: "bg-gray-300 carousel-dot-active:bg-white"
  };
  
  // Dot position
  const dotPositionClasses = {
    bottom: "bottom-3",
    top: "top-3",
    'bottom-outside': "-bottom-10",
    'top-outside': "-top-10"
  };
  
  // Transition style
  const transitionClasses = {
    slide: "transition-transform duration-700 ease-in-out",
    fade: "transition-opacity duration-700 ease-in-out"
  };
  
  // Calculate transform for slides container
  const getTransformStyle = () => {
    if (transition === 'slide') {
      return {
        transform: `translateX(-${currentSlide * 100}%)`
      };
    } else if (transition === 'fade') {
      return {}; // Fade effect handled by CSS for individual slides
    }
    return {};
  };
  
  // Render dots navigation
  const renderDots = () => {
    if (!showDots || slideCount <= 1) return null;
    
    return (
      <div 
        className={`carousel-dots absolute ${dotPositionClasses[dotPosition]} left-0 right-0 flex justify-center gap-2 z-10`}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${
              currentSlide === index ? 'carousel-dot-active' : ''
            } size-3 rounded-full cursor-pointer ${dotStyleClasses[dotStyle]}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };
  
  // Don't render the carousel if there are no slides
  if (slideCount === 0) {
    return null;
  }
  
  // Render a simplified version for a single slide
  if (slideCount === 1) {
    return (
      <div 
        className={`carousel relative overflow-hidden rounded-lg ${className}`}
        {...rest}
      >
        <div className="carousel-container w-full">
          {slides[0]}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`carousel relative overflow-hidden rounded-lg ${className}`}
      {...rest}
    >
      {/* Slides container */}
      <div
        ref={slidesContainerRef}
        className={`carousel-container flex w-full h-full ${
          transition === 'fade' ? 'relative' : 'flex-nowrap'
        } ${transitionClasses[transition]}`}
        style={getTransformStyle()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          // Clone the slide element with additional props
          return React.cloneElement(slide, {
            key: index,
            className: `${slide.props.className || ''} ${slideClassName} ${
              transition === 'fade' 
                ? `absolute top-0 left-0 w-full h-full ${
                    currentSlide === index 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0'
                  } transition-opacity duration-700 ease-in-out`
                : ''
            }`
          });
        })}
      </div>
      
      {/* Previous/Next arrows */}
      {showArrows && slideCount > 1 && (
        <>
          <button 
            type="button"
            onClick={prevSlide}
            className={`carousel-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 inline-flex justify-center items-center ${arrowSizeClasses[arrowSize]} bg-white/80 hover:bg-white border border-gray-100 text-gray-700 rounded-full shadow-sm ${
              !infiniteLoop && currentSlide === 0 ? 'opacity-50 cursor-default' : ''
            }`}
            disabled={!infiniteLoop && currentSlide === 0}
            aria-label="Previous slide"
          >
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button 
            type="button"
            onClick={nextSlide}
            className={`carousel-next absolute top-1/2 right-2 -translate-y-1/2 z-10 inline-flex justify-center items-center ${arrowSizeClasses[arrowSize]} bg-white/80 hover:bg-white border border-gray-100 text-gray-700 rounded-full shadow-sm ${
              !infiniteLoop && currentSlide === slideCount - 1 ? 'opacity-50 cursor-default' : ''
            }`}
            disabled={!infiniteLoop && currentSlide === slideCount - 1}
            aria-label="Next slide"
          >
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </>
      )}
      
      {/* Dots navigation */}
      {renderDots()}
    </div>
  );
};

CarouselSlide.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Carousel.propTypes = {
  children: PropTypes.node,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  showArrows: PropTypes.bool,
  showDots: PropTypes.bool,
  infiniteLoop: PropTypes.bool,
  dotPosition: PropTypes.oneOf(['bottom', 'top', 'bottom-outside', 'top-outside']),
  dotStyle: PropTypes.oneOf(['default', 'primary', 'light']),
  arrowSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  transition: PropTypes.oneOf(['slide', 'fade']),
  className: PropTypes.string,
  slideClassName: PropTypes.string,
  onSlideChange: PropTypes.func
};

export default Carousel;