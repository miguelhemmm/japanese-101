import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button className="language-toggle" onClick={toggleLanguage}>
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </button>
  );
};
