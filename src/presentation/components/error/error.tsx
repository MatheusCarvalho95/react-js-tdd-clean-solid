import React, { FC } from "react";

import Styles from "./error-styles.scss";
type Props = {
  error: string;
  reload: () => void;
};
const Error: FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap} data-testid="error">
      <span>{error}</span>
      <button data-testid="reload" onClick={reload}>
        Tentar novamente?
      </button>
    </div>
  );
};
export default Error;
