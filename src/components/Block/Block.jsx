import styled, { keyframes } from "styled-components";

export default function Block({ block, style, delay }) {
  const blockWidth = style ? style + "rem" : "2rem";

  if (block === " ") {
    return <StyledEmptySpace blockWidth={blockWidth} />;
  }
  return (
    <StyledBlock
      delay={delay}
      readOnly
      maxLength="1"
      type="text"
      blockwidth={blockWidth}
      value={block}
      data-special={block.length > 1 ? true : false}
    />
  );
}

const populateMarquee = keyframes`
    0% {
      transform: RotateX(10deg);
      background-color: #f9ea93;
    }
    50% {
      transform: RotateX(90deg);
    }
    100% {
      transform: RotateX(0deg);
    }
`;

const StyledBlock = styled.input`
  font-size: 2.8vw; // font changes to the viewport width
  user-select: none;
  max-width: ${(props) => (props.blockwidth ? props.blockwidth : "2rem")};
  -webkit-user-select: none;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 0.1rem solid grey; // maybe we look into an inset outline since this wouldn't affect the element sizing I believe? Downside is that we wouldn't be able to target specific sides like in the "not" block below
  user-select: none;
  background-color: white;
  caret-color: transparent;
  animation: 0.5s linear ${populateMarquee}
    ${(props) => (props.delay * 90).toString() + "ms"} 1;
  min-height: 4.8rem; // marq rows are 5rem

  &[data-special="true"] {
    font-size: 1.2rem;
    font-weight: 600;
  }

  // prevents border layering:
  // last element needs the right border though!
  &:not(:last-of-type) {
    border-right: 0;
  }
  cursor: default;

  &:focus {
    outline: none;
  }
`;

// TODO: now the left border here isn't working ...????
const StyledEmptySpace = styled.span`
  height: 100%;
  width: ${({ blockWidth }) => blockWidth};
  border-left: 0.1rem solid grey; // <--- need this
  // There should never be two spaces together so this is fine
`;
