import Image from "next/image";
import Link from "next/link";

export default function FaqLanding() {
  return (
    <div className="flex">
      <div className="relative w-1/2  h-screen flex justify-center">
        <div className="absolute top-1/2 -translate-y-8 px-10">
          <h1 className="text-4xl mb-4">May the Words be with You</h1>
          <p>
            Speak is a classic TCG using new approaches and technologies to
            bring gamer experience to the next level. Speak is a classic TCG
            using new approaches and technologies to bring gamer experience to
            the next level. Speak is a classic TCG using new approaches and
            technologies to bring gamer experience to the next level.
          </p>
          <div className="mt-4">
            <Link
              href="/faq/gameRulesFaq"
              className="px-4 py-1 border border-orange-400 rounded-xl"
            >
              Go to FAQ
            </Link>
          </div>
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
