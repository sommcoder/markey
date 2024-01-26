import styled from "styled-components";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn";
import InventoryOverlay from "../InventoryOverlay/InventoryOverlay";

import { useState } from "react";

export default function NavBar({
  data,
  refStateObj,
  keysArr,
  appState,
  dispAppState,
  setTheme,
  theme,
  setOutputProcess,
}) {
  // inventory menu state:
  const [menuState, toggleMenuState] = useState(false);
  console.log("data:", data);
  return (
    <StyledNavBar>
      <StyledLeftNavArea>
        <DarkModeBtn setTheme={setTheme} theme={theme} />
      </StyledLeftNavArea>
      <StyledHeader
        src="/mar-key logo.svg"
        style={{
          height: "6rem",
          width: "30rem",
        }}
      />
      <StyledRightNavArea>
        <SetCurrBtn
          data={data}
          refStateObj={refStateObj}
          keysArr={keysArr}
          appState={appState}
          dispAppState={dispAppState}
          setOutputProcess={setOutputProcess}
        />
        <HamburgerMenu
          menuState={menuState}
          toggleMenuState={toggleMenuState}
        />
      </StyledRightNavArea>
      {menuState ? (
        <InventoryOverlay
          data={data}
          menuState={menuState}
          toggleMenuState={toggleMenuState}
        />
      ) : (
        ""
      )}
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  align-items: center;
  position: relative;
  display: block;
  width: 100%;
  font-size: 4rem;
  font-weight: 650;
  margin: 0 auto;
  text-align: center;
  border-bottom: 0.1rem solid lightgrey;
  height: 6rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`;

const StyledHeader = styled.img`
  height: 100%;
`;

const StyledRightNavArea = styled.span`
  right: 2rem;
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 40rem;
  justify-content: end;
  gap: 5rem;
  top: 50%;
  transform: translateY(-50%);
  align-items: center;
`;

const StyledLeftNavArea = styled.span`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 40rem;
  top: 30%;
  align-items: left;
`;
