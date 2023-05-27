import React, { useState, useRef } from 'react'
import {
  Button,
  ButtonGroup,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const options = ['Pending', 'Approved', 'Disapproved']

function DropDownBtn({ SetFilterOption }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handleClick = () => {
    console.log(`You clicked ${options[selectedIndex]}`)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    SetFilterOption(options[index])
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <React.Fragment>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='split button'
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}

export default DropDownBtn
