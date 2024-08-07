interface IconProps {
  name: string;
  size?: number;
  viewBox?: string;
  nameSpace?: string;
  className?: string;
}

function Icon({
  name,
  size = 24,
  viewBox,
  nameSpace = "icons",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      {...(viewBox && { viewBox })}
      className={className}
    >
      <use href={`/img/${nameSpace}.svg#${name}`} />
    </svg>
  );
}

export default Icon;
