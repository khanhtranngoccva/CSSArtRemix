import {useState} from 'react'
import reactLogo from './assets/react.svg'
import {} from "./react-dimension-css/DimensionCSS.module.css";
import classes from "./house.module.css";
import Canvas from "./react-dimension-css/Canvas/Canvas";
import Camera from "./react-dimension-css/Camera/Camera";
import ReusableBox from "./react-dimension-css/ReusableBox/ReusableBox";
import TransformGroup from "./react-dimension-css/TransformGroup/TransformGroup";
import Plane from "./react-dimension-css/Plane/Plane";

function classJoin(classes) {
    return classes.filter(Boolean).join(" ");
}

function Window(props) {
    return <TransformGroup className={`${classes.window} ${props.className || ""}`}>
        <TransformGroup
            className={`${classes.windowFrame} ${classes.windowFrameInner} ${props.classNames?.inner || ""}`}>
            <ReusableBox className={classJoin([classes.windowFrameHorizontal, classes.windowFrame1])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameVertical, classes.windowFrame2])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameHorizontal, classes.windowFrame3])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameVertical, classes.windowFrame4])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameHorizontal])}></ReusableBox>
        </TransformGroup>
        <TransformGroup
            className={`${classes.windowFrame} ${classes.windowFrameOuter} ${props.classNames?.outer || ""}`}>
            <ReusableBox className={classJoin([classes.windowFrameHorizontal, classes.windowFrame1])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameVertical, classes.windowFrame2])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameHorizontal, classes.windowFrame3])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameVertical, classes.windowFrame4])}></ReusableBox>
            <Plane className={classes.windowPane}></Plane>
        </TransformGroup>
    </TransformGroup>
}

function Door(props) {
    return <TransformGroup className={`${classes.door} ${props.className || ""}`}>
        <TransformGroup
            className={`${classes.doorFrame} ${classes.doorFrameOuter} ${props.classNames?.outer || ""}`}>
            <ReusableBox className={classJoin([classes.doorFrameHorizontal, classes.doorFrame1])}></ReusableBox>
            <ReusableBox className={classJoin([classes.doorFrameVertical, classes.doorFrame2])}></ReusableBox>
            <ReusableBox className={classJoin([classes.doorFrameVertical, classes.doorFrame4])}></ReusableBox>
            <Plane className={classes.doorSpace}></Plane>
        </TransformGroup>
        <TransformGroup className={classes.doorBlock}>
            <ReusableBox className={`${classes.doorBlockMain}`}>
            </ReusableBox>
            <TransformGroup className={`${classes.doorFrame} ${props.classNames?.inner}`}>
                <ReusableBox className={classJoin([classes.doorFrameHorizontal, classes.doorFrame1])}></ReusableBox>
                <ReusableBox className={classJoin([classes.doorFrameVertical, classes.doorFrame2])}></ReusableBox>
                <ReusableBox className={classJoin([classes.doorFrameHorizontal, classes.doorFrame3])}></ReusableBox>
                <ReusableBox className={classJoin([classes.doorFrameVertical, classes.doorFrame4])}></ReusableBox>
                <ReusableBox className={classJoin([classes.doorFrameHorizontal])}></ReusableBox>
            </TransformGroup>
        </TransformGroup>
    </TransformGroup>
}

