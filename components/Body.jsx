import "./body.css";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

import Content from "./Content";

import { useTranslation } from "react-i18next";

function ParallaxText({ children, baseVelocity = 100, speedMultiplier }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);

  // Movimento do parallax de acordo com a velocidade ao segurar a div scroll
  useAnimationFrame((t, delta) => {
    let moveBy =
      directionFactor.current * speedMultiplier * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

const show = {
  opacity: 1,
  display: "block"
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none"
  }
};

export default function App() {
  const [t, i18n] = useTranslation("global")

  const [speedMultiplier, setSpeedMultiplier] = useState(1); // Estado e função para controlar a velocidade ao segurar a div scroll
  
  const containerRef = useRef(null);

  const [timer, setTimer] = useState(null);
  const startTimeRef = useRef(null);

  const increaseSpeed = () => {
    setSpeedMultiplier(10); // Aumenta a velocidade ao segurar a div scroll

    startTimeRef.current = Date.now();
    setTimer(setTimeout(() => {
      if (Date.now() - startTimeRef.current >= 4000) {

        console.log('Usuário manteve o botão pressionado por mais de 4 segundos!')

        const text = containerRef.current.getElementsByClassName('text')
        const button = containerRef.current.getElementsByClassName('scroll')
        const animation = containerRef.current.getElementsByClassName('animation')
        const content = containerRef.current.getElementsByClassName('content')

        if (text.length > 0) {
          text[0].style.display = "none";
          
          if (button.length > 0) {
            button[0].style.display = "none";

            if (animation.length > 0){
              animation[0].style.display = "block";

                if (content.length > 0){
                  content[0].style.display = "flex"
              };
            
              
              
            }
          }

         
        }
      }
    }, 4000));

  };
  const resetSpeed = () => {
    setSpeedMultiplier(1); // Aumenta a velocidade ao segurar a div scroll
  };



  const reduce = {
    width:60,
    transition: {duration: 4},
  }

  const reduceScale = {
    scale: 0,
    transition: { type:"spring", delay: 2, duration: 2},
    transitionEnd: {display: "none"}
  }

  const show = {
    opacity: 1,
    transition: { delay: 4, duration: 2},
  }

  return (
    <div ref={containerRef} className="container">
      <motion.div className="text" >
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
      <div className="scroll-button">
        <motion.div
       
          whileTap={reduce}

          className="scroll"
          onMouseDown={() => increaseSpeed()} 
          onMouseUp={() => resetSpeed()}
          onMouseMove={() => resetSpeed()}
          onTouchStart={() => increaseSpeed()} 
          onTouchEnd={() => resetSpeed()}
          
       >
        {t("body.button")}
        </motion.div>

        

        <motion.div 
        whileInView={reduceScale}
        className="animation">
        </motion.div>

        <motion.div 
 
        className="content">
          <div className="card-container">
            <motion.div 
            style={{backgroundImage: "url(../imgs/picture-1.png)", backgroundSize:"300%"}}
            initial={{opacity:0, translateX: -50}}
            animate={{opacity: 1, translateX: 0, translateY: 1}}
            transition={{duration: 0.3, delay: 9}}
            
            className="card">
            </motion.div>

            <motion.div 
            style={{backgroundImage: "url(../imgs/picture-6.png)", backgroundSize:"200%"}}
            initial={{opacity:0, translateX: -50}}
            animate={{opacity: 1, translateX: 0, translateY: 1}}
            transition={{duration: 0.3, delay: 9.5}}
            className="card">
            </motion.div>

            <motion.div 
            style={{backgroundImage: "url(../imgs/picture-3.png)"}}
            initial={{opacity:0, translateX: -50}}
            animate={{opacity: 1, translateX: 0, translateY: 1}}
            transition={{duration: 0.3, delay: 10}}
        
            className="card">
          </motion.div>

            <motion.div 
            style={{backgroundImage: "url(../imgs/picture-5.png)", backgroundSize:"300%"}}
            initial={{opacity:0, translateX: -50}}
            animate={{opacity: 1, translateX: 0, translateY: 1}}
            transition={{duration: 0.3, delay: 10.5}}
 
            className="card">

            </motion.div>

          </div>


          <motion.div 
          initial={{opacity:0, translateX: -50}}
          animate={{opacity: 1, translateX: 0, translateY: 1}}
          transition={{duration: 1, delay: 11}}
          className="text-content">
            <Content />
          </motion.div>

      </motion.div>

      </div>
      
    </div>
    
  );
}
