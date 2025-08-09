import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const CustomMenu = ({ children = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        onClick={handleClick}
        size="large"
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {React.Children.map(children, (child, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              // You can also choose NOT to close on click
            }}
            disableRipple
          >
            {child}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CustomMenu;