import React, { useEffect, useState } from 'react'
import './AdminBlog.sass'
import BlogActions from './BlogActions/BlogActions'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllPendingPosts,
  getAllDisapprovedPosts,
  getAllActivePosts,
  reset,
} from '../../../../redux/post/postSlice'
import DropDownBtn from './DropDown/DropDownBtn'
import { getUserData } from '../../../../redux/getUserData/getUserData'
import { toast } from 'react-toastify'

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
  { field: 'id', headerName: 'ID', width: 40 },
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
    field: 'description',
    headerName: 'Publications',
    width: 150,
    renderCell: renderCellExpand,
    editable: true,
  },
  {
    field: 'filePath',
    headerName: 'Image',
    width: 200,
    editable: true,
    renderCell: (params) => <img src={params.value} alt='not found' />,
  },
  {
    field: 'dateCreated',
    headername: 'Date',
    type: 'dateTime',
    width: 200,
    valueGetter: ({ value }) => value && new Date(value),
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Verdict',
    type: 'actions',
    width: 200,
    renderCell: (params) => <BlogActions {...{ params }} />,
    editable: true,
  },
]

function AdminBlog() {
  const [filterOption, SetFilterOption] = useState('Approved')
  const dispatch = useDispatch()
  const userFromLS = JSON.parse(localStorage.getItem('user'))
  const token = userFromLS && userFromLS.token
  const [page, setSage] = useState(1)

  const { allPosts } = useSelector((state) => state.post)

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  )

  useEffect(() => {
    if (filterOption === 'Pending') {
      dispatch(getAllPendingPosts(token))
    }

    if (filterOption === 'Approved') {
      dispatch(getAllActivePosts({ page, token }))
    }

    if (filterOption === 'Disapproved') {
      dispatch(getAllDisapprovedPosts({ page, token }))
    }
  }, [dispatch, filterOption, token, page])

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

  const data = allPosts.map((_data) => {
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
      toast.success('Posts received successfully')
      dispatch(reset())
    }
  }, [isSuccess, dispatch])

  return (
    <div className='dbblog'>
      <h2 className='dbblog__title'>Blog posts</h2>
      <div className='userdata_items_dropdown'>
        <DropDownBtn SetFilterOption={SetFilterOption} />
      </div>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rowHeight={100}
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

export default AdminBlog
