import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { DataGrid } from '@mui/x-data-grid'
import './AdminSupport.sass'
import SupportActions from './SupportActions/SupportActions'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllApprovedForums,
  getAllForums,
  getAllPendingForums,
  getAllRejectedForums,
  reset,
} from '../../../../redux/forum/forumSlice'
import { getUserData } from '../../../../redux/getUserData/getUserData'
import { toast } from 'react-toastify'
import DropDownBtn from './DropDown/DropDownBtn'

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props
  const wrapper = React.useRef(null)
  const cellDiv = React.useRef(null)
  const cellValue = React.useRef(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [showFullCell, setShowFullCell] = React.useState(false)
  const [showPopper, setShowPopper] = React.useState(false)

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current)
    setShowPopper(isCurrentlyOverflown)
    setAnchorEl(cellDiv.current)
    setShowFullCell(true)
  }

  const handleMouseLeave = () => {
    setShowFullCell(false)
  }

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setShowFullCell, showFullCell])

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant='body2' style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  )
})

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
}

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
    />
  )
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.string,
}

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 30,
  },
  {
    field: 'user.name',
    headerName: 'Name',
    width: 100,
    editable: true,
  },
  {
    field: 'user.surname',
    headerName: 'Surname',
    width: 150,
    editable: true,
  },
  {
    field: 'user.email',
    headerName: 'Gmail',
    width: 200,
    editable: true,
  },

  {
    field: 'description',
    headerName: 'Message',
    width: 300,
    renderCell: renderCellExpand,
    editable: true,
  },
  {
    field: 'dateCreated',
    type: 'dateTime',
    width: 200,
    valueGetter: ({ value }) => value && new Date(value),
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 200,
    renderCell: (params) => <SupportActions {...{ params }} />,
    editable: true,
  },
]

export default function AdminSupport() {
  const [filterOption, SetFilterOption] = useState('Pending')
  const dispatch = useDispatch()

  const { allForums, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.forum
  )

  useEffect(() => {
    if (filterOption === 'Pending') {
      dispatch(getAllPendingForums())
    }

    if (filterOption === 'All') {
      dispatch(getAllForums())
    }

    if (filterOption === 'Approved') {
      dispatch(getAllApprovedForums())
    }

    if (filterOption === 'Disapproved') {
      dispatch(getAllRejectedForums())
    }
  }, [dispatch, filterOption])

  // Для получения вложенных данных чтобы МЮАЙ принял
  function flattenObject(ob) {
    const toReturn = {}

    Object.keys(ob).map((i) => {
      if (typeof ob[i] === 'object' && ob[i] !== null) {
        const flatObject = flattenObject(ob[i])
        Object.keys(flatObject).map((x) => {
          toReturn[`${i}.${x}`] = flatObject[x]
          return x
        })
      } else {
        toReturn[i] = ob[i]
      }
      return i
    })
    return toReturn
  }

  const data = allForums.map((_data) => {
    return flattenObject(_data)
  })

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Forums received successfully')
      dispatch(reset())
    }
  }, [isSuccess, dispatch])

  return (
    <div className='dbsupport'>
      <h2 className='dbsupport__title'>Support</h2>
      <div className='userdata_items_dropdown'>
        <DropDownBtn SetFilterOption={SetFilterOption} />
      </div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          onCellClick={(e) => dispatch(getUserData(e.row))}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          loading={isLoading}
        />
      </Box>
    </div>
  )
}
