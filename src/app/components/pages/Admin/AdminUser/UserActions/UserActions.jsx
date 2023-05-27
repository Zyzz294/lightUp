import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Tooltip,
  IconButton,
  Modal,
} from '@mui/material'
import EditUserForm from '../Forms/EditUserForm/EditUserForm'
import { deleteUserById } from '../../../../../redux/user/userSlice'

function UserActions() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleClickOpen = () => setOpenConfirm(true)
  const handleClickClose = () => setOpenConfirm(false)
  const { userData } = useSelector((state) => state.getUser)
  // const { isSuccess, isError, message } = useSelector((state) => state.user)

  function deleteUser() {
    dispatch(deleteUserById(userData.id))
    handleClickClose()
  }

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success('User deleted successfully')
  //   }

  //   if (isError) {
  //     toast.error(message)
  //   }

  //   dispatch(reset())
  // }, [isError, message, dispatch]) //TODO: bug with toast(deleted) when isSuccess

  return (
    <>
      <Box>
        <Tooltip title='Edit this user'>
          <IconButton onClick={handleOpen}>
            <ModeEditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <>
            <EditUserForm handleClose={handleClose} />
          </>
        </Modal>

        <Tooltip title='Delete this user'>
          <IconButton onClick={handleClickOpen}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        open={openConfirm}
        onClose={handleClickOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Disagree</Button>
          <Button onClick={deleteUser} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserActions
