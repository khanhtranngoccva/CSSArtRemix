import classes from "../DimensionCSS.module.css";

export default function Camera(props) {
    return <div className={classes.camera} ref={props._ref}>
        {props.children}
    </div>;
}