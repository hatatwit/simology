import CustomEdge from "@components/edge/CustomEdge";
import PetNode from "@components/node/PetNode";
import SimNode from "@components/node/SimNode";
import {
  FaBaby,
  FaChild,
  FaFemale,
  FaHeartBroken,
  FaMale,
  FaUserCog,
  FaUserFriends,
  FaUserMinus,
  FaUserPlus,
  FaUsers,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";

import {
  GiAlienBug,
  GiBabyBottle,
  GiDeathSkull,
  GiDiamondRing,
  GiFamilyHouse,
  GiFamilyTree,
  GiHearts,
  GiHeartWings,
  GiLoveMystery,
  GiLovers,
  GiNestedHearts,
  GiSpikedCollar,
  GiTrade,
} from "react-icons/gi";

import { BsPersonHeart } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const nodeTypes = {
  sim: SimNode,
  pet: PetNode,
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
  { label: "Divorced", value: 1, icon: <FaHeartBroken /> },
  { label: "Engaged", value: 2, icon: <GiDiamondRing /> },
  { label: "Flirt", value: 3, icon: <GiHearts /> },
  { label: "Ex", value: 4, icon: <IoMdCloseCircleOutline /> },
  { label: "Friends", value: 5, icon: <FaUserFriends /> },
  { label: "Spouse", value: 6, icon: <GiLovers /> },
  { label: "Partner", value: 7, icon: <GiHeartWings /> },
  { label: "Sibling", value: 8, icon: <FaUsers /> },
  { label: "Cousin", value: 9, icon: <GiFamilyHouse /> },
  { label: "Aunt", value: 10, icon: <FaFemale /> },
  { label: "Uncle", value: 11, icon: <FaMale /> },
  { label: "Abduction by UFO", value: 12, icon: <GiAlienBug /> },
  { label: "Widow/Widower", value: 13, icon: <GiDeathSkull /> },
  { label: "Parent", value: 14, icon: <FaUserTie /> },
  { label: "Child", value: 15, icon: <FaChild /> },
  { label: "Grandparent", value: 16, icon: <GiFamilyTree /> },
  { label: "Grandchild", value: 17, icon: <GiBabyBottle /> },
  { label: "Niece", value: 18, icon: <FaUserPlus /> },
  { label: "Nephew", value: 19, icon: <FaUserMinus /> },
  { label: "Enemy", value: 20, icon: <GiSpikedCollar /> },
  { label: "Crush", value: 21, icon: <GiLoveMystery /> },
  { label: "Fiancé", value: 22, icon: <BsPersonHeart /> },
  { label: "Step-parent", value: 23, icon: <FaUserShield /> }, // protector
  { label: "Half-sibling", value: 24, icon: <GiTrade /> },
  { label: "Adoptive Parent", value: 25, icon: <FaUserCog /> },
  { label: "Adoptive Child", value: 26, icon: <FaBaby /> },
  { label: "Great Grandparent", value: 27, icon: <GiNestedHearts /> },
];
