import Router from "@/presentation/components/router";
import React from "react";
import ReactDom from "react-dom";
import { makeLogin } from "./factories/pages/login/login-factory";

ReactDom.render(
  <Router makeLogin={makeLogin} />,
  document.getElementById("main"),
);
