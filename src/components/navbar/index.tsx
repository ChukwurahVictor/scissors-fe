import {
  Flex,
  Text,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { logoutDispatch, selectAuth } from "redux/slices/auth";

const Navbar = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { isLoggedIn } = useAppSelector(selectAuth);

   const handleLogout = () => {
     sessionStorage.removeItem("auth-token");
     dispatch(logoutDispatch());

     navigate("/login");
   };

  return (
    <nav>
      <Container maxW="7xl">
        <ul className="navList">
          <Flex justify="space-between" h="90px" alignItems="center">
            <Flex alignItems="center">
              <Link to="/links">
                <Text fontSize={"2xl"} fontWeight={"bold"} fontStyle={"oblique"} color="#1068AB">SHORTIFY</Text>
              </Link>
            </Flex>
            <Flex justify="end">
              {!isLoggedIn ? (
                <Flex fontSize="16px" gap="2" alignItems="center" h="90px">
                  <li>
                    <Button
                      border="1px solid #1068AB"
                      bg="#F1FAFF"
                      color="#1068AB"
                      borderRadius="20px"
                      p="10px 15px"
                    >
                      <Link to="/login">
                        <Text>Login</Text>
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      bg="#1068AB"
                      color="white"
                      borderRadius="20px"
                      p="10px 15px"
                    >
                      <Link to="/signup">
                        <Text>Register</Text>
                      </Link>
                    </Button>
                  </li>
                </Flex>
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"md"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      {/* <Link
                        href="/profile"
                        style={{ textDecoration: "none" }}
                      > */}
                      <Text>Profile</Text>
                      {/* </Link> */}
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/links/settings"
                        style={{ textDecoration: "none" }}
                      >
                        <Text>Settings</Text>
                      </Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </Flex>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
