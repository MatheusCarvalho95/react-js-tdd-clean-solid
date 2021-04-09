import Footer from "../../components/footer";
import React, { FC } from "react";
import Styles from "./survey-list-styles.scss";
import Header from "@/presentation/components/header/header";
import Icon, { IconName } from "@/presentation/components/icon/icon";

const SurveyList: FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon iconName={IconName.thumbsUp} className={Styles.iconWrap} />
              <time>
                <span className={Styles.day}>31</span>
                <span className={Styles.month}>10</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>
                Pergunta qualquer número um Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Sunt est unde reiciendis dolor
                eveniet nisi qui porro aliquid consequatur, dicta animi et
                quisquam. Quo atque sit sint laudantium! Illum, alias?
              </p>
            </div>
            <footer>Ver Resultados</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <Icon iconName={IconName.thumbsUp} className={Styles.iconWrap} />
              <time>
                <span className={Styles.day}>31</span>
                <span className={Styles.month}>10</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>
                Pergunta qualquer número dois Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Perspiciatis minima alias
                aspernatur nulla voluptate quos harum eum dolore. Reprehenderit
                aliquam laudantium libero mollitia omnis excepturi rerum,
                debitis ut voluptatibus numquam.{" "}
              </p>
            </div>
            <footer>Ver Resultados</footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
