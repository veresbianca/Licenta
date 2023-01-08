import React, { createContext, PropsWithChildren, useState } from 'react';

type TAppContext = {
  showMobileMenu: Boolean;
  setShowMobileMenu: Function;
};

type HOC = (Component: any) => React.FC<PropsWithChildren<any>>;

const AppContext = createContext({} as TAppContext);

const withContextProvider: HOC = Component => {
  return () => {
    const [showMobileMenu, setShowMobileMenu] = useState<Boolean>(true);

    const context: TAppContext = {
      showMobileMenu,
      setShowMobileMenu,
    };

    return (
      <AppContext.Provider value={context}>
        <Component />
      </AppContext.Provider>
    );
  };
};

export { withContextProvider };

export default AppContext;
