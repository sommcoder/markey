import NavBar from "./components/NavBar/NavBar.jsx";
import TableContainer from "./components/TableContainer/TableContainer.jsx";
import KeySet from "./components/KeySet/KeySet.jsx";
import Modal from "./components/Modal/Modal.jsx";
/////////////////////////////////////////
import { useState, useReducer } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
/////////////////////////////////////////
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

export default function App() {
  // MODAL POPUP STATE:
  const [modalState, toggleModal] = useState(false);

  // [{ ltr: quantity }]
  const InitAppState = {
    West: {},
    East: {},
    South: {},
  };

  // only one marquee can be active at a time for direct Key inputting
  const [selectedMarqObj, switchSelectedMarq] = useState({
    West: false,
    East: false,
    South: false,
  });

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <StyledAppContainer>
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
            marKeysArr={marKeysArr}
            appState={appState}
            dispAppState={dispAppState}
            selectedMarqObj={selectedMarqObj}
            switchSelectedMarq={switchSelectedMarq}
            marqSizes={marqSizes}
          />
          <KeySet selectedMarqObj={selectedMarqObj} />
        </StyledAppContainer>
      </QueryClientProvider>
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
`;
