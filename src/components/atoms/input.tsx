import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  TextFieldProps,
  Select,
  FormHelperText,
} from "@mui/material";

export function InputFormik({
  fullWidth = true,
  id,
  name = "",
  label,
  variant = "outlined",
  autoComplete = "off",
  setValue,
  ...props
}: TextFieldProps | any) {
  const { handleChange, handleBlur, values, errors, touched, setValues }: any =
    useFormikContext();

  const onChange = React.useCallback(
    (event: any) => {
      handleChange(event);
    },
    [handleChange]
  );

  const newValue = values[name];

  const currentValue = React.useMemo(() => newValue, [newValue]);

  useEffect(() => {
    if (setValue || setValue === "") {
      setValues({
        [name]: setValue,
      });
    }
  }, [name, setValue, setValues]);

  return (
    <TextField
      fullWidth={fullWidth}
      id={id}
      label={label}
      variant={variant}
      autoComplete={autoComplete}
      name={name}
      error={Boolean(errors[name]) && Boolean(touched[name])}
      value={currentValue}
      onChange={onChange}
      onBlur={handleBlur}
      helperText={errors[name] && touched[name] && String(errors[name])}
      {...props}
    />
  );
}

export function Input({
  fullWidth = true,
  id,
  name = "",
  label,
  variant = "outlined",
  autoComplete = "off",
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  ...props
}: TextFieldProps | any) {
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
      error={Boolean(errors[name]) && Boolean(touched[name])}
      value={currentValue}
      onChange={onChange}
      onBlur={handleBlur}
      helperText={errors[name] && touched[name] && String(errors[name])}
      {...props}
    />
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function SelectorFormik({ label, title, options, name, setValue }: any) {
  const { handleChange, handleBlur, values, errors, touched, setValues }: any =
    useFormikContext();

  const onChange = React.useCallback(
    (event: any) => {
      handleChange(event);
    },
    [handleChange]
  );

  const newValue = values[name] || "";

  const currentValue = React.useMemo(() => newValue, [newValue]);

  useEffect(() => {
    if (setValue || setValue === "") {
      setValues({
        [name]: setValue || "",
      });
    }
  }, [name, setValue, setValues]);

  return (
    <FormControl
      fullWidth
      error={Boolean(errors[name]) && Boolean(touched[name])}
    >
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        name={name}
        value={currentValue}
        onChange={onChange}
        onBlur={handleBlur}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <em>{label}</em>
        </MenuItem>
        {options.map((each: any, index: number) => (
          <MenuItem key={`${name}_select_${index}`} value={each.value}>
            {each.label}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && touched[name] && (
        <FormHelperText>{String(errors[name])}</FormHelperText>
      )}
    </FormControl>
  );
}

export function Selector({
  label,
  title,
  options,
  name,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
}: any) {
  const onChange = React.useCallback(
    (event: any) => {
      handleChange(event);
    },
    [handleChange]
  );

  const newValue = values[name] || "";

  const currentValue = React.useMemo(() => newValue, [newValue]);

  return (
    <FormControl
      fullWidth
      error={Boolean(errors[name]) && Boolean(touched[name])}
    >
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        name={name}
        value={currentValue}
        onChange={onChange}
        onBlur={handleBlur}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <em>{label}</em>
        </MenuItem>
        {options.map((each: any, index: number) => (
          <MenuItem key={`${name}_select_${index}`} value={each.value}>
            {each.label}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && touched[name] && (
        <FormHelperText>{String(errors[name])}</FormHelperText>
      )}
    </FormControl>
  );
}

export default InputFormik;
