import { useEffect, useRef, useState } from "react";

export default function Contenteditable({value, onChange, onAddNewPoint}) {
    
    const contentEditableRef = useRef(null);
    
    useEffect(() => {
        if (contentEditableRef.current.textContent !== value) {
          contentEditableRef.current.textContent = value;
        }
      });

  return (
    <li>
        <div
            className="point-text"
            contentEditable="true"
            ref={contentEditableRef}
            onInput={event => {
                onChange(event.target.textContent);
            }}
            onKeyDown={(event) => event.key === "Enter" && onAddNewPoint()}
        ></div>
    </li>
  );
}