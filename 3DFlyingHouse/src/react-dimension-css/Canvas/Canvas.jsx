import classes from "../DimensionCSS.module.css";
import React from "react";
import Camera from "../Camera/Camera";

/**
 *
 * @param {boolean?} props.allowRotate Allows the canvas to be rotated.
 * @return {JSX.Element}
 * @constructor
 */
export default function Canvas(props) {
    const canvasRef = React.useRef(null);
    const cameraRef = React.useRef(null);

    const [canRotate, setCanRotate] = React.useState(props.allowRotate);
    const [rotationData, setRotationData] = React.useState({
        minRotX: props.minRotX ?? -60,
        maxRotX: props.maxRotX ?? 60,
        minRotY: props.minRotY ?? -180,
        maxRotY: props.maxRotY ?? 180,
    });

    function rotateCamera(e) {
        if (canRotate) {
            const canvas = canvasRef.current;
            const {top: canvasTop, left: canvasLeft} = canvas.getBoundingClientRect();
            const {clientX, clientY} = e;
            const relativeY = clientY - canvasTop;
            const relativeX = clientX - canvasLeft;

            const canvasHeight = canvas.offsetHeight;
            const canvasWidth = canvas.offsetWidth;

            let percentageX = relativeX / canvasWidth;
            if (percentageX < 0) percentageX = 0;
            if (percentageX > 1) percentageX = 1;

            let percentageY = relativeY / canvasHeight;
            if (percentageY < 0) percentageY = 0;
            if (percentageY > 1) percentageY = 1;

            const {minRotX, maxRotX, minRotY, maxRotY} = rotationData;

            const rotX = -(minRotX + (maxRotX - minRotX) * percentageY);
            const rotY = minRotY + (maxRotY - minRotY) * percentageX;

            requestAnimationFrame(() => {
                cameraRef.current.style.setProperty("--cameraRotX", rotX + "deg");
                cameraRef.current.style.setProperty("--cameraRotY", rotY + "deg");
            });
        }
    }

    React.useEffect(() => {
        if (!canRotate) {
            let callbackId;

            function rotate() {
                const lastRotation = parseInt(getComputedStyle(cameraRef.current).getPropertyValue("--cameraRotY") || 0);
                cameraRef.current.style.setProperty("--cameraRotY", lastRotation + 1 + "deg");
                callbackId = requestAnimationFrame(rotate);
            }

            callbackId = requestAnimationFrame(rotate);

            return () => {
                cancelAnimationFrame(callbackId);
            }
        }
    }, [canRotate]);

    // The camera is not re-rendered anyhow for the sake of perf, let's use Refs instead =).
    return <div className={`${classes.canvas} ${props.className || ""}`} ref={canvasRef} onMouseMove={rotateCamera}
                style={{
                    perspective: props.perspective,
                    "--offsetPerspectiveX": props.perspectiveX,
                    "--offsetPerspectiveY": props.perspectiveY,
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setCanRotate(!canRotate);
                }}>
        <Camera _ref={cameraRef}>
            {props.children}
        </Camera>
    </div>
};