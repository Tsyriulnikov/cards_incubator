import React, {ChangeEvent, useState} from 'react'
import {PacksSearch} from "../../packsSearch/packsSearch";
import Button from "@mui/material/Button";
import {addCardsPackTC, getPacksTC, setParamsAC} from "../../cardsPack-reducer";
import {AppRootStateType} from "../../../../app/store";
import style from '../../CardsPack.module.css'
import {Slider} from "@material-ui/core";
import {NewPackModal} from "../Table/NewPackModal";

import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {CardPacksType} from "../../api-CardsPack";

export const HeaderCardsPack = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state: AppRootStateType) => state.profile._id);
    const max = useAppSelector((state: AppRootStateType) => state.cards.params.max);
    const min = useAppSelector((state: AppRootStateType) => state.cards.params.min);

    const [value, setValue] = useState([min || 0, max || 100]);

    const [buttonPacks, setButtonPacks] = useState(true);

    const addPack = (name: string, privatePack: boolean) => {
        dispatch(addCardsPackTC({name: name, private: privatePack}))
    };
    const onClickMyButton = () => {
        setButtonPacks(buttonPacks => !buttonPacks);
        dispatch(getPacksTC({user_id: userId}));
    };
    const onClickAllButton = () => {
        setButtonPacks(buttonPacks => !buttonPacks);
        dispatch(getPacksTC({user_id: ""}));
    };
    const onChangeCallback = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setValue(newValue)
        }
    };
    const handleChangeCommitted = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        Array.isArray(newValue) && dispatch(setParamsAC({
            min: newValue[0],
            max: newValue[1]
        }))
    };

    ///////////
    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)

    const handlerOnClickAddPack = () => {
        setActiveModalAdd(true)
    }
///////////

    return <div className={style.headerCardsPack}>
        <h2 className={style.titleHeaderCP}>Packs list</h2>
        <div className={style.blockBtnAddCP}>

            <Button variant="contained" className={style.btnAddCP} onClick={handlerOnClickAddPack}>
                Add new pack
            </Button>

        </div>
        <div className={style.searchCardsPack}>
            <h4>Search</h4>
            <PacksSearch/>
        </div>
        <div className={style.changeCardsPack}>
            <h4>Show packs cards</h4>
            <div>
                <Button onClick={onClickMyButton}
                        variant={!buttonPacks ? "contained" : "outlined"}
                        className={style.btnCardsPack}
                >
                    My Packs
                </Button>
                <Button onClick={onClickAllButton}
                        variant={buttonPacks ? "contained" : "outlined"}
                        className={style.btnCardsPack}
                >
                    All Packs
                </Button>
            </div>
        </div>
        <div className={style.sliderCardsPack}>
            <h4 className={style.titleSliderCardsPack}>Number of cards</h4>
            <Slider
                value={value}
                onChange={onChangeCallback}
                onChangeCommitted={handleChangeCommitted}
                valueLabelDisplay="on"
                style={{color: '#311B92'}}

            />
        </div>

        <NewPackModal addPack={addPack} activeModalAdd={activeModalAdd} setActiveModalAdd={setActiveModalAdd} />

    </div>
}