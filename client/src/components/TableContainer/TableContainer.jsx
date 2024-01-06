import styled from "styled-components";
import Marquee from "../Marquee/Marquee";
import { useQuery } from "@tanstack/react-query";

import { getCharacterStock } from "../../api/api";

export default function TableContainer({
  marKeysArr,
  appState,
  dispAppState,
  marqSizes,
}) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ["get-characters"],
    queryFn: getCharacterStock, // no parentheses!
  }); // makes MULTIPLE retry queries automatically if query fails.
  console.log("data:", data);
  // fetchOnWindowFocus();

  return (
    <StyledTableContainer>
      {marKeysArr.map((el) => (
        <StyledMarqueeWrapper marqName={el} key={el}>
          <Marquee
            key={`marq-${el}`}
            data={data}
            appState={appState}
            dispAppState={dispAppState}
            marqName={el}
            marqSize={marqSizes[el]}
          />
        </StyledMarqueeWrapper>
      ))}
    </StyledTableContainer>
  );
}
const StyledTableContainer = styled.div`
  width: 100%;
  /* height: 35vh; // we want this to be scrollable so that the user can always see the keyboard */
  /* overflow-y: scroll; */
  overflow-x: hidden;

  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;

  // DESKTOP/TABLET:
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const StyledMarqueeWrapper = styled.div`
  /* max-width: 700px; */
  display: grid;
  width: 100%;
  margin: 0 auto 0rem auto;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0);
  // transparent

  // DESKTOP/TABLET:
  @media (min-width: 800px) {
    grid-column: ${(props) =>
      props.marqName === "South" ? "span 2" : "span 1"}; // if South, span 2
  }
`;
