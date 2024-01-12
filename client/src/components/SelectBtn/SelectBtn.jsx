import styled from "styled-components";

export default function SelectBtn({ marqName, switchSelectedMarq }) {
  return (
    <StyledSelectBtn
      onClick={() => switchSelectedMarq(marqName)}
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
