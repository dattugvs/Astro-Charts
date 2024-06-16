import { useState } from "react";
import PropTypes from 'prop-types';

export default function GridItem({ HouseNumber, HouseText, onChangeHouseText }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleTextChange = (event) => {
    const text = event.target.value;
    onChangeHouseText(HouseNumber, text);
  };

  return (
    <div
      className="house"
      onClick={handleFocus}
      onBlur={handleBlur}
    >
      {focused ? (
        <textarea
          className="text-input"
          value={HouseText}
          onChange={handleTextChange}
          autoFocus
          onFocus={(e) => {
            const val = e.target.value;
            e.target.value = '';
            e.target.value = val; // Reset cursor position to end
          }}
        />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: HouseText.replace(/\r\n|\r|\n/g, "<br />") }}></span>
      )}
    </div>
  );
}

GridItem.propTypes = {
  HouseNumber: PropTypes.number.isRequired,
  HouseText: PropTypes.string,
  onChangeHouseText: PropTypes.func.isRequired,
};
