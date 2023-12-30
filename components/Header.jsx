import "./Header.css"
import { IoMdArrowDropdown } from "react-icons/io";
import {useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [t, i18n] = useTranslation("global")
  const languageRef = useRef(null)
  const [visible, setVisible] = useState(null)

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    showHide()
  }

  const showHide = () => {

    const language = languageRef.current.getElementsByClassName("dropdown")
      
    if (visible) {
      language[0].style.visibility = "hidden";
      setVisible(!visible)
    } else {
      language[0].style.visibility = "visible";
      setVisible(!visible)
    }

  }

  // const handleClickOutside = () => {
  //   if (visible) {
  //     setVisible(false);
  //     showHide()
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [visible]);
  
  return (
    <div className="header">
      <nav className="nav-content">
        <a href="/">
          Home
        </a>
        <div ref={languageRef} className="idioma">
        <div onClick={() => showHide()} className="selected-language">{t("header.language")} <IoMdArrowDropdown className="arrow-down"/></div>
          <ul className="dropdown">
            <li onClick={() => handleChangeLanguage("pt-br")}><a>{t("header.portugueseLanguage")}</a></li>
            <li onClick={() => handleChangeLanguage("en-us")}><a>{t("header.englishLanguage")}</a></li>
          </ul>
        </div>
      </nav>      
    </div>
  )
}

export default Header