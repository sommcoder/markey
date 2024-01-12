import NavBar from "./components/NavBar/NavBar.jsx";
import TableContainer from "./components/TableContainer/TableContainer.jsx";
import KeySet from "./components/KeySet/KeySet.jsx";
import Modal from "./components/Modal/Modal.jsx";
/////////////////////////////////////////
import { useState, useReducer, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
/////////////////////////////////////////
import { useQuery } from "@tanstack/react-query";
/////////////////////////////////////////
import { getCharacterStock } from "./api/api.js";
import setCurrMarquee from "./functions/setCurrMarquee.js";
import getNextElNum from "./functions/getNextElNum.js";
/////////////////////////////////////////
export default function App() {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ["get-characters"],
    queryFn: getCharacterStock, // no parentheses!
  }); // makes MULTIPLE retry queries automatically if query fails.

  // TODO: the special characters don't have accurate blockWidths

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
        0: [], // [[ltr, size], [ltr, size], [ltr, size]]
        1: [],
        2: [],
      },
      output: {}, // this is the "all-day" tally {ltr: count}
    },
    East: {
      rows: {
        0: [],
        1: [],
        2: [],
      },
      output: {},
    },
    South: {
      rows: {
        0: [],
        1: [],
        2: [],
      },
      output: {},
    },
  };

  // String state that gets set by switchSelectedMarq(marqName)
  const [selectedMarq, switchSelectedMarq] = useState();
  // int: 0, 1, 2
  // we can then concat and coerce with 'row'.
  const [selectedRow, switchSelectedRow] = useState();

  const keysArr = [0, 1, 2];

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

  // NOT state. Just allows for client-side validation via onKeyDown event:
  const inputValidationObj = {
    0: { values: [], sizes: 0 },
    1: { values: [], sizes: 0 },
    2: { values: [], sizes: 0 },
  };

  // TOP level handlekey click. we need to pass the key clicks down to StockTracker
  // we also need to be able to PUSH up the onClick of spe

  function inputValidation(ev) {
    if (!selectedMarq) return; // no selected marq?

    let key;
    ev.type === "click" ? (key = ev.target.value) : (key = ev.key);

    const formEl = refStateObj[selectedMarq].current;
    // const rowEl = refStateObj[selectedMarq].current[selectedRow];
    const rowStr = refStateObj[selectedMarq].current[selectedRow].name;

    if (key === " ") ev.preventDefault(); // is this right?
    if (key === "Enter") {
      console.log(
        "inputValidationObj[rowStr].values:",
        inputValidationObj[rowStr].values
      );

      if (inputValidationObj[rowStr].values.length === 0) {
        // loop through the other rows to double check.. user could have inputted a row but tabbed to a new row before entering/clicking Set

        if (
          !Object.keys(inputValidationObj).some(
            (row) => inputValidationObj[row].values.length > 0
          )
        )
          // Error: "No Characters Entered into Marquee"
          return;
      } else {
        switchSelectedRow(getNextElNum(rowStr, selectedRow));
        // dispatch reducer:
        dispAppState({
          type: "set",
          payload: setCurrMarquee(
            keysArr,
            formEl,
            appState,
            data,
            selectedMarq
          ),
        });
        return;
      }
    }
    // tab creates some weird functionality with selecting text
    if (key === "Tab") return;

    if (key === "Backspace" || key === "Delete") {
      if (inputValidationObj[rowStr].sizes === 0) {
        return;
      }
      // update validation Object sizes:
      inputValidationObj[rowStr].sizes -=
        +data[inputValidationObj[rowStr].values.at(-1)].size;
      // pop from sequence:
      inputValidationObj[rowStr].values.pop();
      // update the selected input field:
      refStateObj[selectedMarq].current[selectedRow].value =
        inputValidationObj[rowStr].values.join("");
      return;
    }
    if (!data[key]) return; // key doesn't exist in data

    // 0.1 = accounts for block border size
    let currBlockSize = +data[key].size + 0.1;
    // Max capacity check:
    // existing width + current block size would be greater than the marqSize
    if (
      inputValidationObj[rowStr].sizes + currBlockSize >
      marqSizes[selectedMarq]
    ) {
      refStateObj[selectedMarq].current[rowStr].animate(
        [
          {
            transform: "translateX(-0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
        ],
        { duration: 150, iterations: 3 }
      );
      return;
    }
    // append validation object:
    inputValidationObj[rowStr].sizes += currBlockSize;
    // push to sequence:
    inputValidationObj[rowStr].values.push(key);
    // update input field:
    refStateObj[selectedMarq].current[selectedRow].value =
      inputValidationObj[rowStr].values.join("");
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer
        onKeyDown={(ev) => inputValidation(ev)}
        onClick={(ev) => inputValidation(ev)}
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
          keysArr={keysArr}
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
