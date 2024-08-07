interface IconProps {
  name: string;
  size?: number;
  viewBox?: string;
  nameSpace?: string;
  className?: string;
  stroke?: string;
  fill?: string;
}

function Icon({
  name,
  size = 24,
  viewBox,
  nameSpace = "icons",
  className,
  stroke,
  fill,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      {...(viewBox && { viewBox })}
      className={className}
    >
      <use href={`/img/${nameSpace}.svg#${name}`} fill={fill} stroke={stroke} />
    </svg>
  );
}

export default Icon;
