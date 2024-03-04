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
  grid-template-columns: auto auto auto;
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
  width: 20rem;
  justify-self: center;
`;

const StyledLeftNavArea = styled.span`
  display: flex;
  margin-left: 4rem;
  flex-direction: row;
  gap: 4.5rem;
  width: 30rem;
  align-items: center;
  align-items: left;
`;

const StyledRightNavArea = styled.span`
  right: 2rem;
  display: flex;
  flex-direction: row;
  width: 40rem;
  justify-content: end;
  gap: 5rem;
  align-items: right;
`;
