import { styled } from "styled-components";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

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
      <StyledCircle data-dark={theme === "dark" ? true : false}>
        {theme === "dark" ? (
          <CiDark style={style} />
        ) : (
          <StyledLightIcon
            style={style}
            data-dark={theme === "dark" ? true : false}
          />
        )}
      </StyledCircle>
    </StyledDarkModeBtn>
  );
}

const StyledDarkModeBtn = styled.div`
  background-color: #b6d0e2;
  border: 1px solid black;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 30px;
  width: 5.25rem;
  height: 2.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const StyledCircle = styled.div`
  border-radius: 30px;
  position: absolute;
  width: 2.35rem;
  height: 2.35rem;
  background-color: rgb(253, 243, 229);
  // handles the icon:
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 250ms linear; // transition back
  &:hover {
    filter: brightness(95%);
  }

  &[data-dark="true"] {
    transform: translateX(120%);
    transition: transform 250ms linear;
  }
`;

const StyledLightIcon = styled(CiLight)`
  transition: transform 800ms linear;
  &[data-dark="true"] {
    opacity: 0%;
    transition: transform 500ms linear, opacity 250ms linear;
    transform: translateY(-100%); // transition down
  }
`;
