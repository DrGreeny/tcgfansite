import { Bracket } from "react-brackets";
const checkmark = "\u2713";
const rounds = [
  {
    title: "Round one",
    seeds: [
      {
        id: 1,
        date: new Date("2023-05-22").toDateString(),
        teams: [{ name: "enzi" }, { name: `GreenyT  ${checkmark}` }],
      },
      {
        id: 2,
        date: new Date("2023-05-22").toDateString(),
        teams: [{ name: `Atum  ${checkmark}` }, { name: "Mantis" }],
      },
      {
        id: 3,
        date: new Date("2023-05-22").toDateString(),
        teams: [{ name: `Petteri  ${checkmark}` }, { name: "Highfly88" }],
      },
      {
        id: 4,
        date: new Date("2023-05-22").toDateString(),
        teams: [{ name: `arti  ${checkmark}` }, { name: "Iamayrv" }],
      },
    ],
  },
  {
    title: "Round two",
    seeds: [
      {
        id: 1,
        date: new Date("2023-05-22").toDateString(),
        teams: [{ name: `GreenyT ${checkmark}` }, { name: "Atum" }],
      },
      {
        id: 2,
        date: new Date("2023-05-23").toDateString(),
        teams: [{ name: "Petteri" }, { name: `arti ${checkmark}` }],
      },
    ],
  },
  {
    title: "Final",
    seeds: [
      {
        id: 7,
        date: new Date("2023-05-23").toDateString(),
        teams: [{ name: "GreenyT" }, { name: `arti ${checkmark}` }],
      },
    ],
  },
];

const Tournament = () => {
  return (
    <div className="text-white p-2">
      <div
        className="flex-col xl:grid xl:grid-cols-2 items-center"
        style={{
          minHeight: `calc(100vh - 64px)`,
        }}
      >
        <div className="p-2 md:p-8 xl:p-12 flex-col justify-center mb-8">
          <h1 className="text-4xl mb-12 text-center">
            Second Beta Tournamet finished succesfully
          </h1>
          <p className="whitespace-pre-line text-justify">
            The second tournament of the Speak Trading Card Game has concluded,
            leaving behind a trail of excitement and fierce competition.
            Throughout the event, participants engaged in intense battles,
            showcasing their skills and clever strategies. The tournament
            reached its climax with an epic final showdown between two prominent
            members of the game`s community: arti and GreenyT. <br /> The final
            match was a spectacle to behold, as arti and GreenyT clashed with
            their formidable decks. Both players exhibited exceptional tactical
            prowess, leaving spectators on the edge of their seats. The battle
            unfolded as arti`s deck, composed of powerful Undead creatures,
            confronted GreenyT`s formidable dragons. <br /> In an exhilarating
            turn of events, arti emerged victorious, skillfully maneuvering
            their Undead creatures to overpower GreenyT`s dragon forces. The
            clash of these contrasting deck themes created an enthralling
            spectacle.
            <br /> <br /> The second tournament of the Speak Trading Card Game
            will be remembered for its memorable battles, strategic brilliance,
            and the ultimate triumph of arti`s Undead deck. It served as a
            testament to the depth and complexity of the game, showcasing the
            ingenuity and skill of its dedicated community members. Undoubtedly,
            this tournament has left players and fans eagerly anticipating the
            next thrilling chapter in the Speak Trading Card Game`s competitive
            journey.
          </p>
        </div>
        <div className="m-auto ">
          <Bracket rounds={rounds} />
        </div>
      </div>
    </div>
  );
};
export default Tournament;
