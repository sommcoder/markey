import styled, { keyframes } from "styled-components";

export default function Block({ block, style, delay }) {
  const blockWidth = style ? style + "rem" : "2rem"; // no style specified? 2 rem

  // TODO: may need to find a way to use a different font size for the "special components" so that they'll actually fit. They're also being considered as individual blocks by setCurrMarquee() function and I need a way for them to be interpreted as single tiles

  // TODO: determine which special blocks wrap text within them and which ones do not

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
  font-size: 2.8rem;
  user-select: none;
  width: ${(props) => (props.blockwidth ? props.blockwidth : "2rem")};
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
  height: 4.8rem; // marq rows are 5rem

  &[data-special="true"] {
    font-size: 1.2rem;
    font-weight: 600;
  }

  // prevents border layering:
  &:not(:last-of-type) {
    border-right: 0;
  }
  cursor: default;

  &:focus {
    outline: none;
  }
`;

const StyledEmptySpace = styled.span`
  height: 100%;
  width: ${({ blockWidth }) => blockWidth};
  border-left: 0.1rem solid grey; // <--- need this
`;
