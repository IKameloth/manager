import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div class="field">
      <div class="control">
        <div class="select is-info">
          <select onChange={changeLanguage}>
            <option value="en" name="language">English</option>
            <option value="es" name="language">Español</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector