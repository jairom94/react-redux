import { NavLink } from "react-router";
import { HeartIcon } from "../icons/heart-icon";
import { MailIcon } from "../icons/mail-icon";
import { PlusIcon } from "../icons/plus-icon";
import { StoreIcon } from "../icons/store-icon";
import AuthButton from "../../pages/auth/auth-button";
import logoDesktop from "../../assets/header/logo-desktop.svg";
import { FacebookIcon } from "../icons/facebook-icon";
import { TwitterIcon } from "../icons/twitter-icon";
import { InstagramIcon } from "../icons/instagram-icon";

const Footer = () => {
  const newLocal = `
              flex justify-between gap-2 [&>li]:flex 
              [&>li]:flex-1 [&>li]:justify-center               
              [&>li]:flex-col [&>li>a]:flex [&>li>a]:flex-col
              [&>li>a]:items-center [&>li>a]:py-4
              shadow-[0px_2px_5px_rgba(0,0,0,.8)]
              [&>li>a>span:nth-child(1)]:text-2xl
              md:hidden [&>li]:hover:bg-gray-300
              [&>li]:transition-colors [&>li]:duration-300
              `;
  return (
    <div>
      <footer className="px-7 md:px-0 pt-3 pb-[90px] md:pb-0 shadow-[0_2px_5px_rgb(0,0,0)]">
        <div
          className={`[&>section>h3]:text-md flex max-w-[50dvw] flex-col 
            gap-5 [&>section>h3]:font-medium [&>section>h3]:tracking-wider 
            [&>section>ul]:flex [&>section>ul]:flex-col [&>section>ul]:gap-3 
            [&>section>ul>li]:text-xs [&>section>ul>li]:text-gray-500
            md:max-w-none md:grid md:grid-cols-2 md:place-items-center md:pb-3`}
        >
          <section className="rights md:col-span-2">
            <figure>
              <img
                className="object-contain"
                src={logoDesktop}
                alt="logo wallapop"
              />
            </figure>
            <p className="text-xs text-gray-500">
              © 2013-2025 Wallapop. Todos los derechos reservados
            </p>
          </section>
          <section className="information nav">
            <h3>Wallapop</h3>
            <ul>
              <li>
                <a href="#">Quiénes somos</a>
              </li>
              <li>
                <a href="#">Como funciona</a>
              </li>
              <li>
                <a href="#">Brand Book</a>
              </li>
              <li>
                <a href="#">Prensa</a>
              </li>
              <li>
                <a href="#">Empleo</a>
              </li>
              <li>
                <a href="#">Sostenibilidad</a>
              </li>
            </ul>
          </section>
          <section className="support nav">
            <h3>Soporte</h3>
            <ul>
              <li>
                <a href="#">Centro de ayuda</a>
              </li>
              <li>
                <a href="#">Normas de la comunidad</a>
              </li>
              <li>
                <a href="#">Consejos de seguridad</a>
              </li>
            </ul>
          </section>
        </div>
        <nav>
          <ul className={`
            flex justify-center gap-4 [&>li]:text-gray-400
            [&>li]:hover:text-emerald-500 [&>li]:transition-colors
            [&>li]:duration-300 bg-emerald-200 py-3
            `}>
            <li>
              <a href="#">
                <div className="text-5xl">
                  <FacebookIcon />
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="text-5xl">
                  <TwitterIcon />
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="text-5xl">
                  <InstagramIcon />
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
      <div className={`fixed right-0 bottom-0 left-0 bg-gray-50`}>
        <nav>
          <ul className={newLocal}>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navbar" : "")}
                to="/"
              >
                <span>
                  <StoreIcon />
                </span>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navbar" : "")}
                to="/favorites"
              >
                <span>
                  <HeartIcon />
                </span>
                <span>Favoritos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navbar" : "")}
                to="/adverts/new"
              >
                <span>
                  <PlusIcon />
                </span>
                <span>Subelo</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navbar" : "")}
                to="/messages"
              >
                <span>
                  <MailIcon />
                </span>
                <span>Buzón</span>
              </NavLink>
            </li>
            <li>
              <AuthButton />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
