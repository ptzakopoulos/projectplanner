type ButtonProps = {
  children: React.ReactNode;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  className?: string;
  type: "minimal" | "styled" | "submit";
};
export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props?.onClick}
      className={`${props.className} ${props.type}`}
    >
      {props.children}
    </button>
  );
}
