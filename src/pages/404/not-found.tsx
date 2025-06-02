import { Link } from "react-router";
import img404 from "../../assets/404.png";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="max-w-[70vw] flex flex-col items-center py-7 rounded-xl shadow-2xl">
        <figure>
          <img
            className="aspect-video w-full object-contain"
            src={img404}
            alt="404 Page not Found"
          />
        </figure>
        <h1>Page Not Found</h1>
        <Link to={`/`} className="text-white px-4 py-1 rounded-md hover:bg-emerald-600 bg-emerald-700">
          Volver a Wallapop
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
