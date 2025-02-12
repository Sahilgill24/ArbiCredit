import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-[72vw] mx-auto pt-4">
      <Navbar />
      <div className="w-full flex flex-col gap-4 mt-8">{children}</div>
    </div>
  );
};

export default Layout;
