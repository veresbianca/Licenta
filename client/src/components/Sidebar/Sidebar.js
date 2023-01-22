import React, { useContext, useEffect, useState } from 'react';
import { Flex, Avatar, useMediaQuery, Link, Image } from '@chakra-ui/react';
import {
  FiHome,
  FiUser,
  FiMessageCircle,
  FiUsers,
  FiActivity,
  FiLogOut,
} from 'react-icons/fi';
import NavItem from './NavItem';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/logos/healthy-studio-logo.png';

import Auth from '../../utils/auth';

import AppContext from '../../AppContext.tsx';

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('small');
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { showMobileMenu } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    changeNavSize(isLargerThan1024 ? 'large' : 'small');
  }, [isLargerThan1024]);

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
              title="Posts"
              link="/posts"
              active={location.pathname === '/posts' ? true : false}
            />

            <NavItem
              navSize={navSize}
              color="black"
              title="Meals"
              link="/meal-plan"
              active={location.pathname === '/meals' ? true : false}
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
              title="Exercice"
              link="/exercice"
              active={location.pathname === '/exercice' ? true : false}
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
    </Flex>
  );
}
