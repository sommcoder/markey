import styled from 'styled-components';
import setCurrMarquee from '../../functions/setCurrMarquee';

export default function SetCurrBtn({
  formName,
  dispAppState,
  keysArr,
  data,
  appState,
}) {
  function handleSubmit(ev) {
    ev.preventDefault();
    console.log('ev:', ev);
    // TODO: handle submit.

    //  switchSelectedRow(getNextElNum(rowStr, selectedRow));
    // dispatch reducer:
    dispAppState({
      type: 'set',
      payload: setCurrMarquee(keysArr, formEl, appState, data, selectedMarq),
    });
  }

  return (
    <StyledSetCurrBtn
      form={formName}
      onClick={ev => handleSubmit(ev)}
      name="Set"
      type="submit"
      title="Sets the selected marquee"
    >
      <div className="button-text">Set</div>
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled.button``;
