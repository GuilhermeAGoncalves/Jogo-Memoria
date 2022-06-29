import * as C from "./Button.style";

type Props = {
  children: string;
  icon?: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ children, icon, onClick }: Props) => {
  return (
    <C.Button role={"button"} onClick={onClick}>
      {icon && (
        <C.IconArea>
          <C.Icon src={icon} />
        </C.IconArea>
      )}
      <C.Label>{children}</C.Label>
    </C.Button>
  );
};
