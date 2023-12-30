import "./body.css";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import Content from "./Content";

import { useTranslation } from "react-i18next";
import Footer from "./Footer";
import ParallaxText from "./ParallaxText";


export default function App() {
  const [t, i18n] = useTranslation("global");

  const [speedMultiplier, setSpeedMultiplier] = useState(1); // Estado e função para controlar a velocidade ao segurar a div scroll
  
  const [removable, setRemovable] = useState(true)
  
  const containerRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const controls = useAnimation();

    const increaseSpeed = () => {
      setSpeedMultiplier(10); // Aumenta a velocidade ao segurar a div scroll

      const timer = Date.now();

      setTimeout(() => {
        if (Date.now() - timer >= 3000) {
          setVisible(true);
        }
      }, 3000)

      setTimeout(() => {
        if (Date.now() - timer >= 4000) {
          setRemovable(false)
          const text = containerRef.current.getElementsByClassName("text");
          const button = containerRef.current.getElementsByClassName("scroll-button");
          const animation =
            containerRef.current.getElementsByClassName("animation");
          const content = containerRef.current.getElementsByClassName("content");

          // if (text.length > 0) {
          //   text[0].style.display = "none";

            // if (button.length > 0) {
            //   button[0].style.display = "none";

              if (animation.length > 0) {
                animation[0].style.display = "block";

                if (content.length > 0) {
                  content[0].style.display = "flex";
                }
              
            //}
          }
        }
      }, 4000);
    };
    const resetSpeed = () => {
      setSpeedMultiplier(1); // Aumenta a velocidade ao segurar a div scroll
    };

  const reduce = {
    width: 60,
    transition: { duration: 4 },
  };

  const reduceScale = {
    scale: 0,
    transition: { type: "spring", delay: 2, duration: 2 },
    transitionEnd: { display: "none" },
  };

  const hide = {
    opacity: 0,
    transition: { duration: 1 },
  };

  useEffect(() => {
    if (visible) {
      controls.start(hide);
    }
  }, [controls, visible]);

  const RemovableParallaxText = () => {
    return (
      <motion.div animate={controls} className="text">
          <section className="overlay">
            {/* Passando speedMultiplier como prop para ParallaxText */}
            <ParallaxText baseVelocity={-3} speedMultiplier={speedMultiplier}>
              <h1>{t("body.parallaxText")}</h1>
            </ParallaxText>
  
            <ParallaxText baseVelocity={3} speedMultiplier={speedMultiplier}>
              <h1>{t("body.parallaxText")}</h1>
            </ParallaxText>
  
            <ParallaxText baseVelocity={-3} speedMultiplier={speedMultiplier}>
              <h1>{t("body.parallaxText")}</h1>
            </ParallaxText>
  
            <ParallaxText baseVelocity={3} speedMultiplier={speedMultiplier}>
              <h1>{t("body.parallaxText")}</h1>
            </ParallaxText>
  
          </section>
        </motion.div>
    )
  }

  const RemovableButton = () => {
    return (
      <motion.div

          whileTap={reduce}
          className="scroll"
          onMouseDown={() => increaseSpeed()}
          onMouseUp={() => resetSpeed()}
          onMouseMove={() => resetSpeed()}
          onTouchStart={() => increaseSpeed()}
          onTouchEnd={() => resetSpeed()}>

          <motion.div animate={controls}>
            {t("body.button")}
          </motion.div>

        </motion.div>
    )
  }

  return (
    <div ref={containerRef} className="container">
      
      {removable && <RemovableParallaxText />}

      <div className="scroll-button">

        {removable && <RemovableButton />}

        <motion.div
          whileInView={reduceScale}
          className="animation">
        </motion.div>

      </div>

      <motion.div className="content">
        <div className="cards-text">
          <motion.div className="card-container">
            <div className="cards-text-01">
            <motion.div
              style={{
                backgroundImage: "url(../imgs/picture-1.png)",
                backgroundSize: "300%",
              }}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 1 }}
              transition={{ duration: 0.3, delay: 9 }}
              className="card">

              </motion.div>

            <motion.div
              style={{
                backgroundImage: "url(../imgs/picture-6.png)",
                backgroundSize: "200%",
              }}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 1 }}
              transition={{ duration: 0.3, delay: 9.5 }}
              className="card">

            </motion.div>
            </div>
            
            <div className="cards-text-02">
            <motion.div
              style={{ backgroundImage: "url(../imgs/picture-3.png)" }}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 1 }}
              transition={{ duration: 0.3, delay: 10 }}
              className="card">

              </motion.div>

            <motion.div
              style={{
                backgroundImage: "url(../imgs/picture-5.png)",
                backgroundSize: "300%",
              }}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 1 }}
              transition={{ duration: 0.3, delay: 10.5 }}
              className="card">

              </motion.div>
            </div>
            

          </motion.div>

          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0, translateY: 1 }}
            transition={{ duration: 1, delay: 11 }}
            className="text-content"
          >
            <Content />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

}


