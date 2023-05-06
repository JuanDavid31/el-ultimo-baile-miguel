import { Typography, Card, CardContent, } from '@mui/material'
import ModalQuestion from './ModalQuestion'
import React, { useState } from 'react'

const CardP = (item) => {

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpen = (temp) => {
    setOpenDialog(temp)
  }

  return (
    <>
      <ModalQuestion
        open={openDialog}
        setOpen={setOpenDialog}
        item={item.item}
      />
      <Card onClick={handleOpen} className="card"
        style={{
          flex: 1,
          height: '19rem',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          maxHeight: '30rem',
          border: '1.5px solid #d3d4d5',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        <CardContent style={{ margin: '0 auto', padding: '0', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Typography
            component="h3"
            variant="body1"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ fontSize: '1.5rem', fontWeight: 'normal' }}
          >
            {item.item['state'] ? item.item['word'] : '?'}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default CardP