import styled from "styled-components";

import { FiRefreshCcw } from "react-icons/fi";

export default function ResetBtn({ marqName }) {
  return (
    <StyledBtnWrapper>
      <StyledResetBtn
        value={marqName}
        name="Reset"
        title="Resets the marquee"
        type="reset"
      >
        <div className="button-text">
          <FiRefreshCcw />
        </div>
      </StyledResetBtn>
    </StyledBtnWrapper>
  );
}

const StyledBtnWrapper = styled.span`
  position: absolute;
  right: 0;
`;

const StyledResetBtn = styled.button`
  font-size: 1.4rem;
  position: relative;
  border-radius: 20px;
  margin-top: 0.75rem;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
`;
