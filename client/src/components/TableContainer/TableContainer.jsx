import styled from "styled-components";
import Marquee from "../Marquee/Marquee";

export default function TableContainer({
  marKeysArr,
  appState,
  dispAppState,
  marqSizes,
}) {
  return (
    <StyledTableContainer>
      {marKeysArr.map((el) => (
        <StyledMarqueeContainer key={el}>
          <Marquee
            key={`marq-${el}`}
            appState={appState}
            dispAppState={dispAppState}
            marqName={el}
            marqSize={marqSizes[el]}
          />
        </StyledMarqueeContainer>
      ))}
    </StyledTableContainer>
  );
}
const StyledTableContainer = styled.div`
  width: 100%;
  /* height: 35vh; // we want this to be scrollable so that the user can always see the keyboard */
  overflow-y: scroll;
  overflow-x: hidden;

  display: grid;
  grid-template-rows: repeat(2, auto);

  @media (min-width: 1000px) {
  }
`;

const StyledMarqueeContainer = styled.div`
  /* max-width: 700px; */
  display: grid;
  width: 100%;
  margin: 0 auto 0rem auto;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0);
  // transparent
`;
