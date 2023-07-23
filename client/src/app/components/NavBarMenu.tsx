"use client"

import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface MenuItem {
  label: string;
  link: string;
}

interface ToggleableMenuProps {
  items: MenuItem[];
}

const NavBarMenu: React.FC<ToggleableMenuProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleMenuToggle} className="text-white">
				<MenuIcon />
			</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={handleMenuClose}>
            <a href={item.link}>{item.label}</a>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NavBarMenu;
