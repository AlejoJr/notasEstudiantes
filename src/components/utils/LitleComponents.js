import React, { useState } from 'react'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function Message (props) {
  const [open, setOpen] = useState(props.isActive)
  const vertical = 'top'
  const horizontal = 'right'

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  )
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export { Message }
