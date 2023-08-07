import classes from "./ColorPicker.module.css"
import React from "react";

export default function ColorPicker(props: {
    paletteSize: 5,
    onChange?: (color: string) => void;
    defaultColor?: string;
}) {
    const [paletteState, setPaletteState] = React.useState<{palette: string[]}>({palette: []});
    const [selected, setSelected] = React.useState(0);

    React.useEffect(() => {
        for (let i = 0; i < props.paletteSize; i++) {
            paletteState.palette[i] = props.defaultColor ?? "#ffffff"
        }
        if (selected < 0) setSelected(0);
        if (selected >= props.paletteSize) setSelected(selected - 1);
        setPaletteState(prev => ({...prev}))
    }, [props.paletteSize]);

    return <div className={classes.pickerContainer}>
        {paletteState.palette.map((value, index) => {
            return <ColorInput key={index} currentColor={value} selected={index === selected} onChange={(color) => {
                paletteState.palette[index] = color;
                props.onChange?.(color);
                setSelected(index);
                setPaletteState(prev => ({...prev}))
            }}></ColorInput>
        })}
    </div>
}

export function ColorInput(props: {
    onChange?: (color: string) => void,
    selected: boolean,
    currentColor: string,
}) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (props.selected) {
            props.onChange?.(inputRef.current!.value);
        }
    }, [props.selected]);

    return <input style={{
        backgroundColor: props.currentColor,
    }} value={props.currentColor} className={`${classes.colorInput} ${props.selected ? classes.inputSelected : ""}`} ref={inputRef} type={"color"} onChange={e => {
        props.onChange?.(e.currentTarget.value);
    }} onClick={e => {
        props.onChange?.(e.currentTarget.value);
        if (!props.selected) {
            e.preventDefault();
        }
    }}/>
}
