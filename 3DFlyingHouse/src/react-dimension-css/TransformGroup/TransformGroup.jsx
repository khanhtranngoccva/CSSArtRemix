export default function TransformGroup(props) {
    return <div className={props.className} style={props.style}>
        {props.children}
    </div>
}