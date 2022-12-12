export const InputComponent = ({
  className = "",
  name = "",
  placeholder = "",
  type = "",
  values = "",
  onChange = (e: any) => {},
}) => {
  return (
    <input
      className={className}
      name={name}
      placeholder={placeholder}
      type={type}
      value={values}
      onChange={onChange}
    />
  );
};
