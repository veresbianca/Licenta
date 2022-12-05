import React from "react";

const defaultValue = {
  locale: 'ro',
  setLocale: () => {} 
}

export default React.createContext(defaultValue);