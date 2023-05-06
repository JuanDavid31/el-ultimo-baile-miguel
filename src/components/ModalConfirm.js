import React from 'react';
import { Typography } from '@mui/material'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

const ModalConfirm = ({
        open,
        setOpen,
        answer
    }) => {

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                answer={answer}
            >
            <DialogContent>
                <DialogContentText style={{whiteSpace: 'pre-line', marginBottom: '1vh' }}>
                <Typography
                    component="h3"
                    variant="body1"
                    align="justify"
                    color="textPrimary"
                    gutterBottom
                    style={{ fontSize: '1.5rem', fontWeight: 'normal',  marginTop: '1vh', marginBottom: '3vh'}}
                >
                    { answer ? "La respuesta es correcta" : "La respuesta es incorrecta" }
                </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: 'red' }} >
                    CERRAR
                </Button>
            </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalConfirm;
