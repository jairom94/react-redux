import React from "react";
import { Link } from "react-router";

interface BreadCrumbsProps {
    searchByCategory:string
}
const BreadCrumbs = ({searchByCategory}:BreadCrumbsProps) => {
  return (
    <>
      <p>
        <span>Ir a</span> <Link to={`/`}>Inicio</Link> /{" "}
        <Link to={`/adverts`}>
          <span>Anuncios</span>
        </Link>
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
