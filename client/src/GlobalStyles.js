import { createGlobalStyle, css } from "styled-components";

// createGlobalStyle returns a component that DOESN'T accept any children!

// the css`${}` here is a workaround to apply text formatting in our IDE, for whatever reason createGlobalStyle is not recognized by Prettier or some other formatting extension/library
export const GlobalStyles = createGlobalStyle`${css`
  // CSS MEYER RESET:
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%; // allows for: 1rem = 10px
    color: whitesmoke;
    transition: color 500ms ease-in;
    font-family: monospace;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-family: inherit;
    vertical-align: baseline;
  }

  body {
    filter: ${({ theme }) => theme.overallColor};
  }

  /* remember to define focus styles! */
  :focus {
    outline: 0;
  }

  ol,
  ul {
    list-style: none;
  }
  /* tables still need 'cellspacing="0"' in the markup */
  table {
    border-collapse: separate;
    border-spacing: 0;
  }
  caption,
  th,
  td {
    text-align: left;
    font-weight: normal;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
  }
  blockquote,
  q {
    quotes: "" "";
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  button {
    display: inline-block;
    position: relative;
    // relative position for tooltip popup
    font-weight: 600;
    font-size: 1.5rem;
    border-radius: 5px;
    margin: 0.5rem 0.25rem 0rem 0.25rem;
    border-style: solid; // prevents the browsers default black right border
    border: none;
    box-shadow: 0px -1px 0px 1px rgba(0, 0, 0, 0.8) inset,
      0px 0px 0px 1px rgba(48, 48, 48, 1) inset,
      0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.25) inset,
      0 -1px 0 0 #b5b5b5 inset, 0 0 0 1px rgba(0, 0, 0, 0.1) inset,
      0 0.5px 0 1.5px #fff inset;
    height: 3.5rem;
    width: 10rem;
    padding: 0.5rem 1rem;
    text-align: center;
    background-color: #b6d0e2;
    background-image: linear-gradient(to bottom, #b6d0e2, #c9e9ec);

    padding: 0.5rem;
    text-align: center;
    /* animation: fadeInAnimation ease-in-out 1s; */
    animation-iteration-count: 1;

    outline: solid white;
    outline-style: ridge;
    outline-offset: -1px;

    &:hover {
      filter: brightness(90%);
      cursor: pointer;
    }
    &:active {
      filter: brightness(80%);
      box-shadow: 0px -1px 0px 1px rgba(0, 0, 0, 0.8) inset,
        0px 0px 0px 1px rgba(48, 48, 48, 1) inset,
        0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.25) inset,
        0 3px 0 0 rgb(0, 0, 0) inset;
    }
    &:focus {
      filter: brightness(90%);
    }
  }

  .button-text {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-wrap: wrap; // not working..?
    pointer-events: none; // NEEDED! Avoids the issue of the form not submitting due to button-text being clicked instead of the button element

    // what we ACTUALLY want is if the button is active, perform this transformation on the button-text box
    &:active {
      // move text down slightly as if being pushed
      transform: translateY(1px);
    }
  }
`}`;

// create variables here
export const lightTheme = {
  overallColor: "none",
};

export const darkTheme = {
  overallColor: "invert(100%) hue-rotate(180deg)",
};

//   background: "whitesmoke",
//   text: " #121212",
//   activeBorder:
//     "linear-gradient(90deg, #333 50%, transparent 0) repeat-x,linear-gradient(90deg, #333 50%, transparent 0) repeat-x,linear-gradient(0deg, #333 50%, transparent 0) repeat-y,linear-gradient(0deg, #333 50%, transparent 0) repeat-y",
//   boxShadow:
//     "0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);",
//   marqRowBackground: "rgb(253, 243, 229)",
//   buttonColor: "#B6D0E2",
//   buttonGradient: "linear-gradient(to bottom, #B6D0E2, #c9e9ec)",
//   colorNav: "white",
//   menuColor: "black",

//   background: "#121212",
//   text: "white",
//   activeBorder:
//     "linear-gradient(90deg, #f1eeee 50%, transparent 0) repeat-x,linear-gradient(90deg, #f1eeee 50%, transparent 0) repeat-x,linear-gradient(0deg, #f1eeee 50%, transparent 0) repeat-y,linear-gradient(0deg, #f1eeee 50%, transparent 0) repeat-y",
//   boxShadow:
//     "0 1px 1px rgba(233, 233, 233, 0.849), 0 2px 2px rgba(233, 233, 233, 0.658),0 4px 4px rgba(233, 233, 233, 0.418), 0 8px 8px rgba(233, 233, 233, 0.329)",
//   marqRowBackground: "rgb(196, 196, 196)",
//   buttonColor: "#9bcaec",
//   buttonGradient: "linear-gradient(to bottom, ##9bcaec, #76b3df)",
//   colorNav: "#363535",
//   menuColor: "whitesmoke",
