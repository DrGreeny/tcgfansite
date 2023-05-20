import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex text-white">
      <div className="relative w-1/2  h-screen flex justify-center">
        <div className="m-auto px-10">
          <h1 className="text-4xl mb-4">
            Welcome to Speak Trading Card Game Fansite!
          </h1>
          <p>
            Experience the thrill of an exciting trading card game that takes
            you on a journey across multiple blockchains.
            <br />
            Speak is a multichain game that offers a balanced and immersive
            gaming experience. With Speak, you will dive into a world where
            strategy and skill reign supreme. The game mechanics are
            meticulously designed to ensure fairness and create engaging
            gameplay. Whether you are a seasoned player or new to trading card
            games, Speak offers a welcoming environment for all skill levels.
            <br />
            <br />
            Join a passionate group of players who are always ready to share
            strategies, discuss game updates, and engage in friendly
            competition. The community aspect adds an extra layer of enjoyment
            to the game, fostering connections and friendships with like-minded
            individuals. <br /> Prepare for unexpected twists and turns as you
            navigate through thrilling battles and uncover hidden strategies.
            Every match is a new opportunity to showcase your skills and outwit
            your opponents. <br />
            <br />
            <span className="italic text-lg">
              Let the cards speak for themselves!
            </span>
          </p>
          <div className="mt-4 flex gap-4">
            <Link
              href="/deckbuilder"
              className="px-4 py-1 border border-orange-400 rounded-xl bg-gradient-to-r from-gray-300 to-gray-700 hover:from-violet-800 hover:to-gray-500"
            >
              Visit our deck builder
            </Link>
            <Link
              href="https://speak-game.onrender.com/"
              className="px-4 py-1 border border-orange-400 rounded-xl bg-gradient-to-r from-orange-500 to-gray-500 hover:from-violet-800 hover:to-gray-800"
            >
              Play the beta!
            </Link>
          </div>
        </div>
      </div>
      <div className="relative w-1/2 h-screen flex justify-center">
        <div className="absolute top-1/2 -translate-y-[258px]">
          <Image
            src="/Speak_Cards/104-removebg.png"
            alt="Abomination"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
