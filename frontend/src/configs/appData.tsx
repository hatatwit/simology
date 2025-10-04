import CustomEdge from "@components/edge/CustomEdge";
import ChildrenNode from "@components/node/ChildrenNode";
import SimNode from "@components/node/SimNode";
import SpouseNode from "@components/node/SpouseNode";
import { FaChild, FaHeartBroken, FaUsers, FaUserTie } from "react-icons/fa";

import { GiLovers } from "react-icons/gi";

export const nodeTypes = {
  sim: SimNode,
  children: ChildrenNode,
  spouse: SpouseNode,
};

export const edgeTypes = {
  custom: CustomEdge,
};

const skillNames = [
  "Cooking",
  "Gourmet Cooking",
  "Mixology",
  "Charisma",
  "Comedy",
  "Fishing",
  "Fitness",
  "Gardening",
  "Guitar",
  "Piano",
  "Violin",
  "Handiness",
  "Mischief",
  "Painting",
  "Photography",
  "Programming",
  "Rocket Science",
  "Video Gaming",
  "Writing",
  "Baking",
  "Dancing",
  "DJ Mixing",
  "Singing",
  "Vet",
  "Pet Training",
  "Flower Arranging",
  "Acting",
  "Media Production",
  "Robotics",
  "Research & Debate",
  "Fabrication",
  "Juice Fizzing",
  "Rock Climbing",
  "Skiing",
  "Snowboarding",
  "Medium",
  "Cross-Stitch",
  "Horse Riding",
  "Nectar Making",
  "Gemology",
  "Archaeology",
  "Selvadoradian Culture",
  "Herbalism",
  "Parenting",
  "Wellness",
  "Vampire Lore",
  "Pipe Organ",
  "Pottery",
  "Tattooing",
  "Apothecary",
  "Natural Living",
];

export const skills = skillNames.map((name) => {
  const value = name
    .toLowerCase()
    .replace(/[\s&]/g, "_")
    .replace(/[^a-z0-9]/g, "_");
  const iconPath = `/src/assets/images/skills/${value}.png`;

  return {
    name: name,
    value: value,
    icon: iconPath,
  };
});

export enum GENDER {
  Male = 1,
  Female = 2,
  Other = 3,
}

export enum CONDITION {
  Alive = 1,
  Dead = 2,
}

export enum OCCULT {
  Sim = 1,
  Servos = 2,
  Plant = 3,
  Ghost = 4,
  Alien = 5,
  Spellcaster = 6,
  Mermaid = 7,
  Vampire = 8,
  Werewolve = 9,
  Skeleton = 10,
  Fairy = 11,
}

export const relationship = [
  {
    label: "Divorced",
    value: 1,
    icon: <FaHeartBroken />,
    relationships: { target: 1, source: 1 },
  },
  {
    label: "Spouse",
    value: 2,
    icon: <GiLovers />,
    relationships: { target: 2, source: 2 },
  },
  {
    label: "Sibling",
    value: 3,
    icon: <FaUsers />,
    relationships: { target: 3, source: 3 },
  },
  {
    label: "Parents",
    value: 4,
    icon: <FaUserTie />,
    relationships: { target: 5, source: 4 },
  },
  {
    label: "Child",
    value: 5,
    icon: <FaChild />,
    relationships: { target: 4, source: 5 },
  },
];
