import React, { useState } from 'react'
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
import { approvePostById, disapprovePostById } from '../../../../../redux/post/postSlice'

function BlogActions() {
  const dispatch = useDispatch()
  const [openApproveConfirm, setOpenApproveConfirm] = useState(false)
  const [openRejectConfirm, setOpenRejectConfirm] = useState(false)
  const handleClickOpenApprove = () => setOpenApproveConfirm(true)
  const handleClickCloseApprove = () => setOpenApproveConfirm(false)
  const handleClickOpenReject = () => setOpenRejectConfirm(true)
  const handleClickCloseReject = () => setOpenRejectConfirm(false)
  const { userData } = useSelector((state) => state.getUser) //пофиксить на getData
  const postId = userData.id

  function approvePost() {
    dispatch(approvePostById(postId))
    handleClickCloseApprove()
  }

  function rejectPost() {
    dispatch(disapprovePostById(postId))
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
              Are you sure you want to approve this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseApprove}>Disagree</Button>
            <Button onClick={approvePost} autoFocus>
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
              Are you sure you want to reject this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseReject}>Disagree</Button>
            <Button autoFocus onClick={rejectPost}>Agree</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  )
}

export default BlogActions
