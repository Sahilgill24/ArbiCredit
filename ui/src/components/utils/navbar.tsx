import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, UserCircle } from "lucide-react";
interface navItem {
  name: string;
  link: string;
}

const Navbar = () => {
  const navItems: navItem[] = [
    { name: "Portfolio", link: "/portfolio" },
    { name: "Swap", link: "/swap" },
  ];
  return (
    <>
      <header className="flex items-center justify-between bg-background py-1 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-lg font-display">Dashboard</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item, index) => (
              <Link key={index} to={item.link}>
                <Button variant="linkHover2" size="sm">
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <Button size={"icon"} variant={"ghost"}>
          <UserCircle className="w-6 h-6" />
        </Button>
      </header>
    </>
  );
};

export default Navbar;
