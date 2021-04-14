import React, { FC } from "react";
import Styles from "./loading-screen-styles.scss";
import Loading from "@/presentation/components/loading";
type Props = {};
const LoadingScreen: FC<Props> = () => {
  return (
    <>
      <div className={Styles.loadingWrap}>
        <div className={Styles.loading}>
          <span>Aguarde...</span>
          <Loading negative={true} />
        </div>
      </div>
    </>
  );
};
export default LoadingScreen;
