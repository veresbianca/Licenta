import React, { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  IconButton,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import AppContext from '../../AppContext.tsx';

import Auth from '../../utils/auth';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../../LocaleContext';

import { FiMenu, FiHome, FiUser, FiSettings } from 'react-icons/fi';

import i18n from '../../i18n';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMobileMenu, setShowMobileMenu } = useContext(AppContext);
  const [isLargerThan426] = useMediaQuery('(min-width: 426px)');
  const showNav = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <Box bg={useColorModeValue('#f7fafc')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: 'none' }}
            icon={<FiMenu />}
            color="black"
            display={isLargerThan426 ? 'none' : 'block'}
            onClick={showNav}
          />
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {Auth.loggedIn() ? (
                <Menu>
                  <MenuList alignItems={'center'}>
                    <br />
                    {/*This needs to show only when logged in, otherwise shows login button*/}
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={
                          'https://avatars.dicebear.com/api/male/username.svg'
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{Auth.getProfile().data.username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem
                      onClick={e => {
                        e.preventDefault();
                        Auth.logout();
                      }}
                    >
                      Deconectare
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Link as={RouterLink} to="/login">
                    <Button
                      color={'black'}
                      _hover={{
                        bg: 'lightgreen',
                      }}
                    >
                      Conectare
                    </Button>
                  </Link>
                  <Link as={RouterLink} to="/signup">
                    <Button
                      bg={'green'}
                      color={'white'}
                      _hover={{
                        bg: 'darkgreen',
                      }}
                    >
                      Înregistrare
                    </Button>
                  </Link>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
