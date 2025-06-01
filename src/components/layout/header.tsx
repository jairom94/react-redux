import { useEffect, useRef, useState } from "react";
// import FormField from "../ui/form-field";
import logoMobile from "../../assets/header/logo.svg";
import logoDesktop from "../../assets/header/logo-desktop.svg";
import { SearchIcon } from "../icons/search-icon";
import type { Tag } from "../../pages/adverts/types";
import { getTags } from "../../pages/adverts/service";
import { Link, NavLink } from "react-router";
import { PlusIcon } from "../icons/plus-icon";
import { BurgerMenu } from "../icons/burger-icon";
import DynamicIcon from "../icons/dynamic-icon";
import { CloseIcon } from "../icons/close-icon";
import AuthButtonDesktop from "../../pages/auth/auth-button-desktop";

const Header = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [showmenu,setShowMenu] = useState(false)
  const tagsRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(1);
  // console.log(tags);

  useEffect(() => {
    async function fillTags() {
      const tags_ = await getTags();
      setTags(tags_);
    }
    fillTags();
  }, []);
  useEffect(() => {
    const inter = setInterval(() => {
      if (tagsRef.current) {
        tagsRef.current.innerHTML = "";
      }
      const newTag = document.createElement("span");
      newTag.textContent = tags[indexRef.current];
      newTag.classList.add("animate-fade-in");
      // newTag.classList.add('animate-fade-out')
      tagsRef.current?.appendChild(newTag);
      indexRef.current += 1;
      if (indexRef.current === 4) {
        indexRef.current = 0;
      }
    }, 3000);
    return () => clearInterval(inter);
  }, [tags]);
  return (
    <div
      className={`sticky top-0 left-0 z-50 flex flex-col 
        gap-2 bg-gray-50 
        md:gap-6 md:px-7 md:py-7`}
    >
      <div className="flex items-center md:gap-2">
        <figure className="flex items-center justify-center pt-1">
          <picture>
            <source media="(min-width:768px)" srcSet={logoDesktop} />
            <img
              className="h-full w-full object-center"
              src={logoMobile}
              alt="Logo Mobil"
            />
          </picture>
        </figure>
        <div className="relative flex flex-1 flex-col">
          <input
            type="text"
            className={`peer rounded-4xl border border-gray-500 bg-white px-4 py-2 transition-all duration-300 ease-in-out hover:border-gray-900 hover:outline-1 hover:outline-gray-900`}
            name="search"
            id="search"
            autoComplete="off"
          />
          <span
            className={`pointer-events-none absolute top-[.5rem] left-4 text-2xl text-gray-300 peer-focus:hidden`}
          >
            <SearchIcon />
          </span>
          <span
            className={`pointer-events-none absolute top-[.5rem] left-[3rem] text-gray-500 peer-focus:hidden`}
          >
            Busca
          </span>
          <div
            ref={tagsRef}
            className={`pointer-events-none absolute top-[.5rem] left-[5.8rem] font-bold text-gray-700 peer-focus:hidden`}
          >
            <span className="">{tags && tags[0]}</span>
          </div>
        </div>
        {/* Modo Desktop */}
      <div className="hidden md:flex md:gap-2">
        <AuthButtonDesktop />
        <NavLink
          className={`flex items-center gap-1 rounded-4xl border-2 border-emerald-500 bg-emerald-500 px-6 py-2 font-medium transition-opacity duration-300 hover:opacity-70`}
          to="/adverts/new"
        >
          <span>
            <PlusIcon />
          </span>
          <span>Vender</span>
        </NavLink>
      </div>
      </div>
      <nav className="relative flex gap-3 px-3 items-center pb-3" >
        <div>          
          <input 
          className="hidden"
          checked={showmenu}
          onChange={(e)=>{setShowMenu(e.target.checked)}}
          type="checkbox" name="" id="menu-vertical" />
          <label htmlFor="menu-vertical" className={`
            flex items-center gap-2 cursor-pointer
            hover:border-b-2 border-gray-600
            ${showmenu ? 'border-b-2' : ''}
            `}>
            <span>
              <BurgerMenu />
            </span>
            <span>
              Ver Categorias
            </span>
          </label>
        </div>
        <div className={`
          md:h-[calc(100vh-168px)] md:top-[168px]
          fixed -left-3 top-[97px] right-0 h-[calc(100vh-97px)] bg-black/80
          ${ showmenu ? '' : 'hidden' } z-10
          `}>            
        </div>
        <div className={`
        fixed top-[97px] md:top-[168px] 
          md:h-[calc(100vh-168px)]
          h-[calc(100vh-97px)] w-[300px] z-20
          ${ showmenu ? 'left-0' : 'left-[-300px]' }
          bg-white transition-all duration-300
          px-2
          `}>
            <div className="py-7 relative">
            <h3 className="text-2xl font-medium">Todas las categorías</h3>
            <button 
            onClick={()=>{setShowMenu(false)}}
            className="absolute right-2 top-2 hover:bg-gray-300 transition-colors p-2 cursor-pointer">
              <span>
                <CloseIcon />
              </span>
            </button>
            </div>
          <ul 
          className="flex flex-col gap-4"
          >
            { tags.map(tag => (
              <li 
              key={tag}
              className="border-b-1 border-gray-300 pb-3">
                <Link 
                className="grid grid-cols-[40px_1fr] gap-2 hover:underline"
                to="">
                <DynamicIcon icon={tag} className="flex justify-start items-center" />
                <span className="capitalize">{tag}</span>
                </Link>
              </li>
            )) }
          </ul>
        </div>
        <ul>          
          <li>
            <NavLink 
            className={({isActive})=>(isActive ? 'border-b-2':'hover:border-b-2')}
            end
            to="/adverts">
              Todas los anuncios
              </NavLink>
          </li>
        </ul>
      </nav>      
    </div>
  );
};

export default Header;
