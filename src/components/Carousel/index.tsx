import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { SelectedWork } from "@/pages/config/types";

import { CarouselWrapper, MainImageContainer, ImageContainer } from "./styles";

interface Props {
  project: SelectedWork;
}

const Carousel = ({ project }: Props) => {
  const currentImage = useRef<HTMLImageElement>();
  const isMouseOver = useRef<boolean>(false);
  const isMouseDown = useRef<boolean>(false);
  const prevPageY = useRef<number>(0);

  useEffect(() => {
    let dragAmount = 0;

    const image = document.querySelector(
      `.image-${project.images.length - 1}`
    ) as HTMLImageElement;
    console.log(image);
    currentImage.current = image;

    document.addEventListener("mousedown", () => {
      isMouseDown.current = true;
    });

    document.addEventListener("mouseup", () => {
      if (!currentImage.current) return;

      isMouseDown.current = false;

      if (dragAmount > 100) {
        currentImage.current.style.transform = `translateY(300%)`;
      } else {
        currentImage.current.style.transform = `translateY(0%)`;
      }

      dragAmount = 0;
    });

    document.addEventListener("mousemove", (event: MouseEvent) => {
      if (!isMouseOver.current || !isMouseDown.current) return;

      if (event.pageY > prevPageY.current) {
        if (!currentImage.current) return;

        dragAmount += 5;

        currentImage.current.style.transform = `translateY(${dragAmount}px)`;
      }

      prevPageY.current = event.pageY;
    });
  }, [project.images.length]);

  return (
    <CarouselWrapper>
      <MainImageContainer
        onMouseOver={() => (isMouseOver.current = true)}
        onMouseLeave={() => (isMouseOver.current = false)}
      >
        {project.images.map((image, index) => (
          <ImageContainer
            key={index}
            className={`image-${index}`}
            $aspectRatio={image.aspectRatio}
            $width={image.width}
          >
            <Image src={image.url} fill object-fit="contain" alt="" />
          </ImageContainer>
        ))}
      </MainImageContainer>
    </CarouselWrapper>
  );
};

export default Carousel;
