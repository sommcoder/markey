import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

export default function Block({ block, style, delay, appState }) {
  const blockWidth = style ? style + "rem" : "2rem"; // no style specified? 2 rem

  // useEffect(() => {}, [appState]);
  // is this what causes the blocks to not all rerender? Does this need to be here?

  return (
    <>
      <StyledBlock
        delay={delay}
        readOnly
        maxLength="1"
        type="text"
        $blockwidth={blockWidth}
        value={block}
      />
    </>
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
  font-size: 2.8rem;
  user-select: none;
  width: ${(props) => (props.$blockwidth ? props.$blockwidth : "2rem")};
  -webkit-user-select: none;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 0.1rem solid grey; // maybe we look into an inset outline since this wouldn't affect the element sizing I believe? Downside is that we wouldn't be able to target specific sides like in the "not" block below
  user-select: none;
  background-color: white;
  caret-color: transparent;
  animation: 0.5s linear ${(props) => (props.delay * 90).toString() + "ms"} 1
    ${populateMarquee};

  // prevents border layering:
  &:not(:last-of-type) {
    border-right: 0;
  }
  cursor: default;

  &:focus {
    outline: none;
  }
`;
