import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Deckbuilder_nav_mobile from "./deckbuilder_mobile/Deckbuilder_nav_mobile";

const links = [
  { href: "/", label: "Home" },
  { href: "/deckbuilder", label: "Deckbuilder" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/faq", label: "FAQ" },
  { href: "/simulator", label: "Simulator" },
  /*{ href: "/resources", label: "Resources" }, */
];

const Navigation = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return <Deckbuilder_nav_mobile />;
  }

  return (
    <nav className="bg-black py-1 h-8">
      <ul className="flex justify-center">
        {links.map((link) => (
          <li
            key={link.href}
            className={`mx-4 ${
              router.pathname === link.href ? "text-white" : "text-gray-500"
            } hover:text-orange-400`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
