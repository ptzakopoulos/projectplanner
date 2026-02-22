type AddButtonProps = {
  children: React.ReactNode;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  className?: string;
  color: "blue" | "gray";
};
export default function AddButton(props: AddButtonProps) {
  return (
    <button
      onClick={props?.onClick}
      className={`${props.className} ${props.color}`}
    >
      {props.children}
    </button>
  );
}
