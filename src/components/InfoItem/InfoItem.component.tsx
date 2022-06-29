import * as C from "./InfoItem.style";

type Props = {
  children: string;
  value: string;
};

export const InfoItem = ({ children, value }: Props) => {
  return (
    <C.Container>
      <C.Label>{children}</C.Label>
      <C.Value>{value}</C.Value>
    </C.Container>
  );
};
