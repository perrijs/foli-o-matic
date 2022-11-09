import Image from "next/image";

import { SelectedWork } from "@/pages/config/types";

import {
  CarouselWrapper,
  ImageContainer,
  ImagesRow,
  RowImageContainer,
} from "./styles";
import { useState } from "react";

interface Props {
  project: SelectedWork;
}

const Carousel = ({ project }: Props) => {
  const [currentImage, setCurrentImage] = useState(project.images[0]);

  return (
    <CarouselWrapper>
      <ImageContainer
        $aspectRatio={currentImage.aspectRatio}
        $width={currentImage.width}
      >
        <Image
          src={currentImage.url}
          priority
          fill
          object-fit="contain"
          alt=""
        />
      </ImageContainer>

      <ImagesRow>
        {project.images.map((image, index) => (
          <RowImageContainer key={index} onClick={() => setCurrentImage(image)}>
            <Image
              src={image.url}
              alt=""
              width="0"
              height="0"
              sizes="100%"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </RowImageContainer>
        ))}
      </ImagesRow>
    </CarouselWrapper>
  );
};

export default Carousel;
