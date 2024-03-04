import styled from "styled-components";

export default function ModalCloseBtn({ toggleModal }) {
  return (
    <StyledModalCloseBtn
      onClick={() => toggleModal(false)}
      title="closes popup"
    >
      Close
    </StyledModalCloseBtn>
  );
}
const StyledModalCloseBtn = styled.button``;
