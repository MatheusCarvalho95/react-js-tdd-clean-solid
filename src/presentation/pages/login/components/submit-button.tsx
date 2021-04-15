import SubmitButtonBase from "@/presentation/components/submit-button-base/submit-button-base";
import React from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "./atoms";

type Props = {
  text: string;
};
const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(loginState);
  return <SubmitButtonBase text={text} state={state} />;
};
export default SubmitButton;
