import React from "react";

/**
 * Renders a React Icon Component with custom font size, scaling, translations.
 *
 * @param {Object} props - The component props.
 * @param {React.Component} [props.ReactIconComponent] - The icon component to render.
 * @param {number} [props.size=1] - The font size of the icon in rem units.
 * @param {number} [props.scale=1] - The scaling factor of the icon.
 * @param {number} [props.translateX=0] - The translation of the icon in the X direction in rem units.
 * @param {number} [props.translateY=0] - The translation of the icon in the Y direction in rem units.
 * @returns {JSX.Element} React component.
 */
const RenderReactIcon = ({
  icon: ReactIcon,
  size = 1,
  scale = 1,
  translateX = 0,
  translateY = 0,
}) => {
  const styles = {
    fontSize: `${size}rem`,
    transform: `scale(${scale}) translate(${translateX}rem, ${translateY}rem)`,
  };

  return (
    <span style={styles}>
      <ReactIcon />
    </span>
  );
};

export default RenderReactIcon;
