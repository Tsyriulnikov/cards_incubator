import React from 'react';
import {NavLink} from "react-router-dom";
import {CARDS, LOG_OUT, PROFILE, REC_PASSWORD, SING_IN, SING_UP} from "../../routes/routes";
import style from './Nav.module.css'

export  const Nav = () => {
    return (
        <div className={style.nav}>
            <div><NavLink to={PROFILE} className={style.item}>PROFILE</NavLink></div>
            <div><NavLink to={SING_IN} className={style.item}>SING IN</NavLink></div>
            <div><NavLink to={SING_UP} className={style.item}>SING UP</NavLink></div>
            <div><NavLink to={CARDS} className={style.item}>CARDS PACK</NavLink></div>
            <div><NavLink to={REC_PASSWORD} className={style.item}>RECOVERY PASSWORD</NavLink></div>
            <div><NavLink to={LOG_OUT} className={style.item}>LOG OUT</NavLink></div>
        </div>
    );
};

