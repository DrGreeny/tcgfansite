const Footer = () => {
  return (
    <footer className="flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-8">
      <p>Trading Card Games &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
