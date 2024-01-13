import styled from 'styled-components';
import Marquee from '../Marquee/Marquee';
import { forwardRef } from 'react';

export default forwardRef(function TableContainer(
  {
    data,
    marKeysArr,
    appState,
    dispAppState,
    marqSizes,
    selectedMarq,
    switchSelectedMarq,
    selectedRow,
    switchSelectedRow,
    keysArr,
  },
  ref
) {
  return (
    <StyledTableContainer>
      {marKeysArr.map(el => (
        <StyledMarqueeWrapper marqName={el} key={el}>
          <Marquee
            ref={ref}
            key={`marq-${el}`}
            keysArr={keysArr}
            data={data}
            appState={appState}
            dispAppState={dispAppState}
            marqName={el}
            marqSize={marqSizes[el]}
            selectedMarq={selectedMarq}
            switchSelectedMarq={switchSelectedMarq}
            selectedRow={selectedRow}
            switchSelectedRow={switchSelectedRow}
          />
        </StyledMarqueeWrapper>
      ))}
    </StyledTableContainer>
  );
});

const StyledTableContainer = styled.div`
  width: 100%;
  height: 100%;
  /* height: 35vh; // we want this to be scrollable so that the user can always see the keyboard */
  /* overflow-y: scroll; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 2.5rem 0;

  // DESKTOP/TABLET:
  @media (min-width: 800px) {
    justify-content: space-between;
  }
`;

const StyledMarqueeWrapper = styled.div`
  /* max-width: 700px; */
  display: grid;
  width: 100%;
  margin: 0 auto 0rem auto;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0);
  grid-column: 'span 2'; // DESKTOP/TABLET:
  grid-row: 'span 2';

  @media (min-width: 800px) {
    grid-column: ${props =>
      props.marqName === 'South' ? 'span 2' : 'span 1'}; // if South, span 2
  }
`;
