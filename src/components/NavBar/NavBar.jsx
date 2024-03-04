import styled from "styled-components";
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn";
import InformationBtn from "../InformationBtn/InformationBtn";

import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";

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
  setValidationObj,
  menuState,
  toggleMenuState,
}) {
  // console.log("data:", data);
  return (
    <StyledNavBar>
      <StyledLeftNavArea>
        <DarkModeBtn setTheme={setTheme} theme={theme} />
        <InformationBtn />
      </StyledLeftNavArea>
      <StyledHeader
        src="/mar-key logo.svg"
        style={{
          height: "6rem",
          maxWidth: "25rem",
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
          setValidationObj={setValidationObj}
        />
        <HamburgerMenu
          menuState={menuState}
          toggleMenuState={toggleMenuState}
        />
      </StyledRightNavArea>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  font-size: 4rem;
  font-weight: 650;
  text-align: center;
  border-bottom: 0.1rem solid lightgrey;
  height: 6rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`;

const StyledHeader = styled.img`
  height: 100%;
  justify-self: center;
`;

const StyledLeftNavArea = styled.span`
  display: flex;
  margin-left: 4rem;
  gap: 3rem;
  justify-content: start;
  align-items: left;
`;

const StyledRightNavArea = styled.span`
  display: flex;
  margin-right: 4rem;
  gap: 3rem;
  justify-content: end;
  justify-items: center;
  align-content: center;
  justify-items: center;
`;
