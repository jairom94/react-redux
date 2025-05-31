import { NavLink } from "react-router";
import { HeartIcon } from "../icons/heart-icon";
import { MailIcon } from "../icons/mail-icon";
import { PlusIcon } from "../icons/plus-icon";
import { StoreIcon } from "../icons/store-icon";
import AuthButton from "../../pages/auth/auth-button";

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
      <footer className="class-name pb-[90px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        illum placeat at perspiciatis nulla, ratione impedit ex dolor officiis
        neque cupiditate molestiae rerum error, porro dolore quasi quidem quam
        harum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
        molestias ipsam quas ab animi nesciunt ipsum, voluptatibus alias
        cupiditate nulla magni placeat sit architecto pariatur laudantium,
        maiores est non nostrum? In nulla praesentium ducimus repellat quos. Ea
        nihil adipisci aliquam minus deleniti. Minima, qui nemo. Mollitia quod
        ullam quam cum. Blanditiis corporis, animi inventore recusandae quas et
        natus minima. Sequi? Et possimus quam cupiditate. Quasi, molestiae?
        Maxime hic beatae sunt quia fugit, atque natus, dolor suscipit
        distinctio quo ipsa placeat voluptatum possimus eius, asperiores in.
        Beatae quia delectus pariatur veritatis? Deserunt qui maxime eaque in
        dolores esse itaque perferendis blanditiis totam, laborum doloribus        
      </footer>
      <div className={`fixed right-0 bottom-0 left-0 bg-gray-50`}>
        <nav>
          <ul
            className={newLocal}
          >
            <li>
              <NavLink 
              className={({isActive})=>(isActive ? 'active-navbar':'')}
              to="/">
                <span>
                  <StoreIcon />
                </span>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
              className={({isActive})=>(isActive ? 'active-navbar':'')}
              to="/favorites">
                <span>
                  <HeartIcon />
                </span>
                <span>Favoritos</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
              className={({isActive})=>(isActive ? 'active-navbar':'')}
              to="/adverts/new">
                <span>
                  <PlusIcon />
                </span>
                <span>Subelo</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
              className={({isActive})=>(isActive ? 'active-navbar':'')}
              to="/messages">
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
