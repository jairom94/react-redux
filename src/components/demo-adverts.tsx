import conjunto from "../assets/demo/conjunto.png";
import mesa from "../assets/demo/mesa.png";
import silla from "../assets/demo/silla.png";
import sofa from "../assets/demo/sofa.png";

const DemoAdverts = () => {
  const demoAdverts = [
    { name: "Conjunto de jardín", image: conjunto },
    { name: "Silla de jardín", image: silla },
    { name: "Mesa de sála", image: mesa },
    { name: "Sofá de jardín", image: sofa },
  ];
  return (
    <div className="w-[80vw] md:w-[50vw]">
      <h3 className="text-xl md:text-2xl font-medium pb-7">Encuentra lo que necesitas o publica lo que no necesitas</h3>
      <ul className="grid grid-cols-2 gap-4">
        {demoAdverts.map((dAdvert) => (
          <li key={dAdvert.name} className="">
            <figure className="rounded-3xl bg-gray-100">
              <img
                className="aspect-[1] w-full object-contain"
                src={dAdvert.image}
                alt=""
              />
            </figure>
            <p className="font-medium tracking-wide">{dAdvert.name}</p>
            <p className="text-gray-500 text-xs">4.100 anuncios</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DemoAdverts;
