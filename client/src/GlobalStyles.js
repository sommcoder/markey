import { createGlobalStyle, css } from "styled-components";

// createGlobalStyle returns a component that DOESN'T accept any children!

// the css`${}` here is a workaround to apply text formatting in our IDE, for whatever reason createGlobalStyle is not recognized by Prettier or some other formatting extension/library
const GlobalStyles = createGlobalStyle`${css`
  * {
    margin: 0;
    padding: 0;
  }
  // CSS MEYER RESET:
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  font,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
  }
  /* remember to define focus styles! */
  :focus {
    outline: 0;
  }
  body {
    line-height: 1;
    color: black;
    background: white;
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

  html {
    font-size: 67.5%;
    font-family: monospace;
    background-color: whitesmoke;
    color: black;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  div {
    animation: fadeInAnimation ease-in-out 1s;
    animation-iteration-count: 1;

    @keyframes fadeInAnimation {
      start {
        opacity: 0;
      }
      end {
        opacity: 1;
      }
    }
  }

  button {
    display: inline-block;
    position: relative;
    // relative position for tooltip popup
    font-weight: 600;
    font-size: 1.5rem;
    color: black;

    border-radius: 5px;
    margin: 0 auto;
    border-top-color: #969696;
    border-right-color: lightgrey;
    border-bottom-color: black;
    border-left-color: grey;

    box-shadow: inset 0px 1px lightgrey;
    height: 3.5rem;
    width: 10rem;
    padding: 0.5rem 1rem;
    text-align: center;
    background-color: powderblue;
    background-image: linear-gradient(to bottom, powderblue, #c9e9ec);

    padding: 0.5rem;
    text-align: center;
    animation: fadeInAnimation ease-in-out 1s;
    animation-iteration-count: 1;

    &:hover {
      filter: brightness(90%);
    }
    &:active {
      filter: brightness(80%);
    }

    @keyframes fadeInAnimation {
      start {
        opacity: 0;
      }
      end {
        opacity: 1;
      }
    }
  }

  .button-style-wrapper {
    border-radius: ;
  }

  .button-text {
    &:active {
      // move text down slightly as if being pushed
      transform: translateY(2px);
    }
  }
`}`;

export default GlobalStyles;
