import React, { useState } from 'react';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';
import theme from './Theme';
import i18n from './i18n';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Start from './pages/Start';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Timeline';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Contact from './pages/Contact';
import About from './pages/About';
import SinglePost from './pages/SinglePost';
import Meals from './pages/MealPlan';
import Team from './pages/Team';
import Loading from './components/Loading';
import Exercice from './pages/Exercice';

import Auth from './utils/auth.js';
import { Suspense } from 'react';
import Sidebar from './components/Sidebar';

import { withContextProvider } from './AppContext.tsx';

// import LocaleContext from "./LocaleContext";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = withContextProvider(() => {
  return (
    // <LocaleContext.Provider value={{locale, setLocale}}>
    // <Suspense fallback={<Loading />}>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
          <Grid gridTemplateColumns={'auto 1fr'}>
            <GridItem>
              <Sidebar />
            </GridItem>
            <GridItem>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={Auth.loggedIn() ? <Start /> : <Login />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/profile/edit"
                  element={Auth.loggedIn() ? <EditProfile /> : <Login />}
                />
                <Route
                  path="/profile"
                  element={Auth.loggedIn() ? <Profile /> : <Login />}
                />
                <Route
                  path="/posts"
                  element={Auth.loggedIn() ? <Posts /> : <Login />}
                />
                <Route
                  path="/contact"
                  element={Auth.loggedIn() ? <Contact /> : <Login />}
                />
                <Route
                  path="/about"
                  element={Auth.loggedIn() ? <About /> : <Login />}
                />
                <Route
                  path="/meal-plan"
                  element={Auth.loggedIn() ? <Meals /> : <Login />}
                />
                <Route
                  path="/post/:postId"
                  element={Auth.loggedIn() ? <SinglePost /> : <Login />}
                />
                <Route
                  path="/team"
                  element={Auth.loggedIn() ? <Team /> : <Login />}
                />
                <Route
                  path="/exercice"
                  element={Auth.loggedIn() ? <Exercice /> : <Login />}
                />
              </Routes>
              <Footer />
            </GridItem>
          </Grid>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
});
// const [locale, setLocale] = useState(i18n.language);

// i18n.on('languageChanged', (lng) => setLocale(i18n.language));

export default App;
