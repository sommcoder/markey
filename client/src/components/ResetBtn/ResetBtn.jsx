import styled from "styled-components";

// import { FiRefreshCcw } from "react-icons/fi";

export default function ResetBtn({ formName }) {
  /*
 create a small modal popup:
    with an "Are you sure?" prompt
*/

  // const style = {
  //   color: "black",
  //   height: "1.25rem",
  //   width: "1.25rem",
  //   position: "absolute",
  //   right: "1rem",
  //   top: "30%",
  // };

  return (
    <StyledResetBtn
      onClick={(ev) => ev.preventDefault()}
      formName={formName}
      name="Reset"
      title="Resets the selected marquee"
      type="reset"
    >
      <div className="button-text">
        Reset
        {/* <FiRefreshCcw style={style} /> */}
      </div>
    </StyledResetBtn>
  );
}

const StyledResetBtn = styled.button`
  font-size: 1.4rem;
  position: relative;
  border-radius: 20px;
  margin-top: 0.75rem;
  margin-left: 1rem;
  width: 8rem;
  height: 3rem;
`;
