import React, {CSSProperties} from "react";
import classes from './RangeInput.module.css'

interface RangeInputProps extends React.ComponentPropsWithRef<"input"> {
    label: string,
    unit?: string,
    value?: number,
    defaultValue?: number,
    inputClassName?: string,
}

function generateGradient() {
    const colors = ["red", "orange", "yellow", "green", "dodgerblue", "purple"];
    const percentageStep = 100 / colors.length;
    const result: string[] = [];
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        result.push(`${color} ${percentageStep * i}%`)
        result.push(`${color} ${percentageStep * (i + 1)}%`)
    }
    return `linear-gradient(90deg, ${result.join(", ")})`;
}

const RangeInput = React.forwardRef<HTMLInputElement, RangeInputProps>
(function _RangeInput(props, ref) {
    const id = React.useId();
    const [currentValue, setCurrentValue] = React.useState(props.defaultValue ?? 0);

    React.useEffect(() => {
        setCurrentValue(props.value ?? props.defaultValue ?? 0);
    }, [props.value]);

    return <div className={classes.container}>
        <label htmlFor={id} className={classes.label}>
            <span>{props.label}</span><span>{currentValue}{props.unit}</span>
        </label>
        <div>
            <input {...props} style={{
                "--rainbow": generateGradient(),
                ...props.style,
            } as CSSProperties} value={props.value} ref={ref} id={id} type={"range"} onChange={e => {
                setCurrentValue(+e.currentTarget.value);
                props.onChange?.(e);
            }} className={`${classes.input} ${props.inputClassName || ""}`}/>
        </div>
    </div>
})

export default RangeInput
