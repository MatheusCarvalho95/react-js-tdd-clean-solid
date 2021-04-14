import React from "react";
import Styles from "./styles.scss";
type Props = React.AllHTMLAttributes<HTMLElement> & {
  negative?: boolean;
};
const Loading: React.FC<Props> = (props: Props) => {
  const negative = props.negative ? Styles.negative : "";
  return (
    <div
      {...props}
      data-testid="spinner"
      className={[Styles.loading, props.className, negative].join(" ")}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
