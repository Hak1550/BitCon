import React, { useCallback, useEffect } from 'react'

export const TranslationContext = React.createContext()

// Import necessary modules
import { I18nManager } from 'react-native';
import I18n from 'i18n-js';
import { useSelector } from 'react-redux';

export const TranslationProvider = ({ children, translations }) => {

  const defaultLang = useSelector(state => state.lang.defaultLang)

  // pass all jsons
  I18n.translations = translations

  // Ensure right-to-left or left-to-right text direction (optional)
  I18nManager.forceRTL(false);

  const localized = useCallback(
    (key, config) =>
      I18n.t(key, { ...config, defaultLang }).includes('missing')
        ? key
        : I18n.t(key, { ...config, defaultLang }),
    [],
  )

  useEffect(() => {
    console.log(`write to storage locale: ${defaultLang}`)
    // Set the default language
    I18n.defaultLocale = defaultLang;

    // Set the current locale (can be dynamic)
    I18n.locale = defaultLang;
  }, [defaultLang])

  const value = {
    localized,
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Inject additional props to each child
      return React.cloneElement(child, { localizede: 'localized' });
    }
    return child;
  });

  return (
    <TranslationContext.Provider value={value} >
      {childrenWithProps}
    </TranslationContext.Provider>
  )
}
