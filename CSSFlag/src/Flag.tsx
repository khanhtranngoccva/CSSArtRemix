import React, {CSSProperties} from "react";
import classes from './styles.module.css'

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
    const [matrixState, setMatrixState] = React.useState<{ matrix: string[][] }>({matrix: []});
    const defaultColor = props.defaultColor ?? "#fff";
    const mutableMouseState = React.useRef<{ mouseDown?: boolean }>({mouseDown: false});

    React.useEffect(() => {
        // Allows shrinking of the length.
        matrixState.matrix.length = props.rowCount;
        for (let i = 0; i < props.rowCount; i++) {
            matrixState.matrix[i] ??= [];
            const row = matrixState.matrix[i];
            row.length = props.columnCount;
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
        return () => window.removeEventListener("mouseup", mouseup);
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
        setMatrixState(prev => ({...prev}))
    }

    return <div className={classes.flag}>
        {Array.from({length: props.columnCount}, (_, index) => {
            return <div className={classes.flagSegment} style={{
                background: getVerticalGradient(matrixState.matrix, index),
                height: friendlyHeight + "px",
                width: friendlyColumnWidth + "px",
                animationDelay: `${props.staggerDelay * -index}s`,
                animationDuration: `${props.duration}s`,
                "--amplitude": `${props.maxAmplitude / (props.columnCount - 1) * index}px`
            } as CSSProperties} key={index} onMouseMove={(e) => {
                handler(e, index);
            }} onMouseDown={(e) => {
                mutableMouseState.current.mouseDown = true
                handler(e, index);
            }}/>
        })}
    </div>
}

export default Flag
