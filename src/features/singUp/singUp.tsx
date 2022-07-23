import React from 'react';
import {signUpApi} from "./api-signUp";

export const SingUp = () => {
    return (
        <div>
            SING UP
            <button onClick={()=>signUpApi.registration('max@mail.com', 'mypassword')}>ssssssss</button>
        </div>
    );
};

