import React, {useState} from 'react'
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
    const middleBar = props.middleBar ?? true;
    return <TransformGroup className={`${classes.window} ${props.className || ""}`}>
        <TransformGroup
            className={`${classes.windowFrame} ${classes.windowFrameInner} ${props.classNames?.inner || ""}`}>
            <ReusableBox className={classJoin([classes.windowFrameHorizontal, classes.windowFrame1])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameVertical, classes.windowFrame2])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameHorizontal, classes.windowFrame3])}></ReusableBox>
            <ReusableBox className={classJoin([classes.windowFrameVertical, classes.windowFrame4])}></ReusableBox>
            {middleBar ? <ReusableBox className={classJoin([classes.windowFrameHorizontal])}></ReusableBox> : null}
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

function Balloon() {
    const hue = React.useMemo(() => Math.random() * 360, []);
    const w = React.useMemo(() => Math.round(Math.random() * 10 + 40), []);
    return <TransformGroup className={classes.balloonAnchor}>
        <Plane className={classes.balloon} style={{
            "--width": w + "px",
            "--height": 1.25 * w + "px",
            "--background": `hsl(${hue}deg 80% 60%)`,
            animationDelay: Math.random() * 4 + "s",
        }}></Plane>
    </TransformGroup>
}

function String() {
    const height = React.useMemo(() => Math.random() * 200 + 100, []);
    const rzr = React.useMemo(() => 120, []);
    const rxr = React.useMemo(() => 120, []);
    const rz = React.useMemo(() => (Math.random() * rzr - rzr / 2).toFixed(2), []);
    const rx = React.useMemo(() => (Math.random() * rxr - rxr / 2).toFixed(2), []);
    return <TransformGroup className={classes.stringAnchor} style={{
        "--stringRotZ": rz + "deg",
        "--stringRotX": rx + "deg",
        "--stringHeight": height + "px",
    }}>
        <Plane className={classes.string}>
        </Plane>
        <Balloon></Balloon>
    </TransformGroup>
}

function BalloonCluster() {
    return <TransformGroup className={classes.balloonCluster}>
        <TransformGroup className={classes.strings}>
            {Array.from({length: 200}, () => <String/>)}
        </TransformGroup>
    </TransformGroup>
}

function House() {
    return <TransformGroup className={classes.houseAnchor}>
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
                <Window className={classes.atticWindow} classNames={{
                    outer: classes.atticWindowOuter,
                    inner: classes.atticWindowInner,
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
                    <ReusableBox className={`${classes.pillar} ${classes.pillar1}`}></ReusableBox>
                    <ReusableBox className={`${classes.pillar} ${classes.pillar2}`}></ReusableBox>
                    <ReusableBox className={`${classes.pillar} ${classes.pillar3}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.sideRail} ${classes.rail1}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.sideRail} ${classes.rail2}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.sideRail} ${classes.rail3}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.sideRail} ${classes.rail7}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.frontRail} ${classes.rail4}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.frontRail} ${classes.rail5}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.frontRail} ${classes.rail6}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.frontRail} ${classes.rail8}`}></ReusableBox>
                    <ReusableBox className={`${classes.rail} ${classes.sideRail} ${classes.rail9}`}></ReusableBox>

                    {Array.from({length: 27}, (_, i) => {
                        return <ReusableBox className={`${classes.railBar} ${classes[`bar${i + 1}`]}`}></ReusableBox>
                    })}
                    {Array.from({length: 17}, (_, i) => {
                        return <ReusableBox
                            className={`${classes.railBar} ${classes.longBar} ${classes[`bar${i + 28}`]}`}></ReusableBox>
                    })}
                    <TransformGroup className={`${classes.frontStairCase}`}>
                        <ReusableBox className={`${classes.stairCase} ${classes.stairCase1}`}></ReusableBox>
                        <ReusableBox className={`${classes.stairCase} ${classes.stairCase2}`}></ReusableBox>
                        <ReusableBox className={`${classes.stairCase} ${classes.stairCase3}`}></ReusableBox>
                    </TransformGroup>
                    <TransformGroup className={`${classes.backStairCase}`}>
                        <ReusableBox className={`${classes.stairCase} ${classes.stairCase1}`}></ReusableBox>
                        <ReusableBox className={`${classes.stairCase} ${classes.stairCase2}`}></ReusableBox>
                        <ReusableBox className={`${classes.stairCase} ${classes.stairCase3}`}></ReusableBox>
                    </TransformGroup>
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
                <ReusableBox className={classes.block2Mid}></ReusableBox>
                <ReusableBox className={classes.block2Lower}></ReusableBox>
                <Window className={classes.block2Window} classNames={{
                    outer: classes.block2WindowOuter,
                    inner: classes.block2WindowInner,
                }}></Window>
                <Window className={classes.block2WindowLower} classNames={{
                    outer: classes.block2WindowOuter,
                    inner: classes.block2WindowInner,
                }}></Window>
                <Window className={classes.block2WindowRight} classNames={{
                    outer: classes.block2WindowRightOuter,
                    inner: classes.block2WindowRightInner,
                }}></Window>
                <Window className={classes.block2WindowLeft} classNames={{
                    outer: classes.block2WindowLeftOuter,
                    inner: classes.block2WindowLeftInner,
                }} middleBar={false}></Window>
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
                <Window className={classes.block3Window} classNames={{
                    outer: classes.block3WindowOuter,
                    inner: classes.block3WindowInner,
                }}></Window>
                <Window className={classes.block3RearWindow} classNames={{
                    outer: classes.block3RearWindowOuter,
                    inner: classes.block3RearWindowInner,
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
            <TransformGroup className={classes.chimney}>
                <ReusableBox className={classes.chimneyPipe}
                             classNames={{top: classes.chimneyPipeTop}}></ReusableBox>
                <ReusableBox className={classes.chimneyTopBlock}
                             classNames={{top: classes.chimneyPipeTop}}></ReusableBox>
            </TransformGroup>
            <BalloonCluster></BalloonCluster>
        </TransformGroup>
    </TransformGroup>

}

function App_SOURCE() {
    return <Canvas className={classes.canvas} cameraClassName={classes.camera} minRotX={-30} maxRotX={30}>
        <House></House>
    </Canvas>
}

export default App_SOURCE
