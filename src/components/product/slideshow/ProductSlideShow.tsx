"use client";
import { useState } from "react";
import Image from "next/image";

import { Swiper as SwiperObject } from "swiper";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductSlideShow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}
      style={{
        width: "auto",
        height: "auto",
      }}
    >
      <Swiper
        // style={{
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        // } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {
          images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                alt={title}
                width={1024}
                height={800}
                className="rounded-lg object-fill"
                priority={true}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                alt={title}
                width={300}
                height={300}
                className="rounded-lg object-fill"
                priority={true}
              />
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  );
};
