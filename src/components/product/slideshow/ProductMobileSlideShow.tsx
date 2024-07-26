"use client";
import Image from "next/image";

import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductMobileSlideShow = ({ images, title, className }: Props) => {


  return (
    <div
      className={className}
      style={{
        width: "auto",
        height: "auto",
      }}
    >
      <Swiper
        style={{
          width: "100vw",
          height: "auto",

        }}
        pagination
        modules={[FreeMode, Pagination]}
        className="mySwiper2"
      >
        {
          images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                alt={title}
                width={600}
                height={500}
                className="object-fill"
                priority={true}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

    </div>
  );
};
