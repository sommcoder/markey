import NavBar from "./components/NavBar/NavBar.jsx";
import TableContainer from "./components/TableContainer/TableContainer.jsx";
import KeySet from "./components/KeySet/KeySet.jsx";
import Modal from "./components/Modal/Modal.jsx";
/////////////////////////////////////////
import { useState, useReducer, forwardRef, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
/////////////////////////////////////////

import { useQuery } from "@tanstack/react-query";

import { getCharacterStock } from "./api/api.js";

export default function App() {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ["get-characters"],
    queryFn: getCharacterStock, // no parentheses!
  }); // makes MULTIPLE retry queries automatically if query fails.

  // fetchOnWindowFocus();
  // MODAL POPUP STATE:
  const [modalState, toggleModal] = useState(false);

  // form element reference Object:
  const refStateObj = {
    West: useRef(null),
    East: useRef(null),
    South: useRef(null),
  };

  // [{ ltr: quantity }]
  // Going to try and hold ALL of the app state here and not divide the individual rows into the state of the individual marquee.
  const InitAppState = {
    West: {
      rows: {
        row0: [], // [[ltr, size], [ltr, size], [ltr, size]]
        row1: [],
        row2: [],
      },
      output: {}, // this is the "all-day" tally {ltr: count}
    },
    East: {
      rows: {
        row0: [],
        row1: [],
        row2: [],
      },
      output: {},
    },
    South: {
      rows: {
        row0: [],
        row1: [],
        row2: [],
      },
      output: {},
    },
  };

  // String state that gets set by switchSelectedMarq(marqName)
  const [selectedMarq, switchSelectedMarq] = useState("");
  // row0, row1, row2
  const [selectedRow, switchSelectedRow] = useState("");

  console.log("selectedRow:", selectedRow);

  const reducer = (state, action) => {
    if (!action.payload) return state;
    console.log("appREDUCER: action.payload:", action.payload);

    // let marqName = Object.keys(action.payload).join();

    switch (action.type) {
      case "set": {
        return { ...state, ...action.payload };
      }
      // case "compare": {
      //   return { ...state, ...action.payload.count };
      // }
      default:
        return state;
    }
  };

  const [appState, dispAppState] = useReducer(reducer, InitAppState);

  // in rem
  const marqSizes = {
    East: 42,
    West: 42,
    South: 84,
  };

  // look into creating dark-mode functionality here
  const theme = {
    dark: {},
    light: {},
  };

  const marKeysArr = Object.keys(appState);

  /*
   
  1) each time appState changes, we need to go through the appState[marqName]
  2) How can we detect ONLY the keys that have changed? This is through the action.payload right?
  3) useEffect(() => action.payload) to determine remaining stock of each character
   
  */

  // TOP level handlekey click. we need to pass the key clicks down to StockTracker
  // we also need to be able to PUSH up the onClick of spe
  function handleKeyDown(ev) {
    console.log("ev:", ev);

    ev.key;
    selectedMarq;
    selectedRow;
    console.log("selectedMarq:", selectedMarq);
    console.log("selectedRow:", selectedRow);
    console.log("refStateObj:", refStateObj);
    console.log(
      "typeof refStateObj[selectedMarq].current:",
      typeof refStateObj[selectedMarq].current
    );
    let rowIndex = refStateObj[selectedMarq].current.findIndex((el) => {
      console.log("el:", el);
      el.dataset.rowid === selectedRow;
    });

    console.log("rowIndex:", rowIndex);
  }

  function handleClick(ev) {
    // FIRSTLY, ensure that only buttons from KeySet are handled here
    if (!ev.target.value) return;
    console.log("ev:", ev);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer
        onKeyDown={(ev) => handleKeyDown(ev)}
        onClick={(ev) => handleClick(ev)}
      >
        {toggleModal ? (
          <Modal
            modalState={modalState}
            toggleModal={toggleModal}
            appState={appState}
          />
        ) : (
          ""
        )}
        <NavBar />
        <TableContainer
          ref={refStateObj}
          data={data}
          marKeysArr={marKeysArr}
          appState={appState}
          dispAppState={dispAppState}
          selectedRow={selectedRow}
          switchSelectedRow={switchSelectedRow}
          selectedMarq={selectedMarq}
          switchSelectedMarq={switchSelectedMarq}
          marqSizes={marqSizes}
        />
        <KeySet
          data={data}
          appState={appState}
          dispAppState={dispAppState}
          marqSizes={marqSizes}
          selectedMarq={selectedMarq}
          selectedRow={selectedRow}
          switchSelectedRow={switchSelectedRow}
          refStateObj={refStateObj}
        />
      </StyledAppContainer>
    </ThemeProvider>
  );
}

const StyledAppContainer = styled.div`
  margin: 0 auto;
  padding-top: 1rem;
  align-content: center;
  align-items: center;
  max-width: 100%;
  height: 100vh;
  width: 100%;
  background-color: white;
`;
