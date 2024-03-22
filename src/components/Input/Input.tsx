import React, { KeyboardEvent } from "react";
import "./Input.css";
import { Language } from "../../types";

interface IInput {
  value: string;
  placeholder: string;
  language: Language;
  onTextInputChange: (text: string) => void;
  handleInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeLanguage: (language: Language) => void;
}

const Input: React.FC<IInput> = ({
  value,
  placeholder,
  language,
  onTextInputChange,
  handleInputKeyDown,
  onChangeLanguage,
}) => {
  return (
    <div className="InputWrapper">
      <input
        className="Input"
        value={value}
        onChange={(event) =>
          onTextInputChange(event.target.value.toUpperCase())
        }
        onKeyDown={(event) => handleInputKeyDown(event)}
        placeholder={placeholder}
      />
      <p
        onClick={() => {
          onChangeLanguage(language === "SWE" ? "ENG" : "SWE");
        }}
        className="LanguageToggle"
      >
        {language}
      </p>
    </div>
  );
};

export default Input;
