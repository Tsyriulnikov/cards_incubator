import {AppDispatch, AppRootStateType} from "../../app/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export const useDebounce = (value:string | undefined, delay:number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]
    );
    return debouncedValue;
};