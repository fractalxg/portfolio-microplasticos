import { useTranslation } from "react-i18next";
import "./Content.css"

const Content = () => {
	const [t, i18n] = useTranslation("global")
	
	return (
		<div className="txt">
		<h1>{t("content.title")}</h1>
		<p>{t("content.paragraphOne")}</p>
		<p><br></br>{t("content.paragraphTwo")}</p>
		<p><br></br>{t("content.paragraphThree")}</p>
		<p><br></br>{t("content.paragraphFour")}</p>
		<p><br></br>{t("content.paragraphFive")}</p>
		<p><br></br>{t("content.paragraphSix")}</p>
		<p><br></br>{t("content.paragraphSeven")}</p>
		</div>
		
		)
	}
	
	export default Content