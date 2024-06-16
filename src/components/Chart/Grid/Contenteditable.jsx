import { useEffect, useRef } from "react";

export default function Contenteditable(props) {
  const contentEditableRef = useRef(null);

  useEffect(() => {
    if (contentEditableRef.current.textContent !== props.value) {
        console.log(contentEditableRef.current);
      contentEditableRef.current.textContent = props.value;
    }
  });

  const onTextChange = (event) => {
    const text = event.target.textContent;
    props.onChangeHouseText(props.HouseNumber, text);
  }

  return (
    <div
      contentEditable="true"
      ref={contentEditableRef}
      onInput={onTextChange}
    />
  );
}
