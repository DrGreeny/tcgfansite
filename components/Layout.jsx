import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main className="bg-black pb-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
