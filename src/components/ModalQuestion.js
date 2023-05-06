import React from 'react';
import { Typography, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import ModalConfirm from './ModalConfirm'

const ModalQuestion =  ({
        open,
        setOpen,
        item
    }) => {

    const [array, setArray] = useState([]);
    const [answer, setAnswer] = useState();
    const [openDialogConfirm, setOpenDialogConfirm] = useState(false)

    useEffect(() => {
        const text = item['answer'].split('')
        let arrayTemp = []
        text.map((temp, index) => {
            return arrayTemp.push({id: index, word: temp, wordAnswer: temp === " " ? " " : "",})
        })
        setArray(arrayTemp)
    }, [item])

    useEffect(() => {
        if(answer) {
            setArray(array.map((item, index) => {
                if(item.id === index) {
                  return { ...item, state: answer };
                }
                else {
                  return item;
                }
            }))
        }
    }, [answer, array])

    const handleClose = () => {
        setOpen()
    }

    const handleChange = (event) => {
        if(event !== undefined) {
            setArray(array.map((item, index) => {
                if(array[event.target.id].id === index) {
                  return { ...item, wordAnswer: event.target.value };
                }
                else {
                  return item;
                }
            }))
        }
    };

    const handleConfirm = () => {
        let tempAnswer = true
        for(let temp of array) {
            if(temp.word !== temp.wordAnswer.toUpperCase()) {
                tempAnswer = false
                break
            }
        setAnswer(tempAnswer)
        }
        handleOpenDialogConfirm(tempAnswer)
    }

    const handleOpenDialogConfirm = (tempAnswer) => {
        updateData(tempAnswer)
        setOpenDialogConfirm(true)
        if(answer)
        {
            setOpen(answer)
        }
    }

    const updateData = async (tempAnswer) => {
        const temp = { ...item, state: tempAnswer }
        await fetch(`https://react-ultimo-baile-default-rtdb.firebaseio.com/preguntas/${item.id}.json`, {
            method: 'PUT',
            body: JSON.stringify(temp),
	        headers: {
                'Content-Type': 'application/json',
            },
        })
        window.location.reload()
    }

    return (
        <>
            <ModalConfirm
                open={openDialogConfirm}
                setOpen={setOpenDialogConfirm}
                answer={answer}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
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
                    ¿ {item["text"]} ?
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    {array && array.map((temp, index) => {
                        if(temp.word === ' ') {
                            return <p style={{marginLeft: '2wh', marginRight: '2vw'}}></p>
                        }
                          else
                        {
                            return <TextField
                                id={index.toString()}
                                required
                                type='text'
                                variant="outlined"
                                autoComplete='off'
                                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                onChange={handleChange}
                            />
                        }
                     })}
                </div>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: 'red' }} >
                    CERRAR
                </Button>
                <Button onClick={handleConfirm} style={{ marginRight: '50wh' }} >
                    CONFIRMAR
                </Button>
            </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalQuestion;
