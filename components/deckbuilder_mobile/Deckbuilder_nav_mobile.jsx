import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/deckbuilder", label: "Deckbuilder" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/faq", label: "FAQ" },
  { href: "/simulator", label: "Simulator" },
  /*{ href: "/resources", label: "Resources" }, */
];

const Deckbuilder_nav_mobile = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className=" bg-black py-1 h-8 border-b ">
      <div className="fixed flex justify-between items-center">
        <div className="ml-4">
          <button
            className="text-white focus:outline-none"
            onClick={handleMenuToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
            <div className="flex justify-end">
              <button
                className="text-gray-500 focus:outline-none"
                onClick={handleMenuToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl text-center font-bold mb-4">SpeakWords</h2>
            <ul className="flex flex-col items-center">
              {links.map((link) => (
                <li
                  key={link.href}
                  className={`my-2 ${
                    router.pathname === link.href
                      ? "text-orange-400"
                      : "text-gray-500"
                  } hover:text-orange-400`}
                >
                  <Link href={link.href} onClick={handleLinkClick}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Deckbuilder_nav_mobile;
