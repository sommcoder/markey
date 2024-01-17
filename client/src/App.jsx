import NavBar from "./components/NavBar/NavBar.jsx";
import TableContainer from "./components/TableContainer/TableContainer.jsx";
import KeySet from "./components/KeySet/KeySet.jsx";
import Modal from "./components/Modal/Modal.jsx";
/////////////////////////////////////////
import { useState, useReducer, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
/////////////////////////////////////////
import { useQuery } from "@tanstack/react-query";
/////////////////////////////////////////
import { getCharacterStock } from "./api/api.js";
/////////////////////////////////////////
import setCurrMarquee from "./functions/setCurrMarquee.js";
import getNextElNum from "./functions/getNextElNum.js";
import getTally from "./functions/getTally.js";
/////////////////////////////////////////
export default function App() {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ["get-characters"],
    queryFn: getCharacterStock, // no parentheses!
  }); // makes MULTIPLE retry queries automatically if query fails.

  // TODO: the special characters don't have accurate blockWidths. You'll need to review the physcial stock in the theatre.

  // fetchOnWindowFocus();
  // MODAL POPUP STATE:
  const [modalState, toggleModal] = useState(false);

  // form element reference Object. Populated via forwardRef() hook
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
        0: [], // [[ltr, size], [ltr, size]...]
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
  const [selectedMarq, switchSelectedMarq] = useState(null);
  // we can then concat and coerce with 'row': 0, 1, 2
  const [selectedRow, switchSelectedRow] = useState(null);
  // null until user submits something:
  const [stateOutputObj, setStateOutputObj] = useState(null);
  // "set" or "compare" or null
  const [outputProcess, setOutputProcess] = useState(null);
  // primary state control:
  const [appState, dispAppState] = useReducer(reducer, InitAppState);

  // gets concatenated to rem. needs to be calculated therefore is number
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

  const keysArr = [0, 1, 2]; // should probably be named to "rowsArr"

  function reducer(state, action) {
    if (!action.payload) return state;
    console.log("appREDUCER: action.payload:", action.payload);

    switch (action.type) {
      case "input": {
        console.log("INPUT Payload:", action.payload);
        // set should update appState (as it is)
        // StockTracker should then use appState to lookup the values in data and render the difference (charAvail - charSelect = charRender)

        // assign the action.payload to the selectedMarq, only updating that child object and not the other two marquee objects
        // TODO: currently the app state appears to be fully REPLACING all of the marquees... need to fix
        return { ...state, [selectedMarq]: action.payload };
      }
      case "set": {
        // TODO: set should only be a function after SUBMIT. They should do different things. Right now we're trying to make it do the same thing and it's making this process excessively complicated. "set" should just update state

        // "set" sets the CURRENT APP STATE
        console.log("SET state:", state);
        const tallyObj = getTally(state);

        console.log("REDUCER: tallyObj:", tallyObj);
        // "set" sets to the currOutput
        setStateOutputObj({
          currOutput: tallyObj,
          newOutput: {},
        });
        setOutputProcess("set");
        switchSelectedMarq(null);
        switchSelectedRow(null);
        toggleModal(true);

        return { ...state, ...action.payload };
      }
      case "compare": {
        console.log("REDUCER action.payload:", action.payload);
        const tallyObj = getTally(action.payload);
        // "compare" sets to newOutput and
        // currOutput would stay the same
        setStateOutputObj({
          currOutput: stateOutputObj.currOutput,
          newOutput: tallyObj,
        });
        setOutputProcess("compare");
        switchSelectedMarq(null);
        switchSelectedRow(null);
        toggleModal(true);

        return { ...state, ...action.payload.count };
      }
      default:
        return state;
    }
  }

  // NOT state. Client-side validation via onKeyDown/onClick events:
  const inputValidationObj = {
    0: { values: [], sizes: 0 },
    1: { values: [], sizes: 0 },
    2: { values: [], sizes: 0 },
  };

  // kind of a silly solution but it works:
  // function setSingleMarquee(keysArr, formEl, data) {
  //   return {
  //     [selectedMarq]: setCurrMarquee(keysArr, formEl, data),
  //   };
  // }

  function inputValidation(ev) {
    if (!selectedMarq) return; // no selected marq?

    let key;
    ev.type === "click" ? (key = ev.target.value) : (key = ev.key);

    const formEl = refStateObj[selectedMarq].current;
    // const rowEl = refStateObj[selectedMarq].current[selectedRow];
    const rowStr = refStateObj[selectedMarq].current[selectedRow].name;

    if (key === " ") ev.preventDefault(); // is this right?
    if (key === "Enter") {
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
        // dispatch reducer:
        dispAppState({
          type: "input",
          payload: setCurrMarquee(keysArr, formEl, data),
        });
        //  switch to next row:
        switchSelectedRow(getNextElNum(rowStr, selectedRow));
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // init state

  // handles device size issue:
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup the event listener on component unmount
    };
  }, []); // Empty dependency array means this effect will only run once on mount..?

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <div id="firebaseui-auth-container" /> */}
      {windowWidth > 775 ? (
        <StyledAppContainer
          onKeyDown={(ev) => inputValidation(ev)}
          onClick={(ev) => inputValidation(ev)}
        >
          {toggleModal ? (
            <Modal
              modalState={modalState}
              toggleModal={toggleModal}
              appState={appState}
              marKeysArr={marKeysArr}
              data={data}
              stateOutputObj={stateOutputObj}
              outputProcess={outputProcess}
            />
          ) : (
            ""
          )}
          <NavBar
            data={data}
            refStateObj={refStateObj}
            keysArr={keysArr}
            appState={appState}
            dispAppState={dispAppState}
            selectedMarq={selectedMarq}
            switchSelectedMarq={switchSelectedMarq}
            selectedRow={selectedRow}
            switchSelectedRow={switchSelectedRow}
            stateOutputObj={stateOutputObj}
            setStateOutputObj={setStateOutputObj}
          />
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
      ) : (
        <StyledErrorContainer>
          <StyledErrorMessage>
            <h5
              style={{
                textAlign: "center",
                fontWeight: "800",
                textDecoration: "underline",
                paddingBottom: "1rem",
                margin: "0 auto",
              }}
            >
              Minimum Screen Size Error:
            </h5>
            <p
              style={{
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              Your screen must be at least 775px wide
            </p>
          </StyledErrorMessage>
        </StyledErrorContainer>
      )}
    </ThemeProvider>
  );
}

const StyledAppContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(3, auto);
  align-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: white;
  overflow-x: scroll;
`;

// TODO: there is a gap on the right side of the app. I don't want to remove overflow-x scrolling specially for smaller screen sizes.Could probably be a vw styling on a child component

const StyledErrorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  margin: 0 auto;
  background-image: url("/paradise-vintage.jpeg");
`;

const StyledErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  padding: 2rem;
  display: grid;
  text-align: center;
  font-size: 2rem;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 30px;
`;
