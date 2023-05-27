import React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import './PaginationForm.sass'

function PaginationForm({ page, setPage, color }) {
  return (
    <div className='container'>
      <Stack spacing={2} alignItems='center' margin={'40px 0'}>
        <Pagination
          count={2}
          page={page}
          color={color}
          onChange={(_, num) => setPage(num)}
        />
      </Stack>
    </div>
  )
}

export default PaginationForm
