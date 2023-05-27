import React, { useEffect, useState } from 'react'
import {
  Box,
  Tooltip,
  IconButton,
  Button,
  DialogActions,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { useDispatch, useSelector } from 'react-redux'
import {
  verifyForumById,
  deleteForumById,
} from '../../../../../redux/forum/forumSlice'

function SupportActions() {
  const dispatch = useDispatch()
  const [openApproveConfirm, setOpenApproveConfirm] = useState(false)
  const [openRejectConfirm, setOpenRejectConfirm] = useState(false)
  const handleClickOpenApprove = () => setOpenApproveConfirm(true)
  const handleClickCloseApprove = () => setOpenApproveConfirm(false)
  const handleClickOpenReject = () => setOpenRejectConfirm(true)
  const handleClickCloseReject = () => setOpenRejectConfirm(false)
  const { userData } = useSelector((state) => state.getUser) //пофиксить на getData
  const id = userData.id
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user.token

  function approveForum() {
    dispatch(verifyForumById({id, token}))
    handleClickCloseApprove()
  }

  function rejectForum() {
    dispatch(deleteForumById(userData.id))
    handleClickCloseReject()
  }

  return (
    <div>
      <Box>
        <Tooltip title='Approve?'>
          <IconButton onClick={handleClickOpenApprove}>
            <CheckCircleOutlineSharpIcon color='success' />
          </IconButton>
        </Tooltip>
        <Dialog
          open={openApproveConfirm}
          onClose={handleClickOpenApprove}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to approve this request?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseApprove}>Disagree</Button>
            <Button onClick={approveForum} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Tooltip title='Reject?'>
          <IconButton onClick={handleClickOpenReject}>
            <HighlightOffSharpIcon color='error' />
          </IconButton>
        </Tooltip>
        <Dialog
          open={openRejectConfirm}
          onClose={handleClickOpenReject}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to reject this request?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseReject}>Disagree</Button>
            <Button onClick={rejectForum} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  )
}

export default SupportActions
