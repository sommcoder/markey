import NavBar from "./components/NavBar/NavBar.jsx";
import TableContainer from "./components/TableContainer/TableContainer.jsx";
import KeySet from "./components/KeySet/KeySet.jsx";
import Modal from "./components/Modal/Modal.jsx";
import InventoryOverlay from "./components/InventoryOverlay/InventoryOverlay.jsx";
import ErrorMsg from "./components/ErrorMsg/ErrorMsg.jsx";
/////////////////////////////////////////
import { useState, useReducer, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./GlobalStyles";
/////////////////////////////////////////
import setCurrMarquee from "./functions/setCurrMarquee.js";
import getNextElNum from "./functions/getNextElNum.js";
import getTally from "./functions/getTally.js";
import prepareKey from "./functions/prepareKey.js";
/////////////////////////////////////////
// our mock db:
import rawData from "./data.json";
// import { onValue, ref } from "firebase/database";
// import { db } from "./firebase.js"; // our SDK instance

// ! TODO: THE MAIN THING TO REMEMBER HERE IS NOW OUR DATA IS REORGANIZED TO FIT OUR NEEDS BUT ALL OF THE CODE IN THE CLIENT VALIDATION WILL NEED TO CHANGE!
function reorganizeData(rawData) {
  const newData = {};
  Object.keys(rawData).forEach((key) => {
    // Firebase can't have an empty string as a key/value so we're using an underscore but we need to use the empty string
    newData[rawData[key].marqBlock === "_" ? " " : rawData[key].marqBlock] = {
      id: key,
      size: rawData[key].size,
      stock: rawData[key].stock,
      marqBlock: rawData[key].marqBlock === "_" ? " " : rawData[key].marqBlock,
    };
  });
  return newData;
}
/*
 
TODO: client should GET the data and cache result
TODO: client should reorganize the data so that the parent of each item is the blockName


 
*/

export default function App() {
  // TODO: still need to figure out the side menu and how to adjust character sizing and stock in case the user gets more or some break/get lost

  // TODO: should this be handled by caching and working with Firebase?
  const [data, setData] = useState(reorganizeData(rawData));

  const initValidationState = {
    West: {
      0: { values: [], size: 0 },
      1: { values: [], size: 0 },
      2: { values: [], size: 0 },
    },
    East: {
      0: { values: [], size: 0 },
      1: { values: [], size: 0 },
      2: { values: [], size: 0 },
    },
    South: {
      0: { values: [], size: 0 },
      1: { values: [], size: 0 },
      2: { values: [], size: 0 },
    },
  };
  const InitAppState = {
    West: {
      rows: {
        // we care about the SEQUENCE here:
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
  /////////////////////////////////////////////
  // * Main App State *: //
  // inventory menu state:
  const [menuState, toggleMenuState] = useState(false);
  // Popup modal = the apps output
  const [modalState, toggleModal] = useState(false);
  // We can then concat and coerce with 'row': 0, 1, 2
  const [selectedRow, switchSelectedRow] = useState(null);
  // String state that gets set by switchSelectedMarq(marqName):
  const [selectedMarq, switchSelectedMarq] = useState(null);
  // Null until user submits something:
  const [stateOutputObj, setStateOutputObj] = useState(null);
  // "set" or "compare" or "input" or null:
  const [outputProcess, setOutputProcess] = useState(null);
  // Staging/Validation State for input fields:
  const [inputValidationObj, setValidationObj] = useState(initValidationState);
  // Primary state control:
  const [appState, dispAppState] = useReducer(reducer, InitAppState);
  // Window Sizing Check:
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Error message state:
  const [error, setError] = useState({
    type: "",
    render: false,
    char: "",
  });
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

  function handleInputValidation(ev) {
    ev.preventDefault(); // prevents the Enter key from "clicking" the focused KeySet Key

    console.log("ev:", ev);
    if (!selectedMarq) {
      return;
      // ! no selected marq!
      // might be good to have an error message here. It's not apparent that one should click on the button to enable the marquee first
    }

    // individual reset button:
    if (ev.target.type === "reset") {
      refStateObj[selectedMarq].current[selectedRow].value = "";

      // reset the app state of marqName clicked:
      setValidationObj((prevState) => {
        return {
          [selectedMarq]: {
            [selectedRow]: {
              size: 0,
              values: [],
            },
          },
          ...prevState,
        };
      });
      dispAppState({
        type: "RESET_MARQUEE",
        currState: appState,
        marq: ev.target.value,
      });

      return;
    }

    let key = prepareKey(ev);
    console.log("key:", key);

    if (!key) return;

    // input field values:
    let formEl = refStateObj[selectedMarq].current;
    let rowName = refStateObj[selectedMarq].current[selectedRow].name;

    // ! Command Key Handling:
    if (key === "CapsLock") {
      // popup warning indicating that the CAPSLOCK is on
    }
    if (key === "Enter") {
      // dispatch reducer:
      dispAppState({
        type: "INPUT_MARQUEE",
        marq: selectedMarq,
        payload: setCurrMarquee(keysArr, formEl, data, appState[selectedMarq]),
      });
      // Reset the validation State Object on 'Enter'
      setValidationObj((prevState) => {
        return {
          ...prevState,
          [selectedMarq]: {
            ...prevState[selectedMarq],
            [selectedRow]: {
              ...prevState[selectedMarq][selectedRow],
              size: 0,
              values: [],
            },
          },
        };
      });
      setOutputProcess("input");
      switchSelectedRow(getNextElNum(rowName, selectedRow));
      return;
    }
    // tab creates some weird functionality with selecting text
    if (key === "Tab" || key === "Shift") {
      // popup warning that " Tab is disabled in Mar-Key ""
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      // No element in the array, assign to 0 and return
      if (!inputValidationObj[selectedMarq][selectedRow].values.at(-1)) {
        setValidationObj((prevState) => {
          return {
            size: 0,
            ...prevState,
          };
        });
        return;
      }
      setValidationObj((prevState) => {
        // if special, add curly braces wrapper to indicate that this is ONE block to setCurrMarquee() and not individual strings
        // special blocks have a length > 1
        const newArr = [...prevState[selectedMarq][selectedRow].values];
        const lastIndexSize = data[newArr.at(-1)].size;
        newArr.pop();

        return {
          ...prevState,
          [selectedMarq]: {
            ...prevState[selectedMarq],
            [selectedRow]: {
              ...prevState[selectedMarq][selectedRow],
              values: newArr,
              size: (prevState[selectedMarq][selectedRow].size -=
                lastIndexSize),
            },
          },
        };
      });
      return;
    }

    // ! Regular/Special Key Handling:
    let keyObj = {};
    if (ev.type === "click") {
      // onClicks are looked up by id in the rawData set
      keyObj = rawData[key];
    } else {
      // keyDowns are looked up by 'marqBlock' in the reconfigured data set
      keyObj = data[key];
    }

    console.log("keyObj:", keyObj);
    console.log("key:", key);

    // 0.1(rem) accounts for block border size

    let currBlockSize = keyObj.size + 0.1;
    console.log("currBlockSize:", currBlockSize);
    // Max capacity check:
    // existing width + current block size would be greater than the marqSize
    if (
      inputValidationObj[selectedMarq][selectedRow].size + currBlockSize >
      marqSizes[selectedMarq]
    ) {
      console.log("too large!");
      console.log(
        "inputValidationObj[selectedMarq][selectedRow].size:",
        inputValidationObj[selectedMarq][selectedRow].size + currBlockSize
      );
      console.log("marqSizes[selectedMarq]:", marqSizes[selectedMarq]);
      // animate the currently selected row:
      refStateObj[selectedMarq].current[selectedRow].animate(
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

      // refStateObj[selectedMarq].current.insertAdjacentElement(
      //   "afterend",
      //   ErrorMsg
      // );

      // setError(() => {
      //   return {
      //     type: "message_too_large",
      //     render: true,
      //     char: "",
      //   };
      // });
      return;
    }

    // TODO: we're still getting two entries for each key
    setValidationObj((prevState) => {
      // if special, add curly braces wrapper to indicate that this is ONE block to setCurrMarquee() and not individual strings
      // special blocks have a length > 1
      const updatedArr = [...prevState[selectedMarq][selectedRow].values];
      updatedArr.push(
        keyObj.marqBlock.length > 1 ? `{${keyObj.marqBlock}}` : keyObj.marqBlock
      );

      return {
        ...prevState,
        [selectedMarq]: {
          ...prevState[selectedMarq],
          [selectedRow]: {
            ...prevState[selectedMarq][selectedRow],
            values: updatedArr,
            // append currBlockSize to the validationState:
            size: prevState[selectedMarq][selectedRow].size + currBlockSize,
          },
        },
      };
    });
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
      setStateOutputObj(() => {
        return {
          currOutput: getTally(appState, data),
          newOutput: {},
        };
      });
      // reset:
      switchSelectedMarq(null);
      switchSelectedRow(null);
      toggleModal(true);
    }
  }, [outputProcess, appState, data]);

  console.log("inputValidationObj:", inputValidationObj);

  return (
    // specifies which
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <StyledAppContainer
        onKeyDown={(ev) => handleInputValidation(ev)}
        onClick={(ev) => handleInputValidation(ev)}
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
            dispAppState={dispAppState}
            setStateOutputObj={setStateOutputObj}
            setOutputProcess={setOutputProcess}
          />
        ) : (
          ""
        )}
        {error.render ? <ErrorMsg type={error.type} char={error.char} /> : ""}
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
          setValidationObj={setValidationObj}
          menuState={menuState}
          toggleMenuState={toggleMenuState}
        />
        <InventoryOverlay
          data={data}
          menuState={menuState}
          toggleMenuState={toggleMenuState}
        />
        <TableContainer
          inputValidationObj={inputValidationObj}
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
          menuState={menuState}
          toggleMenuState={toggleMenuState}
        />
        <KeySet data={data} />
      </StyledAppContainer>
      <StyledErrorContainer>
        {/* <StyledErrorComponent>
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
        </StyledErrorComponent> */}
      </StyledErrorContainer>
    </ThemeProvider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "INPUT_MARQUEE": {
      return { ...state, [action.marq]: action.payload };
    }
    case "SET_APP": {
      return { ...state, ...action.updatedState };
    }
    case "RESET_MARQUEE": {
      return {
        ...state,
        [action.marq]: { output: {}, rows: { 0: [], 1: [], 2: [] } },
      };
    }
    case "RESET_APP": {
      return {
        West: {
          rows: {
            0: [],
            1: [],
            2: [],
          },
          output: {},
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
    }
    default:
      return state;
  }
}

const StyledAppContainer = styled.div`
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-rows: repeat(3, auto);
  align-content: baseline;
  align-items: center;
  height: 108rem; // look into svh and dvh for mobile
  width: 100%;
  background-color: white;
  overflow: hidden;
`;

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
