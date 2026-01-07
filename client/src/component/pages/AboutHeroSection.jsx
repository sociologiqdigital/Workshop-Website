import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const venues = [
  {
    label: "Workshop Floors",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Leadership Circles",
    image:
      "https://images.unsplash.com/photo-1521737604893-ff8c9c8f4f2c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Studio Sessions",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "On-Ground Events",
    image:
      "https://images.unsplash.com/photo-1582719478248-54e9f2c9e3e5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Client HQs",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function VenueCarousel() {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(1);

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 lg:py-28 bg-[#F6F1EB] overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-20 -left-24 w-[420px] h-[420px] rounded-[42%] bg-[#7B1E3A]/12 blur-3xl" />
      <div className="pointer-events-none absolute top-10 -right-24 w-[420px] h-[420px] rounded-[42%] bg-[#C9A24D]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] left-1/3 w-[520px] h-[220px] rounded-full bg-[#7B1E3A]/8 blur-3xl" />

      {/* SVG CLIP PATH (rounded slope shape) */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="venueShape" clipPathUnits="objectBoundingBox">
            <path
              d="
  M0.06,0.06
  Q0.5,-0.06 0.94,0.08
  C0.985,0.1 1,0.15 1,0.22
  L1,0.78
  C1,0.85 0.985,0.9 0.94,0.92
  Q0.5,1.06 0.06,0.92
  C0.015,0.9 0,0.85 0,0.78
  L0,0.22
  C0,0.15 0.015,0.1 0.06,0.06
  Z"
            />
          </clipPath>
        </defs>
      </svg>
      {/* Carousel */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        loop
        centeredSlides
        slidesPerView={1.18}
        className="relative"
      >
        {venues.map((venue, idx) => (
          <SwiperSlide key={idx}>
            <div className="mx-auto max-w-[1150px] px-6">
              <div
                className="relative h-[520px] shadow-[0_38px_90px_rgba(123,30,58,0.16)] bg-white/70 backdrop-blur"
                style={{ clipPath: "url(#venueShape)" }}
              >
                <div className="absolute inset-[-2%] rounded-[3rem] bg-white/60" />
                <div className="relative h-full">
                  <img
                    src={venue.image}
                    alt={venue.label}
                    className="w-full h-full object-cover scale-[1.02]"
                  />

                  {/* Soft overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* User controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 sm:px-10 z-20">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/40 bg-black/25 text-white shadow-lg backdrop-blur-md flex items-center justify-center transition hover:bg-black/40 hover:shadow-xl group"
          aria-label="Previous venue"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white/60 transition group-hover:text-white/90" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/40 bg-black/25 text-white shadow-lg backdrop-blur-md flex items-center justify-center transition hover:bg-black/40 hover:shadow-xl group"
          aria-label="Next venue"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/60 transition group-hover:text-white/90" />
        </button>
      </div>
    </section>
  );
}
