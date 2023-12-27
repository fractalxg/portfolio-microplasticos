import "./Header.css"
import { IoMdArrowDropdown } from "react-icons/io";
import {useRef, useState, useEffect} from "react";

const Header = () => {
  const languageRef = useRef(null)
  const [visible, setVisible] = useState(false)

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

  const handleClickOutside = (event) => {
    if (languageRef.current && !languageRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="header">
      <nav className="nav-content">
        <a href="/">
          Home
        </a>
        <div ref={languageRef} className="idioma">
        <div onClick={() => showHide()} className="selected-language">Idioma <IoMdArrowDropdown className="arrow-down"/></div>
          <ul className="dropdown">
            <li><a>Português (PT-BR)</a></li>
            <li><a>Inglês (EN-US)</a></li>
          </ul>
        </div>
      </nav>      
    </div>
  )
}

export default Header