import React from 'react';
import Loading from '../components/Loading'
import AppBar from "../components/AppBar"
import CardQuestion from '../components/CardQuestion'
import { Container, Grid, TextField, Button } from '@mui/material'
import { useState, useEffect } from "react"
import ModalConfirm from '../components/ModalConfirm'

const Questions = () => {

    const [questions, setQuestions] = useState([]);
    const [array, setArray] = useState([]);
    const [answer, setAnswer] = useState();
    const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

    useEffect(() => {
      loadData()
      loadDataAnswer()
    }, [])

    const loadData = () => {
        const url = 'https://react-ultimo-baile-default-rtdb.firebaseio.com/preguntas.json';
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            data.splice(0,1);
            setQuestions(data)
        })
    }

    const loadDataAnswer = () => {
        const url = 'https://react-ultimo-baile-default-rtdb.firebaseio.com/contrasena.json';
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            const text = data.split('');
            let arrayTemp = []
            text.map((temp, index) => {
                return arrayTemp.push({id: index, word: temp, wordAnswer: temp === " " ? " " : "",})
            })
            setArray(arrayTemp)
        })
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
        }
        setAnswer(tempAnswer)
        handleOpenDialogConfirm(tempAnswer)
    }

    const handleOpenDialogConfirm = (tempAnswer) => {
        if(tempAnswer)
        {
            setOpenDialogConfirm(true)
            window.open("https://docs.google.com/document/d/197TKeX0r_OURcCF-B0XJRdZFMrR4uUl6/edit?usp=sharing&ouid=113044795245750103423&rtpof=true&sd=true", '_blank');
            setOpenDialogConfirm(false)
            updateData()
        }
    }

    const updateData = async (tempAnswer) => {
        const temp = { finalizo: true }
        await fetch(`https://react-ultimo-baile-default-rtdb.firebaseio.com/finalizo.json`, {
            method: 'PUT',
            body: JSON.stringify(temp),
	        headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <>
            <ModalConfirm
                open={openDialogConfirm}
                setOpen={setOpenDialogConfirm}
                answer={answer}
            />
            <AppBar/>
            <Container maxWidth='lg'>
            <Grid container  style={{ display: 'flex', justifyContent: 'space-around', fontSize: '2.5rem', fontWeight: 'bold', marginTop:'16vh' }}>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{marginTop:'3vh', marginLeft:'1vw', marginRight:'1vw', display: 'flex', justifyContent: 'space-around'}}>
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
                                size="small"
                                inputProps={{ maxLength: 1, style: { textAlign: 'center', width: '2vw', height: '4vh', background: 'white', borderRadius: '5px'} }}
                                onChange={handleChange}
                            />
                        }
                    })}
                    </Grid>
                    <Button variant='outlined' color="inherit" onClick={handleConfirm} style={{ marginBottom:'5vh'}}>Confirmar Respuesta</Button>
                </Grid>
            </Container>

            {questions.length === 0 ? <Loading/> : <></>}
            <Container maxWidth='lg' className="showCharacters">
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginBottom:'12vh' }}>
                    {questions.map((question, index) => (
                        <Grid item xs={4} sm={4} md={4} key={index}>
                            <CardQuestion
                                item={question}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default Questions;
