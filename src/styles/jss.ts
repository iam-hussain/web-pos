import { create } from "jss";
import defaultUnit from "jss-plugin-default-unit";
import { jssPreset } from "@mui/styles";
import rtl from "jss-rtl";

const plugins = [...jssPreset().plugins, rtl()];

const jss = create({ plugins });

const options = {
  "font-size": "rem",
  "line-height": "em",
  margin: "rem",
  "margin-top": "rem",
  "margin-bottom": "rem",
  "margin-left": "rem",
  "margin-right": "rem",
  padding: "rem",
  "padding-top": "rem",
  "padding-bottom": "rem",
  "padding-left": "rem",
  "padding-right": "rem",
  width: "rem",
  "max-width": "rem",
  "mim-width": "rem",
  height: "rem",
  "max-height": "rem",
  "mim-height": "rem",
};

jss.use(defaultUnit(options));

export default jss;
