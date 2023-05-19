import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-black">
      <header>
        <Navigation />
      </header>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
