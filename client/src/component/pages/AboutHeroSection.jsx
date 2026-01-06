import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation  } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const mediaSlides = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1529333166433-2984ddb9eac5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1521737604893-ff7e1b1c7c94?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function AboutMediaCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-24">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop
        className="h-[70vh] min-h-[520px]"
      >
        {mediaSlides.map((item, idx) => (
          <SwiperSlide key={idx}>
            {item.type === "image" ? (
              <img
                src={item.src}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            {/* subtle overlay for readability */}
            <div className="absolute inset-0 bg-black/10" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom chevrons */}
      <button
        ref={prevRef}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/80 shadow-lg backdrop-blur flex items-center justify-center text-dark hover:text-primary hover:bg-white transition"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        ref={nextRef}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/80 shadow-lg backdrop-blur flex items-center justify-center text-dark hover:text-primary hover:bg-white transition"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
    
  );
}
