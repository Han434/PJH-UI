import { useState, useCallback } from "react";

type UseToggleReturn = {
    value: boolean;
    setOn: () => void;
    setOff: () => void;
    toggle: () => void;
};

const useToggle = (initialState = false): UseToggleReturn => {
    const [value, setValue] = useState(initialState);

    const setOn = useCallback(() => setValue(true), []);
    const setOff = useCallback(() => setValue(false), []);
    const toggle = useCallback(() => setValue((prev) => !prev), []);

    return { value, setOn, setOff, toggle };
};

export default useToggle;
