import styled from "styled-components";

type ContainerProps = {
  showBackground: boolean;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => (props.showBackground ? "#647d8b;" : "#000;")};

  height: 100px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #647d8b;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
`;
