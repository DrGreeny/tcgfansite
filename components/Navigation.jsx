import Link from "next/link";
import ConnectButton from "./ConnectButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/deckbuilder", label: "Deckbuilder" },
  { href: "/tournaments", label: "Tournaments" },
  /*   { href: "/news", label: "News" },
  { href: "/community", label: "Community" },
  { href: "/resources", label: "Resources" }, */
];

const Navigation = () => {
  return (
    <nav className="bg-black py-4">
      <ul className="flex justify-center">
        {links.map((link) => (
          <li key={link.href} className="mx-4 text-gray-500">
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
