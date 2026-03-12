import STYLES from "./formMesssage.module.scss";
type FormMessageType = React.PropsWithChildren & {
  status: number;
};
type FormMessageInputs = {
  status: number;
  message: string;
} | null;
export default function FormMessage(props: FormMessageType) {
  return (
    <div
      className={`${STYLES.formMessage} ${props.status >= 200 && props.status < 300 ? STYLES.success : STYLES.fail}`}
    >
      <p>{props.children}</p>
    </div>
  );
}

export type { FormMessageInputs };
