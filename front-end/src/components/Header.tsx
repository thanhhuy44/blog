import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

function Header() {
  return (
    <Navbar maxWidth="2xl" shouldHideOnScroll>
      <NavbarBrand className="basis-0 grow-0">
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light">User</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="login">
                <Link href="/login">Login</Link>
              </DropdownItem>
              <DropdownItem key="login">
                <Link href="/register">Register</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="basis-0 !grow-0" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="solid">User</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="login">
                <Link href="/login">Login</Link>
              </DropdownItem>
              <DropdownItem key="login">
                <Link href="/register">Register</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
