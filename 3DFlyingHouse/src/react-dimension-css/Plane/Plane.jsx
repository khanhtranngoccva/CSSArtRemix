import classes from "../DimensionCSS.module.css";

/**
 * @param {Record<string, string>} props.style
 * @param {string?} props.width
 * @param {string?} props.height
 * @param {string?} props.length
 * @param {string?} props.background
 * @return {JSX.Element}
 * @constructor
 */
export default function Plane(props) {
    return <div className={`${classes.plane} ${props.className || ""}`} style={{
        ...props.style,
        "--width": props.width,
        "--height": props.height,
        "--length": props.length,
        "--background": props.background,
    }}>
    </div>
}