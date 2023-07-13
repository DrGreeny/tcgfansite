const checkmark = "\u2713";
export const tournament2 = [
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
