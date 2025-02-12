import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import homeBg from "@/assets/home-background.svg";

const HomePage = () => {
  return (
    <>
    <div
      className="h-screen w-full flex flex-col items-center justify-center"
      style={{
        background: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-7xl uppercase font-black mb-4 bg-gradient-to-br text-transparent bg-clip-text from-primary-foreground from-[20%] to-accent/50 to-[200%]">Zenome</h1>
      <p className="text-lg font-medium text-secondary-foreground mb-8">
        The Nexus of{" "}
        <span className="font-bold text-primary-foreground">
          Cross-Chain Trading
        </span>{" "}
        &{" "}
        <span className="font-bold text-primary-foreground">
          Portfolio Mastery
        </span>
      </p>
      <Link to="/portfolio">

        <Button className="rounded-full px-8 text-base border font-medium" variant={'metal'} size={'lg'}>
          Get Started
        </Button>
      </Link>
    </div>
    </>
  );
};

export default HomePage;
