import SubmitButtonBase from "@/presentation/components/submit-button-base/submit-button-base";
import React from "react";
import { useRecoilState } from "recoil";
import { signUpState } from "./atoms";

type Props = {
  text: string;
};
const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const [state, setState] = useRecoilState(signUpState);
  return <SubmitButtonBase text={text} state={state} />;
};
export default SubmitButton;
