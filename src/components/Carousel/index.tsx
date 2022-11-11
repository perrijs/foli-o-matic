import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

import { SelectedWork } from "@/pages/config/types";

import { CarouselWrapper, MainImageContainer, ImageContainer } from "./styles";

interface Props {
  project: SelectedWork;
}

const Carousel = ({ project }: Props) => {
  const currentIndex = useRef<number>(project.images.length - 1);
  const currentImage = useRef<HTMLImageElement>();

  const isMouseOver = useRef<boolean>(false);
  const isMouseDown = useRef<boolean>(false);
  const canDrag = useRef<boolean>(false);

  const dragTotal = useRef<number>(0);
  const prevPageY = useRef<number>(0);

  const handleDrag = useCallback((event: MouseEvent) => {
    if (!currentImage.current) return;

    if (event.pageY > prevPageY.current) {
      if (dragTotal.current < 100) {
        dragTotal.current += 6.6;
      }
    }

    currentImage.current.style.transform = `translateY(${dragTotal.current}px)`;
    prevPageY.current = event.pageY;
  }, []);

  const handleRelease = useCallback(() => {
    if (!currentImage.current) return;

    isMouseDown.current = false;

    if (dragTotal.current >= 100) {
      gsap.fromTo(
        currentImage.current,
        { transform: currentImage.current.style.transform },
        {
          duration: 1,
          transform: "translateY(300%)",
          onComplete: () => {
            currentIndex.current -= 1;

            const image = document.querySelector(
              `.image-${currentIndex.current}`
            ) as HTMLImageElement;
            currentImage.current = image;
          },
        }
      );
    } else {
      gsap.fromTo(
        currentImage.current,
        { transform: currentImage.current.style.transform },
        {
          duration: 1,
          transform: "translateY(0%)",
        }
      );
    }

    dragTotal.current = 0;
    prevPageY.current = 0;
  }, []);

  useEffect(() => {
    const image = document.querySelector(
      `.image-${currentIndex.current}`
    ) as HTMLImageElement;
    currentImage.current = image;

    document.addEventListener("mousedown", () => {
      isMouseDown.current = true;
    });

    document.addEventListener("mouseup", () => {
      handleRelease();
    });

    document.addEventListener("mousemove", (event: MouseEvent) => {
      if (!isMouseOver.current || !isMouseDown.current) return;

      handleDrag(event);
    });
  }, [project, handleDrag, handleRelease]);

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
            <Image
              src={image.url}
              priority={index === project.images.length - 1}
              fill
              object-fit="contain"
              alt=""
            />
          </ImageContainer>
        ))}
      </MainImageContainer>
    </CarouselWrapper>
  );
};

export default Carousel;
