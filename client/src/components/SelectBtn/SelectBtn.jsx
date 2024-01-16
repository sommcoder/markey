import styled from "styled-components";

export default function SelectBtn({
  marqName,
  selectedMarq,
  switchSelectedMarq,
}) {
  function handleClick(ev) {
    ev.preventDefault();
    switchSelectedMarq(marqName);
    // // null checK:
    // if (!selectedMarq) switchSelectedMarq(marqName);
    // selectedMarq === marqName
    //   ? switchSelectedMarq(null) // reset to null
    //   : switchSelectedMarq(marqName); // change to curr marquee
  }

  return (
    <StyledSelectBtn
      onClick={(ev) => handleClick(ev)}
      data-id={marqName}
      title="Select Marquee(s) to work with"
    >
      <div className="button-text">{`${marqName} Marquee`}</div>
    </StyledSelectBtn>
  );
}

const StyledSelectBtn = styled.button`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 25rem;
  margin-bottom: 1rem;
`;
