import React, {CSSProperties} from "react";
import classes from './Flag.module.css'

function getVerticalGradient(matrix: string[][], colIndex: number) {
    if (matrix.length === 0) return "";
    const column = Array.from({length: matrix.length}, (_, rowIndex) => {
        return matrix[rowIndex][colIndex]
    });
    const percentageStep = 100 / column.length;
    const result: string[] = [];
    for (let i = 0; i < column.length; i++) {
        const color = column[i];
        result.push(`${color} ${percentageStep * i}%`)
        result.push(`${color} ${percentageStep * (i + 1)}%`)
    }
    return `linear-gradient(180deg, ${result.join(", ")})`
}

const DEFAULT_COLORS = ["red", "orange", "yellow", "green", "blue", "purple"]

function Flag(props: {
    editable?: boolean,
    rowCount: number,
    columnCount: number,
    width: number,
    height: number,
    currentColor: string,
    staggerDelay: number,
    duration: number,
    maxAmplitude: number,
    defaultColor?: string,
}) {
    const [matrixState, setMatrixState] = React.useState<{ matrix: string[][] }>(() => {
        let saved: string[][];
        try {
            saved = JSON.parse(localStorage.getItem("flag") ?? JSON.stringify(DEFAULT_COLORS.map(color => Array.from({length: 20}, () => color))));
        } catch (e) {
            saved = [];
        }
        return {matrix: saved}
    });
    const defaultColor = props.defaultColor ?? "#fff";
    const mutableMouseState = React.useRef<{ mouseDown?: boolean }>({mouseDown: false});
    const flagRef = React.useRef<HTMLDivElement | null>(null);
    const keyPrefix = React.useMemo(() => {
        return crypto.randomUUID();
    }, [props.columnCount]);

    React.useEffect(() => {
        for (let i = 0; i < props.rowCount; i++) {
            matrixState.matrix[i] ??= [];
            const row = matrixState.matrix[i];
            for (let i = 0; i < props.columnCount; i++) {
                row[i] ??= defaultColor;
            }
        }
        setMatrixState({matrix: matrixState.matrix});
    }, [props.rowCount, props.columnCount]);

    React.useEffect(() => {
        function mouseup() {
            mutableMouseState.current.mouseDown = false;
        }

        window.addEventListener("mouseup", mouseup);
        window.addEventListener("pointerup", mouseup);
        return () => {
            window.removeEventListener("mouseup", mouseup);
            window.removeEventListener("pointerup", mouseup);
        }
    }, []);

    // Friendly height and width.
    const friendlyColumnWidth = Math.ceil(props.width / props.columnCount);
    const friendlyRowHeight = Math.ceil(props.height / props.rowCount);
    const friendlyHeight = friendlyRowHeight * props.rowCount;

    function handler(e: React.MouseEvent<HTMLDivElement>, index: number) {
        const top = e.nativeEvent.offsetY;
        const rowIndex = Math.floor(top / e.currentTarget.offsetHeight * props.rowCount);
        if (mutableMouseState.current.mouseDown) {
            if (matrixState.matrix?.[rowIndex]) {
                matrixState.matrix[rowIndex][index] = props.currentColor;
            }
        }
        localStorage.setItem("flag", JSON.stringify(matrixState.matrix))
        setMatrixState(prev => ({...prev}))
    }

    console.log(matrixState);
    return <div className={classes.flag} ref={flagRef}>
        {Array.from({length: props.columnCount}, (_, index) => {
            const stagger = `${props.staggerDelay * index - props.columnCount * props.staggerDelay}s`;
            const amplitude = `${props.maxAmplitude / (props.columnCount - 1) * index}px`;
            return <div className={classes.flagSegment} style={{
                background: getVerticalGradient(matrixState.matrix.slice(0, props.rowCount), index),
                height: friendlyHeight + "px",
                width: friendlyColumnWidth + "px",
                animationDelay: stagger,
                animationDuration: `${props.duration}s`,
                "--amplitude": amplitude,
            } as CSSProperties} key={`${keyPrefix}_${index}`} onMouseMove={(e) => {
                handler(e, index);
            }} onMouseDown={(e) => {
                mutableMouseState.current.mouseDown = true
                handler(e, index);
            }} onPointerMove={(e) => {
                handler(e, index);
            }} onPointerDown={(e) => {
                mutableMouseState.current.mouseDown = true
                handler(e, index);
            }}/>
        })}
    </div>
}

export default Flag
