import ColorPicker from "./ColorPicker";
import Flag from "./Flag";
import React from "react";
import classes from './App.module.css'
import RangeInput from "./RangeInput";

export default function App() {
    const [currentColor, setCurrentColor] = React.useState("");
    const [amplitude, setAmplitude] = React.useState(30);
    const [width, setWidth] = React.useState(720);
    const [height, setHeight] = React.useState(540);
    const [duration, setDuration] = React.useState(1);
    const [columns, setColumns] = React.useState(12);
    const [rows, setRows] = React.useState(6);
    const [stagger, setStagger] = React.useState(0.1);


    return <div className={classes.canvas}>
        <div className={classes.navigation}>
            <ColorPicker paletteSize={5} defaultColor={"#ffffff"}
                         onChange={color => setCurrentColor(color)}></ColorPicker>
            <RangeInput value={amplitude} label={"Amplitude"} unit={"px"} min={0} max={100} onChange={(e) => {
                setAmplitude(+e.currentTarget.value);
            }}></RangeInput>
            <RangeInput value={stagger} step={0.00625} label={"Stagger"} unit={"sec"} min={0} max={0.25} onChange={(e) => {
                setStagger(+e.currentTarget.value);
            }}></RangeInput>
            <RangeInput value={duration} step={0.00625} label={"Cycle duration"} unit={"sec"} min={0} max={2} onChange={(e) => {
                setDuration(+e.currentTarget.value);
            }}></RangeInput>
            <RangeInput value={width} step={1} label={"Width"} unit={"px"} min={0} max={1920} onChange={(e) => {
                setWidth(+e.currentTarget.value);
            }}></RangeInput>
            <RangeInput value={height} step={1} label={"Height"} unit={"px"} min={0} max={1440} onChange={(e) => {
                setHeight(+e.currentTarget.value);
            }}></RangeInput>
            <RangeInput value={rows} step={1} label={"Row count"} min={0} max={60} onChange={(e) => {
                setRows(+e.currentTarget.value);
            }}></RangeInput>
            <RangeInput value={columns} step={1} label={"Column count"} min={0} max={60} onChange={(e) => {
                setColumns(+e.currentTarget.value);
            }}></RangeInput>
        </div>
        <Flag rowCount={rows} columnCount={columns} width={width} height={height} duration={duration} staggerDelay={stagger}
              maxAmplitude={amplitude}
              currentColor={currentColor}/>
    </div>
}

