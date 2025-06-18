import notFoundPlaceholder from "../../../assets/not-found.jpg";

const NoAdverts = () => {
  return (
    <li>
      <figure className="relative">
        <img
          className="aspect-video w-full rounded-md object-cover object-center"
          src={notFoundPlaceholder}
          alt={`Placeholder not found adverts`}
        />
      </figure>
      <p className="text-xl font-medium">
        No se encontró los anuncios que busca.
      </p>
    </li>
  );
};

export default NoAdverts;
