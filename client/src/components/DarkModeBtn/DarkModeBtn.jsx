import { styled } from "styled-components";
import { CiLight } from "react-icons/ci";

export default function DarkModeBtn({ setTheme, theme }) {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const style = {
    height: "2rem",
    width: "2rem",
    color: "black",
    backgroundColor: "transparent",
  };

  return (
    <StyledDarkModeBtn onClick={toggleTheme}>
      <StyledCircle>
        <CiLight style={style} />
      </StyledCircle>
    </StyledDarkModeBtn>
  );
}

const StyledDarkModeBtn = styled.div`
  background-color: #b6d0e2;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 30px;
  width: 5.25rem;
  height: 2.5rem;
  left: 4rem;
  top: 30%;
  &:hover {
    cursor: pointer;
  }
`;

const StyledCircle = styled.div`
  border-radius: 30px;
  position: absolute;
  left: 0rem;
  width: 2.35rem;
  height: 2.35rem;
  transform: ${({ theme }) =>
    theme === "dark" ? "translateX(120%)" : "translateX(0%)"};
  background-color: rgb(253, 243, 229);
  // handles the icon:
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(95%);
  }
`;
