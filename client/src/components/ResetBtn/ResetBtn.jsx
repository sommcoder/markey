import styled from "styled-components";

import { FiRefreshCcw } from "react-icons/fi";

export default function ResetBtn({ formName }) {
  /*
 create a small modal popup:
    with an "Are you sure?" prompt
*/

  return (
    <StyledResetBtn
      onClick={(ev) => ev.preventDefault()}
      formName={formName}
      name="Reset"
      title="Resets the selected marquee"
      type="reset"
    >
      <div className="button-text">
        <FiRefreshCcw />
      </div>
    </StyledResetBtn>
  );
}

const StyledResetBtn = styled.button`
  border-radius: 20px;
  margin-top: 0.75rem;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
`;
