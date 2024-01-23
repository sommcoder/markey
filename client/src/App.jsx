import NavBar from "./components/NavBar/NavBar.jsx";
import TableContainer from "./components/TableContainer/TableContainer.jsx";
import KeySet from "./components/KeySet/KeySet.jsx";
import Modal from "./components/Modal/Modal.jsx";
/////////////////////////////////////////
import { useState, useReducer, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./GlobalStyles";
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

  // TODO: the special characters don't have accurate blockWidths. You'll need to review the physical stock in the theatre.

  // TODO: still need to figure out updating stockTracker and then also the side menu and how to adjust character sizing and stock in case the user gets more or some break/get lost
  // fetchOnWindowFocus();

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
  // * Main App State *: //
  /////////////////////////////////////////////
  // popup modal = the apps output
  const [modalState, toggleModal] = useState(false);
  // String state that gets set by switchSelectedMarq(marqName)
  const [selectedMarq, switchSelectedMarq] = useState(null);
  // we can then concat and coerce with 'row': 0, 1, 2
  const [selectedRow, switchSelectedRow] = useState(null);
  // null until user submits something:
  const [stateOutputObj, setStateOutputObj] = useState(null);
  // "set" or "compare" or "input" or null
  const [outputProcess, setOutputProcess] = useState(null);
  // primary state control:
  const [appState, dispAppState] = useReducer(reducer, InitAppState);
  // window Sizing Check:
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // "light" or "dark"
  const [theme, setTheme] = useState("light");
  // form element reference Object. Populated via forwardRef() hook
  const refStateObj = {
    West: useRef(null),
    East: useRef(null),
    South: useRef(null),
  };
  //////////////////////////////////////////////
  const marqSizes = {
    East: 42,
    West: 42,
    South: 84,
  };
  const marKeysArr = Object.keys(appState);
  const keysArr = [0, 1, 2]; // should probably be named to "rowsArr"

  // NOT state. Client-side validation via onKeyDown/onClick events:
  const inputValidationObj = { values: [], sizes: 0 };

  const specialBtnsArr = ["Enter", "Backspace", "Delete", "CapsLock", "Tab"];

  function prepareKey(ev) {
    let key = ev.type === "click" ? ev.target.value : ev.key;
    if (!key) return; // undefined input clause
    if (specialBtnsArr.includes(key)) return key;
    let lowerKey = key.toLowerCase();
    if (ev.target.dataset.special) return `{${lowerKey}}`;
    return lowerKey;
  }

  function inputValidation(ev) {
    ev.preventDefault(); // prevents the Enter key from "clicking" the focused KeySet Key
    if (!selectedMarq) return; // no selected marq?
    console.log("ev:", ev);
    console.log("ev.target.dataset.special:", ev.target.dataset.special);
    console.log("ev.target:", ev.target);
    console.log("ev.type:", ev.type);
    console.log("ev.target.value:", ev.target.value);

    // so because of focus event. Enter is submitting the key, which is special, however, it isn't a 'click' event, therefore ev.key === 'Enter' which is why we're getting key = 'enter'
    const special = ev.target.dataset.special;
    const key = prepareKey(ev);

    if (!key) return;

    console.log("key:", key);

    let formEl = refStateObj[selectedMarq].current;
    // const rowEl = refStateObj[selectedMarq].current[selectedRow];
    let rowName = refStateObj[selectedMarq].current[selectedRow].name;

    if (key === " ") ev.preventDefault(); // is this right?
    if (key === "CapsLock") {
      // popup warning indicating that the CAPSLOCK is on
    }
    if (key === "Enter") {
      // dispatch reducer:
      dispAppState({
        type: "INPUT_MARQUEE",
        marq: selectedMarq,
        payload: setCurrMarquee(
          keysArr,
          formEl,
          data,
          appState[selectedMarq] // no marqName just the obj contents
        ),
      });
      setOutputProcess("input");
      switchSelectedRow(getNextElNum(rowName, selectedRow));
      return;
    }
    // tab creates some weird functionality with selecting text
    if (key === "Tab") {
      // popup warning that " Tab is disabled in Mar-Key ""
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      console.log("key:", key);
      console.log("inputValidationObj:", inputValidationObj);
      if (inputValidationObj.sizes === 0) {
        return;
      }
      // update validation Object sizes:
      inputValidationObj.sizes -= +data[inputValidationObj.values.at(-1)].size;
      // pop from sequence:
      inputValidationObj.values.pop();
      // update the selected input field:
      refStateObj[selectedMarq].current[selectedRow].value =
        inputValidationObj.values.join("");
      return;
    }
    if (!data.regular[key] && !data.special[key]) {
      console.log("key does not exist in data regular or special");
      return;
      // key doesn't exist in data
      // should produce an Error message
    }

    //* keyDown or click functions below:
    // 0.1 = accounts for block border size
    // special or not?
    let currBlockSize = +data[special ? "special" : "regular"][key].size + 0.1;
    // Max capacity check:
    // existing width + current block size would be greater than the marqSize
    if (inputValidationObj.sizes + currBlockSize > marqSizes[selectedMarq]) {
      refStateObj[selectedMarq].current[rowName].animate(
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

    // console.log("refStateObj:", refStateObj);
    // TODO: we need to get all of the keys to work properly. The current implementation is treating them all as individual characters but what we want is to handle these "special keys" as the SINGLE tiles that they are

    // append validation object:
    inputValidationObj.sizes += currBlockSize;
    // push to sequence:
    inputValidationObj.values.push(key);
    // update input field:
    refStateObj[selectedMarq].current[selectedRow].value =
      inputValidationObj.values.join("");

    console.log("inputValidationObj:", inputValidationObj);
  }

  // SCREEN SIZE:
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup the event listener on component unmount
    };
  }, []); // run once on componentDidMount()

  // OUTPUT PROCESS SIDE-EFFECTS:
  useEffect(() => {
    if (outputProcess === "set") {
      setStateOutputObj({
        currOutput: getTally(appState),
        newOutput: {},
      });
      // reset:
      switchSelectedMarq(null);
      switchSelectedRow(null);
      toggleModal(true);
    }
  }, [outputProcess, appState]);

  console.log("appState:", appState);

  return (
    // specifies which
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      {/* <div id="firebaseui-auth-container" /> */}
      {windowWidth > 775 ? (
        <StyledAppContainer
          onKeyDown={(ev) => inputValidation(ev)}
          onClick={(ev) => inputValidation(ev)}
          onFocus={(ev) => ev.preventDefault()}
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
            setOutputProcess={setOutputProcess}
            setTheme={setTheme}
            theme={theme}
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
          {isSuccess ? <KeySet data={data} /> : ""}
        </StyledAppContainer>
      ) : (
        <StyledErrorContainer>
          <StyledErrorComponent>
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
          </StyledErrorComponent>
        </StyledErrorContainer>
      )}
    </ThemeProvider>
  );
}

function reducer(state, action) {
  if (!action.payload) return state;
  console.log("appREDUCER: action.payload:", action.payload);

  switch (action.type) {
    case "INPUT_MARQUEE": {
      return { ...state, [action.marq]: action.payload };
    }
    case "SET_APP": {
      return { ...state, ...action.updatedState };
    }
    // case "COMPARE_PREVIOUS_STATE": {
    //   console.log("REDUCER action.payload:", action.payload);
    //   const tallyObj = getTally(action.payload);
    //   // "compare" sets to newOutput and
    //   // currOutput would stay the same
    //   setStateOutputObj({
    //     currOutput: stateOutputObj.currOutput,
    //     newOutput: tallyObj,
    //   });
    //   setOutputProcess("compare");
    //   switchSelectedMarq(null);
    //   switchSelectedRow(null);
    //   toggleModal(true);

    //   return { ...state, ...action.payload.count };
    // }
    default:
      return state;
  }
}

const StyledAppContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(3, auto);
  align-content: baseline;
  align-items: center;
  height: 100%; // look into svh and dvh for mobile
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

const StyledErrorComponent = styled.div`
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
