import DemoAdverts from "../components/demo-adverts";
import HeroSlider from "../components/hero-slider";


const HomePage = () => {  
  
  return (
    <div      
      className="flex-1 grid grid-cols-1 gap-8 justify-items-center pb-8"
    >
      <HeroSlider />
      <DemoAdverts />
    </div>
  );
};

export default HomePage;
