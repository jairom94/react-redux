import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import heroBgOne from '../assets/hero/hero1.avif'
import heroBgTwo from '../assets/hero/hero2.avif'
import heroBgThree from '../assets/hero/hero3.avif'

const HeroSlider = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const [heroSliders, setHeroSliders] = useState([
    {
      name: "slider-1",
      expand: true,
      el: box1,
      bg: "bg-emerald-400",
      bgImage: heroBgOne,
      message: "<strong>Compra y vende artículos</strong><br> de segunda mano.",
      link: { to: "/adverts/new", text: "Vender ahora" },
    },
    {
      name: "slider-2",
      expand: false,
      el: box2,
      bg: "bg-emerald-600",
      bgImage: heroBgTwo,
      message:
        "<strong>¿Quién necesita trastero,</strong><br> teniendo Wallapop?",
      link: { to: "/adverts/new", text: "Vende lo que no usas" },
    },
    {
      name: "slider-3",
      expand: false,
      el: box3,
      bg: "bg-emerald-800",
      bgImage: heroBgThree,
      message:
        "<strong>Potencia tu negocio online</strong><br> con Wallapop PRO.",
      link: { to: "/aderts/new", text: "Saber más" },
    },
  ]);
  const [isHover, setIsHover] = useState(false);
  const indexRef = useRef(1);
  function expandSlider(name: string) {
    const updateHeroSlider = heroSliders.map((slider) => {
      if (slider.name === name) {
        return { ...slider, expand: true };
      }
      return { ...slider, expand: false };
    });
    setHeroSliders(updateHeroSlider);
    setIsHover(true);
  }
  useEffect(() => {
    let interval: number;
    if (!isHover) {
      interval = setInterval(() => {
        const updateHeroSlider = heroSliders.map((slider, i) => {
          if (indexRef.current === i) {
            return {
              ...slider,
              expand: true,
            };
          }
          return { ...slider, expand: false };
        });
        setHeroSliders(updateHeroSlider);
        indexRef.current += 1;
        if (indexRef.current === 3) {
          indexRef.current = 0;
        }
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHover, heroSliders]);
  return (
    <div className="hero flex h-[384px] w-full">
      {heroSliders.map((slider) => (
        <div
          onMouseEnter={() => expandSlider(slider.name)}
          onMouseLeave={() => setIsHover(false)}
          key={slider.name}
          ref={slider.el}
          className={`cursor-pointer grid h-full grid-cols-2 md:grid-cols-[450px_1fr] overflow-hidden transition-all duration-500 ease-linear ${slider.bg} ${slider.expand ? "w-full" : "w-[50px] [&>div:first-child]:hidden [&>figure]:col-span-2 [&>figure]:brightness-50"} `}
        >
          <div className={`flex flex-col justify-between px-4 py-8`}>
            <h3
              className="line-clamp-4 text-4xl md:text-5xl font-extralight text-white [&>strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: slider.message }}
            />
            <div>
              <Link
                className="text-md inline-block rounded-2xl bg-amber-600 px-8 py-2 font-medium tracking-wide whitespace-nowrap"
                to={slider.link.to}
              >
                {slider.link.text}
              </Link>
            </div>
          </div>
          <figure>
            <img
              className="h-full w-full object-cover object-center"
              src={slider.bgImage}
              alt={slider.name}
            />
          </figure>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;
