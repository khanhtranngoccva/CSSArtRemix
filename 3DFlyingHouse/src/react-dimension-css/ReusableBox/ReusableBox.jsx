import classes from "../DimensionCSS.module.css";

/**
 *
 * @param {string?} props.width
 * @param {string?} props.height
 * @param {string?} props.length
 * @param {string?} props.topBackground
 * @param {string?} props.leftBackground
 * @param {string?} props.rightBackground
 * @param {string?} props.bottomBackground
 * @param {string?} props.backBackground
 * @param {string?} props.frontBackground
 * @param {string?} props.style
 * @param {string?} props.className
 * @param {{back: string, front: string, left: string, right: string, bottom: string, top: string}?} props.classNames
 * @return {JSX.Element}
 * @constructor
 */
export default function ReusableBox(props) {
    return <div className={`${classes.box} ${props.className || ""}`} style={{
        ...props.style,
        "--width": props.width,
        "--height": props.height,
        "--length": props.length,
        "--topBackground": props.topBackground,
        "--leftBackground": props.leftBackground,
        "--rightBackground": props.rightBackground,
        "--bottomBackground": props.bottomBackground,
        "--frontBackground": props.frontBackground,
        "--backBackground": props.backBackground,
    }}>
        <div className={`${classes.boxFace} ${classes.boxBack} ${props.classNames?.back || ""}`}></div>
        <div className={`${classes.boxFace} ${classes.boxFront} ${props.classNames?.front || ""}`}></div>
        <div className={`${classes.boxFace} ${classes.boxLeft} ${props.classNames?.left || ""}`}></div>
        <div className={`${classes.boxFace} ${classes.boxRight} ${props.classNames?.right || ""}`}></div>
        <div className={`${classes.boxFace} ${classes.boxBottom} ${props.classNames?.bottom || ""}`}></div>
        <div className={`${classes.boxFace} ${classes.boxTop} ${props.classNames?.top || ""}`}></div>
    </div>
}