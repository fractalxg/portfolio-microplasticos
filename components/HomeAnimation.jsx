import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ParallaxText from "./ParallaxText";
import { useTranslation } from "react-i18next";

import "./HomeAnimation.css"
import Content from "./Content";

const HomeAnimation = () => {
	const animationControl = useAnimation()

	const [visible, setVisible] = useState(false)
	const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [removable, setRemovable] = useState(true)

  const [t, i18n] = useTranslation("global");

  //Animations

  const reduceWidth = {
    width: 60,
    transition: { duration: 4 },
  };

  const reduceScale = {
    scale: 0,
    transition: { type: "spring", delay: 2, duration: 2 },
    transitionEnd: { display: "none" },
  };

	const reduceOpacity = {
    opacity: 0,
    transition: { duration: 1 },
  }

  //Animations

	useEffect(() => {
    if (visible) {
      animationControl.start(reduceOpacity)
    }
  }, [visible])




	const increaseSpeed = () => {
		setSpeedMultiplier(10)

    const timer = Date.now()

    setTimeout(() => {
      if (Date.now() - timer >= 3000) {
        setVisible(true);
      }

    }, 3000)

    setTimeout(() => {
      if (Date.now() - timer >= 4000){
        setRemovable(false)
      }
    }, 4000)
	}

  const resetSpeed = () => {
    setSpeedMultiplier(1)
  }

  

	const RemovableParallaxText = () => {
		return(
			<motion.div animate={animationControl} className="parallax-text">
            
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
            
        </motion.div>
		)
	}

  const RemovableButton = () => {
    return (
      <motion.div
          animate={animationControl}
          className="button"

          onMouseDown={() => increaseSpeed()}
          onMouseUp={() => resetSpeed()}
          onMouseMove={() => resetSpeed()}
          onTouchStart={() => increaseSpeed()}
          onTouchEnd={() => resetSpeed()}>

          <motion.div animate={animationControl}>
            {t("body.button")}
          </motion.div>

        </motion.div>
    )
  }
	
	return (

      <div>
			  {removable && <RemovableParallaxText />}
          <div className="button-container">
            {removable && <RemovableButton />}
          </div>
        {!removable && 
        <div className="content-container">

            <div className="images-container">
            <div className="top-image-container">
            <motion.div
              style={{
                backgroundImage: "url(../imgs/picture-1.png)",
                backgroundSize: "300%",
              }}
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0}}
              transition={{ duration: 1, delay: 0.3 }}
              className="card-image">

            </motion.div>

            <motion.div
              style={{
                backgroundImage: "url(../imgs/picture-6.png)",
                backgroundSize: "200%",
              }}
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0}}
              transition={{ duration: 1, delay: 0.6 }}
              className="card-image">

            </motion.div>
            </div>
            
            <div className="bottom-image-container">
            <motion.div
              style={{ backgroundImage: "url(../imgs/picture-3.png)" }}
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0}}
              transition={{ duration: 1, delay: 0.9 }}
              className="card-image">

              </motion.div>

            <motion.div
              style={{
                backgroundImage: "url(../imgs/picture-5.png)",
                backgroundSize: "300%",
              }}
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0}}
              transition={{ duration: 1, delay: 1.2 }}
              className="card-image">
                
            </motion.div>
            </div>
            
            </div>
            
            
            <motion.div
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1, delay: 1.5 }}>
             <Content />
            </motion.div>

            <div className="bottom-image-container-mobile-450">
            <motion.div
              style={{ backgroundImage: "url(../imgs/picture-3.png)" }}
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0}}
              transition={{ duration: 1, delay: 2 }}
              className="card-image">

              </motion.div>

            <motion.div
              style={{
                backgroundImage: "url(../imgs/picture-5.png)",
                backgroundSize: "300%",
              }}
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0}}
              transition={{ duration: 1, delay: 2.5 }}
              className="card-image">
                
            </motion.div>
            </div>
            
        </div>
        }
		  </div>

		)
	}
	
	export default HomeAnimation