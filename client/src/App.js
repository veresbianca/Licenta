import React, {useState} from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from "./Theme";
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
import Loading from "./components/Loading";

import Auth from './utils/auth.js'
import { Suspense } from 'react';

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

function App() {
  // const [locale, setLocale] = useState(i18n.language);

  // i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  return (
    // <LocaleContext.Provider value={{locale, setLocale}}>
    // <Suspense fallback={<Loading />}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Router>
            <Navbar />
            <Routes>
              <Route 
                path="/" 
                element={<Start />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route
                path="/profile/edit"
                element={<EditProfile />}
              />
              <Route
                path="/profile"
                element={Auth.loggedIn() ? <Profile /> : <Login />}
              />
              <Route 
                path="/posts"
                element={<Posts />}
              />
              <Route 
                path="/contact" 
                element={<Contact />} 
              />
              <Route 
                path="/about" 
                element={<About />} 
              />
              <Route
                path="/meal-plan"
                element={<Meals />}
              />
              <Route 
                path="/post/:postId" 
                element={<SinglePost />} 
              />
            </Routes>
            <Footer />
          </Router>
        </ChakraProvider>
      </ApolloProvider>
   
  );
}

export default App;
