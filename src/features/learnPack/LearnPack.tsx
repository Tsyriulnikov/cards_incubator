import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getCardsTC, rateCardTC} from "../CardsPack/cardsList/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {CardsType} from "../CardsPack/cardsList/api-Cards";
import {AppRootStateType} from "../../app/store";
import Button from "@mui/material/Button";
import {FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {getCard} from "../../utils/getCard";
import Paper from "@mui/material/Paper";

export const LearnPack = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector((state: AppRootStateType) => state.packs.packsTableData.cardPacks);
    const cardsData = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cards);
    const {id} = useParams()
    const navigate = useNavigate();
    const [curentCard, setCurrentCard] = useState<CardsType>();
    const [showAnswer, setShowAnswer] = useState(false);
    const [valueRate, setValueRate] = useState('5');

    const cards = packs.find((el) => el._id === id);
    const handleChangeValueRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueRate((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        if (id) {
            dispatch(getCardsTC(id, {pageCount: 100}))
        }
        if (cardsData.length > 0) {
            setCurrentCard(getCard(cardsData))
        }

    }, [dispatch, id])

    useEffect(() => {
        if (cardsData.length > 0) {
            setCurrentCard(getCard(cardsData))
        }

    }, [cardsData])

    const hendlerNextQuestion = () => {
        curentCard &&
        setCurrentCard({...curentCard, question: '', shots: 0})
        curentCard &&
        dispatch(rateCardTC(+valueRate, curentCard._id))
        setShowAnswer(false)
    }

    const handlerShowAnswer = () => {
        setShowAnswer(true)
    }

    const onClickHandler = () => {
        navigate(-1)
    };

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyItems="center"
              style={{minHeight: '100vh'}}>
            <Button variant="contained" size={"small"} style={{width: '75px', marginTop: '10%'}}
                    startIcon={<KeyboardBackspaceIcon/>} onClick={onClickHandler}>
                BACK
            </Button>
            <h2 style={{marginTop: '20px'}}>{cards && cards.name}</h2>
            <Box sx={{bgcolor: 'white', maxHeight: '100vh', width: '50vw', marginTop: '20px'}}>
                <p/>
                <div style={{margin: '3%'}}>
                    <p>
                        <strong>Question: &nbsp;</strong>
                        {curentCard && curentCard.question}
                    </p>
                </div>
                <p style={{margin: '3%'}}>Number of attempts to answer a
                    question: &nbsp;{curentCard && curentCard.shots}</p>
                <p/>
                {showAnswer &&
                    <div style={{margin: '3%'}}>
                        <div>
                            <strong>Answer: &nbsp;</strong>
                            {curentCard && curentCard.answer}
                        </div>
                        <p/>
                        <div>
                            <FormControl>
                                <FormLabel id="radio-buttons-group-label">Rate yourself:</FormLabel>
                                <RadioGroup
                                    aria-labelledby="radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={valueRate}
                                    onChange={handleChangeValueRate}
                                >
                                    <FormControlLabel value="1" control={<Radio/>} label="Did not know"/>
                                    <FormControlLabel value="2" control={<Radio/>} label="Forgot"/>
                                    <FormControlLabel value="3" control={<Radio/>} label="A lot of thought"/>
                                    <FormControlLabel value="4" control={<Radio/>} label="Confused"/>
                                    <FormControlLabel value="5" control={<Radio/>} label="Knew the answer"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                }

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
                    {!showAnswer ?
                        <Button variant="contained" size={"small"} style={{width: '200px'}} onClick={handlerShowAnswer}>
                            Show answer</Button>
                        :
                        <Button variant="contained" size={"small"} style={{width: '200px'}}
                                onClick={hendlerNextQuestion}>
                            Next question</Button>
                    }
                </div>
            </Box>
        </Grid>
    )
}

