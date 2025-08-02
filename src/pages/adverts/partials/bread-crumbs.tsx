import { Link, NavLink } from "react-router";

interface BreadCrumbsProps {
    searchByCategory:string
}
const BreadCrumbs = ({searchByCategory}:BreadCrumbsProps) => {
  return (
    <>
      <p>
        <span>Ir a</span> <Link to={`/`}>Inicio</Link> /{" "}
        <NavLink to={`/adverts`} end>
          <span>Anuncios</span>
        </NavLink>
      </p>{" "}
      {searchByCategory && (
        <p>
          &nbsp;/{" "}
          <Link to={`/adverts?category=${searchByCategory}`}>
            <span className="capitalize">{searchByCategory}</span>
          </Link>
        </p>
      )}
    </>
  );
};

export default BreadCrumbs;
