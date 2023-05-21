import Image from "next/image";

const Footer = () => {
  const handleDiscordLogoClick = () => {
    window.location.href = "https://discord.gg/8cv5tm4pMP";
  };
  return (
    <footer className="h-16 text-white flex justify-between px-10 border-t">
      <div className="flex">
        <Image
          src="/discord-logo-50.png"
          alt="Discord Logo"
          width={25}
          height={25}
          className="object-contain cursor-pointer"
          onClick={handleDiscordLogoClick}
        />
      </div>
      <p className="my-auto">Speak4Fans &copy; {new Date().getFullYear()}</p>
      <p className="my-auto">Powered by GreenyT</p>
    </footer>
  );
};

export default Footer;
