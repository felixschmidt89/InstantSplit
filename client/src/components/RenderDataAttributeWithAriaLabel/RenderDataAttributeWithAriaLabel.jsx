// React and Third-Party Libraries
import React from "react";

/**
 * Component for rendering a single data attribute with a specified ARIA label.
 * @param {Object} props - The component props.
 * @param {string} props.attribute - The data attribute to be displayed.
 * @param {string} props.ariaLabel - The ARIA label for the data attribute.
 * @param {string} [props.elementType="span"] - The HTML element type to use (default is span).
 * @returns {JSX.Element} React component. */
const RenderDataAttributeWithAriaLabel = ({
  attribute,
  ariaLabel,
  elementType = "span",
}) => {
  const Element = elementType;

  return <Element aria-label={ariaLabel}>{attribute}</Element>;
};

export default RenderDataAttributeWithAriaLabel;
