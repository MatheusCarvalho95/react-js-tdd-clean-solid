import Logo from "@/presentation/components/logo";
import Footer from "../../components/footer";
import React, { FC } from "react";
import Styles from "./survey-list-styles.scss";

const SurveyList: FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logouWrap}>
            <span>UserName</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>31</span>
                <span className={Styles.month}>10</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Pergunta qualquer que é maior </p>
            </div>
            <footer>Ver Resultados</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>31</span>
                <span className={Styles.month}>10</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Pergunta qualquer que é maior </p>
            </div>
            <footer>Ver Resultados</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>31</span>
                <span className={Styles.month}>10</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Pergunta qualquer que é maior </p>
            </div>
            <footer>Ver Resultados</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>31</span>
                <span className={Styles.month}>10</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Pergunta qualquer que é maior </p>
            </div>
            <footer>Ver Resultados</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>31</span>
                <span className={Styles.month}>10</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Pergunta qualquer que é maior </p>
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
