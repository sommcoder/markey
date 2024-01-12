import styled from "styled-components";

export default function SetCurrBtn({ formName }) {
  function handleSubmit(ev) {
    ev.preventDefault();
    console.log("ev:", ev);
    // TODO: handle submit
  }

  return (
    <StyledSetCurrBtn
      form={formName}
      onClick={(ev) => handleSubmit(ev)}
      name="Set"
      type="submit"
      title="Sets the selected marquee"
    >
      <div className="button-text">Set</div>
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled.button``;
