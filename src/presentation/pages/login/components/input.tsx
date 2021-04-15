import React from "react";
import Input from "@/presentation/components/input";
import { useRecoilState } from "recoil";
import { loginState } from "./atoms";

type Props = {
  type: string;
  name: string;
  placeholder: string;
};
const InputState: React.FC<Props> = ({ type, name, placeholder }: Props) => {
  const [state, setState] = useRecoilState(loginState);
  return (
    <>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        state={state}
        setState={setState}
      />
    </>
  );
};
export default InputState;
