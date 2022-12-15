import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

function Input({
  fullWidth = true,
  id,
  name = "",
  label,
  variant = "outlined",
  autoComplete = "off",
  ...props
}: TextFieldProps) {
  const { handleChange, handleBlur, values, errors, touched }: any =
    useFormikContext();

  const onChange = React.useCallback(
    (event: any) => {
      handleChange(event);
    },
    [handleChange]
  );

  const newValue = values[name];

  const currentValue = React.useMemo(() => newValue, [newValue]);

  return (
    <TextField
      fullWidth={fullWidth}
      id={id}
      label={label}
      variant={variant}
      autoComplete={autoComplete}
      name={name}
      error={Boolean(errors[name] && touched[name])}
      value={currentValue}
      onChange={onChange}
      onBlur={handleBlur}
      helperText={errors[name] && touched[name] && String(errors[name])}
      {...props}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Input;
