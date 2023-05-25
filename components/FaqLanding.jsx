import Image from "next/image";
import Link from "next/link";

export default function FaqLanding() {
  return (
    <div className="flex">
      <div className=" w-1/2 m-auto px-10 flex justify-center">
        <div className="whitespace-pre-line">
          <h1 className="text-4xl mb-4">May the Words be with You</h1>
          <p className="whitespace-pre-line">
            Welcome to the FAQ section of Speak, the trading card game that
            brings strategy and excitement to your fingertips! <br /> Here, we
            have compiled a list of frequently asked questions from various
            channels, including Discord and tournament chats, to provide you
            with the answers you need. Whether you are a seasoned player or new
            to the game, this section aims to address any doubts or concerns you
            may have. <br /> <br />
            Additionally, we have included extended card descriptions with
            valuable hints on how to effectively utilize them during battles.
            These insights will enhance your understanding of the game mechanics
            and help you develop winning strategies. <br />
            We hope this FAQ section serves as a valuable resource and
            contributes to your enjoyment of Speak. Should you have any further
            inquiries, feel free to reach out to us through the provided
            channels. <span className="font-bold">Happy gaming!</span>
          </p>
          <div className="flex gap-x-4 mt-4">
            <Link
              href="/faq/gameRulesFaq"
              className="px-4 py-1 border border-orange-400 rounded-xl"
            >
              Go to FAQ
            </Link>
            <Link
              href="/faq/cardExplanations"
              className="px-4 py-1 border border-orange-400 rounded-xl"
            >
              Go to Card explanations
            </Link>
          </div>
        </div>
      </div>
      <div
        className="relative w-1/2 flex justify-center"
        style={{
          height: `calc(100vh - 64px)`,
        }}
      >
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
