import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';

function UncontrolledExample() {
  return (
    <Carousel className="sliderss">
      <Carousel.Item>
        <ExampleCarouselImage
          text="First slide"
          imageUrl="/images/Img1.png" // ✅ Corrected path
        />
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage
          text="Second slide"
          imageUrl="/images/slderP3.png"
        />
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage
          text="Third slide"
          imageUrl="/images/sliderP2.png"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
