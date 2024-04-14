import { MoreVertOutlined } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, MenuItemProps } from '@mui/material'
import React, { FC } from 'react'

type Props = {
  options: MenuItemProps[];
}

const MenuButton: FC<Props> = ({ options }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <MoreVertOutlined />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((optProps, index) => (
          <MenuItem key={index} dense {...optProps}/>
        ))}
      </Menu>
    </>
  )
}

export default MenuButton