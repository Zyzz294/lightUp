import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Box, Button, Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import './AdminUser.sass'
import UserActions from './UserActions/UserActions'
import DropDownBtn from './DropDown/DropDownBtn'
import AddNewUserForm from './Forms/AddNewUserForm/AddNewUserForm'
import {
  getAllModerators,
  getAllUsers,
  reset,
} from '../../../../redux/user/userSlice'
import { getUserData } from '../../../../redux/getUserData/getUserData'

const columnsUsers = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'surname', headerName: 'Surname', width: 200 },
  { field: 'email', headerName: 'Gmail', width: 250 },
  { field: 'mentorName', headerName: 'Mentor', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 200,
    renderCell: (params) => <UserActions {...{ params }} />,
  },
]

const columnsModers = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'surname', headerName: 'Surname', width: 200 },
  { field: 'email', headerName: 'Gmail', width: 250 },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 200,
    renderCell: (params) => <UserActions {...{ params }} />,
  },
]

function AdminUser() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useDispatch()
  const [filterOption, SetFilterOption] = useState('Moderator')
  const { allUsers, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (filterOption === 'User') {
      dispatch(getAllUsers())
    }

    if (filterOption === 'Moderator') {
      dispatch(getAllModerators())
    }
  }, [dispatch, filterOption])

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Database received successfully')
      dispatch(reset())
    }
  }, [isSuccess, dispatch])

  return (
    <div className='userdata_items'>
      <div className='userdata_items_theme'>
        <h1>Database of all users</h1>

        <Button variant='contained' size='small' onClick={handleOpen}>
          <PersonAddAlt1OutlinedIcon />
          <p className='userdata_items_theme-btn'>Add new user</p>
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <>
            <AddNewUserForm handleClose={handleClose} />
          </>
        </Modal>
      </div>
      <div className='userdata_items_dropdown'>
        <DropDownBtn SetFilterOption={SetFilterOption} />
      </div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allUsers}
          getRowId={(row) => row.id}
          columns={filterOption === 'User' ? columnsUsers : columnsModers}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onCellClick={(e) => dispatch(getUserData(e.row))}
          experimentalFeatures={{ newEditingApi: true }}
          loading={isLoading}
        />
      </Box>
    </div>
  )
}
export default AdminUser
