import Image from "next/image";

export default function FaqLanding() {
  return (
    <div className="flex">
      <div className="relative w-1/2  h-screen flex justify-center">
        <div className="absolute top-1/2 -translate-y-8 px-10">
          <h1 className="text-4xl">May the Words be with You</h1>
          <p>
            Speak is a classic TCG using new approaches and technologies to
            bring gamer experience to the next level. Speak is a classic TCG
            using new approaches and technologies to bring gamer experience to
            the next level. Speak is a classic TCG using new approaches and
            technologies to bring gamer experience to the next level.
          </p>
          <button className="px-4 py-1 border border-orange-400 rounded-xl mt-4">
            Go to FAQ
          </button>
        </div>
      </div>
      <div className="relative w-1/2 h-screen flex justify-center">
        <div className="absolute top-1/2 -translate-y-[258px]">
          <Image
            src="/Speak_Cards/42_removebg.png"
            alt="Abomination"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
