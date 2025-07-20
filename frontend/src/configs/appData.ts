import CustomEdge from "@components/edge/CustomEdge";
import PetNode from "@components/node/PetNode";
import SimNode from "@components/node/SimNode";

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