function App() {
    return <Canvas allowRotate={true} className={classes.canvas}>
        <TransformGroup className={classes.house}>
            <TransformGroup className={classJoin([classes.roof1])}>
                <ReusableBox className={classJoin([classes.rafter])}></ReusableBox>
                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant1])}></ReusableBox>
                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant2])}></ReusableBox>
            </TransformGroup>
            <TransformGroup className={classJoin([classes.roof2])}>
                <ReusableBox className={classJoin([classes.rafter])}></ReusableBox>
                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant1])}></ReusableBox>
                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant2])}></ReusableBox>
            </TransformGroup>
            <TransformGroup className={classJoin([classes.roof3])}>
                <ReusableBox className={classJoin([classes.rafter])}></ReusableBox>

                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant1])}></ReusableBox>
                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant2])}></ReusableBox>
                <ReusableBox className={classJoin([classes.attic2])}
                             classNames={{
                                 front: classes.attic2Front, left: classes.attic2Side, right: classes.attic2Side
                             }}></ReusableBox>
                <Window className={classes.block3Window} classNames={{
                    outer: classes.block3WindowOuter,
                    inner: classes.block3WindowInner,
                }}></Window>
            </TransformGroup>
            <TransformGroup className={classJoin([classes.roof4])}>
                <ReusableBox className={classJoin([classes.rafter])}></ReusableBox>
                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant1])}></ReusableBox>
                <ReusableBox className={classJoin([classes.slope1, classes.slopeVariant2])}></ReusableBox>
            </TransformGroup>
            <TransformGroup className={classes.block1}>
                <ReusableBox className={classes.block1Main}
                             classNames={{
                                 left: classes.block1MainLeft,
                                 front: classes.block1MainFront,
                                 back: classes.block1MainBack
                             }}></ReusableBox>
                <Window className={classes.block1SideWindow}></Window>
                <Window className={classes.block1SideWindow2}
                    classNames={{
                        outer: classes.block1SideWindow2Outer,
                        inner: classes.block1SideWindow2Inner
                    }}></Window>
                <Window className={classes.block1RearWindow}></Window>

                <TransformGroup className={classes.frontArea}>
                    <ReusableBox className={classes.frontWallAndCeiling}
                                 classNames={{back: classes.frontWall}}></ReusableBox>
                    <Window className={classes.frontWindow} classNames={{
                        outer: classes.frontWindowOuter,
                        inner: classes.frontWindowInner,
                    }}></Window>
                    <Door className={classes.frontDoor}></Door>
                    <Door className={classes.backDoor}></Door>
                </TransformGroup>
                <ReusableBox className={`${classes.foundation1} ${classes.foundation}`}
                             classNames={{top: `${classes.stripes} ${classes.floor}`}}></ReusableBox>
            </TransformGroup>
            <TransformGroup className={classes.block2}>
                <ReusableBox className={classes.block2Main}
                             classNames={{
                                 right: classes.block2MainRight,
                                 front: classes.block2MainFront,
                                 back: classes.block2MainBack
                             }}></ReusableBox>
                <ReusableBox className={`${classes.foundation2} ${classes.foundation}`}></ReusableBox>
            </TransformGroup>
            <TransformGroup className={classes.block3}>
                <ReusableBox className={classes.block3Main}
                             classNames={{
                                 right: classes.block3MainRight,
                                 left: classes.block3MainLeft,
                                 back: classes.block3MainBack,
                                 front: classes.block3MainFront,
                             }}></ReusableBox>
                <Window className={classes.block2Window} classNames={{
                    outer: classes.block2WindowOuter,
                    inner: classes.block2WindowInner,
                }}></Window>
                <ReusableBox className={`${classes.foundation3} ${classes.foundation}`}></ReusableBox>
                <TransformGroup className={`${classes.hexagonCorner} ${classes.stripes}`}>
                    <TransformGroup className={classes.wall1}>
                        <Plane className={classes.wall1Inner}></Plane>
                        <ReusableBox className={classes.wall1Base}></ReusableBox>
                        <Window></Window>
                    </TransformGroup>
                    <TransformGroup className={classes.wall2}>
                        <Plane className={classes.wall1Inner}></Plane>
                        <ReusableBox className={classes.wall1Base}></ReusableBox>
                        <Window></Window>
                    </TransformGroup>
                    <TransformGroup className={classes.wall3}>
                        <Plane className={classes.wall1Inner}></Plane>
                        <ReusableBox className={classes.wall1Base}></ReusableBox>
                        <Window></Window>
                    </TransformGroup>
                </TransformGroup>
            </TransformGroup>
            <ReusableBox className={classes.block4}></ReusableBox>
        </TransformGroup>
    </Canvas>
}
export default App
