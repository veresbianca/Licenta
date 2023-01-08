import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  useMediaQuery,
  Link,
  Image,
  Button,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMessageCircle,
  FiUsers,
  FiActivity,
} from 'react-icons/fi';
import NavItem from './NavItem';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/logos/healthy-studio-logo.png';

import Auth from '../../utils/auth';

import AppContext from '../../AppContext.tsx';
import { use } from 'i18next';

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('small');
  const [isLargerThan426] = useMediaQuery('(min-width: 426px)');
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { showMobileMenu } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = event => {
    event.preventDefault();
    navigate('/profile', { replace: true });
  };

  useEffect(() => {
    changeNavSize(isLargerThan1024 ? 'large' : 'small');
  }, [isLargerThan1024]);

  console.log(location.pathname);
  return (
    <Flex
      pos="sticky"
      left="5"
      h="100%"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      w={navSize === 'small' ? '75px' : '200px'}
      display={showMobileMenu ? 'block' : 'none'}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="10%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <Link as={RouterLink} to="/">
          <Image boxSize="48px" objectFit="contain" src={logoImg} alt="Logo" />
        </Link>

        {Auth.loggedIn() ? (
          <>
            <Avatar
              size={'sm'}
              src={'https://avatars.dicebear.com/api/male/username.svg'}
            />

            <NavItem
              navSize={navSize}
              icon={FiHome}
              color="black"
              title="Home"
              link="/"
              active={location.pathname === '/' ? true : false}
            />

            <NavItem
              navSize={navSize}
              icon={FiUser}
              color="black"
              title="Profile"
              link="/profile"
              active={location.pathname === '/profile' ? true : false}
            />

            <NavItem
              navSize={navSize}
              icon={FiMessageCircle}
              color="black"
              title="Chat"
              link="/chat"
              active={location.pathname === '/chat' ? true : false}
            />

            <NavItem
              navSize={navSize}
              icon={FiUsers}
              color="black"
              title="Team"
              link="/team"
              active={location.pathname === '/team' ? true : false}
            ></NavItem>

            <NavItem
              navSize={navSize}
              icon={FiActivity}
              color="black"
              title="Activity"
              link="/activity"
              active={location.pathname === '/activity' ? true : false}
            ></NavItem>

            <NavItem
              navSize={navSize}
              icon={FiLogOut}
              color="black"
              title="Logout"
              link="/"
              onClick={e => {
                e.preventDefault();
                Auth.logout();
              }}
            />
          </>
        ) : (
          <>
            <NavItem
              navSize={navSize}
              icon={FiHome}
              color="black"
              title="Home"
              link="/"
              active
            />
          </>
        )}
      </Flex>

      {/* <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize === "small" ? "center" : "flex-start"}
                    mb={4}
                >
                    <Divider display={navSize === "small" ? "none" : "flex"} />
                    <Flex mt={4} align="center">
                        <Avatar size="sm" src="https://avatars.dicebear.com/api/male/username.svg" />
                        <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
    {/* need to make username change */}
      {/* {Auth.loggedIn() &&
                            <Heading as="h3" size="sm">{Auth.getProfile().data.username}</Heading>
                        }
                        </Flex> */}
      {/* </Flex> */}
      {/* </Flex> */}
    </Flex>
  );
}
