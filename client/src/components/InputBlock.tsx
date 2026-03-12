interface InputBase {
  name: string;
  label?: string;
  onClick?: (
    e: React.MouseEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onKeyUp?: (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onFocus?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

type InputBlockProps = InputBase &
  (
    | { type: "text"; value?: string }
    | { type: "password"; value?: string }
    | { type: "email"; value?: string }
    | { type: "textarea"; value?: string }
    | { type: "number"; value?: number }
    | { type: "select"; value?: string; options: string[] }
    | { type: "file"; value?: null; accept: string }
  );

export default function InputBlock(props: InputBlockProps) {
  const {
    name,
    label,
    type,
    value,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
  } = props;

  const eventHandlers = {
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
  };

  if (type === "select" && "options" in props) {
    return (
      <div className="input-block">
        <label htmlFor={name}>{label ?? name}</label>
        <select name={name} id={name} value={value} {...eventHandlers}>
          {props.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="input-block">
        <label htmlFor={name}>{label ?? name}</label>
        {value ? (
          <textarea name={name} id={name} value={value} {...eventHandlers} />
        ) : (
          <textarea name={name} id={name} {...eventHandlers} />
        )}
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className="input-block">
        <label htmlFor={name}>{label ?? name}</label>
        <input
          type={type}
          name={name}
          id={name}
          accept={props.accept}
          {...eventHandlers}
        />
      </div>
    );
  }

  if (type === "password") {
    return (
      <div className="input-block">
        <label htmlFor={name}>{label ?? name}</label>
        {value ? (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            {...eventHandlers}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            {...eventHandlers}
          />
        )}
      </div>
    );
  }

  return (
    <div className="input-block">
      <label htmlFor={name}>{label ?? name}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        {...eventHandlers}
      />
    </div>
  );
}
