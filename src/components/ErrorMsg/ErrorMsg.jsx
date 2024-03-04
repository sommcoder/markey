import styled from "styled-components";

export default function ErrorMsg({ type, char }) {
  const ERROR = {
    message_too_large: () =>
      "The size of your message is too large for this marquee",
    unknown_input: (char) =>
      `The character: '${char}' was not found in our database`,
    insufficent_char_stock: (char) =>
      `There are not enough '${char}' blocks in inventory to accommodate your display(s)`,
  };

  /*
   
  setTimeout, once complete.

  setError(() => {
        return {
          type: "",
          render: false,
          char: "",
        };
      });
   
  */
  // always pass char, but some errors won't need it to render the message
  return <StyledErrorMsg>{ERROR[type](char)}</StyledErrorMsg>;
}

const StyledErrorMsg = styled.div`
  position: absolute;
  left: 39.5%;
  top: 42%;
  z-index: 6;
  border: 0.05rem solid black;
  max-width: fit-content;
  padding: 0.5rem;
  border-radius: 3px;
  border-color: red;
  color: red;
`;
