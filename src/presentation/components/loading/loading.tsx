import React from "react";
import Styles from "./styles.scss";
type Props = React.AllHTMLAttributes<HTMLElement>;
const Loading: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={[Styles.loading, props.className].join(" ")}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
