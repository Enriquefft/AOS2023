import { FrownIcon, SmileIcon, FilePlus2Icon, BookIcon } from "lucide-react";

const iconWidth = 2;
const iconSize = 32;

const CARD_TYPES = {
  total: {
    title: "Total Childs",
    Icon: (
      <BookIcon
        color="cornflowerblue"
        strokeWidth={iconWidth}
        size={iconSize}
      />
    ),
  },
  nice: {
    title: "Nicest Child",
    Icon: <SmileIcon color="green" strokeWidth={iconWidth} size={iconSize} />,
  },
  naughty: {
    title: "Naughtiest Child",
    Icon: <FrownIcon color="red" strokeWidth={iconWidth} size={iconSize} />,
  },
  yours: {
    title: "Added by you",
    Icon: (
      <FilePlus2Icon color="yellow" strokeWidth={iconWidth} size={iconSize} />
    ),
  },
} as const;

type CardProps = {
  type: keyof typeof CARD_TYPES;
  value: string;
  description: string;
};

/**
 *
 * @param root0
 * @param root0.type
 * @param root0.value
 * @param root0.description
 */
export default function Card({
  type,
  value,
  description,
}: Readonly<CardProps>) {
  const { title, Icon } = CARD_TYPES[type];

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
      <div className="w-full flex justify-between">
        <span className="text-xl">{title}</span>
        {Icon}
      </div>
      <h3 className="text-3xl">{value}</h3>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}
