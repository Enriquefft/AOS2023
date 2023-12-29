import LikeButton from "./LikeButton";

type HeaderProps = {
  readonly title?: string;
};
const getHeader = ({ title = "tit" }: HeaderProps) => (
  <h1>{title ? title : "Default title"}</h1>
);

export default function homePage(): unknown {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  return (
    <div>
      {getHeader({})}
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <LikeButton />
    </div>
  );
}
