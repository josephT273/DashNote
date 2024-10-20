import './AddButton.css';

type AddButtonType = {
    onClick: () => void;
}
const AddButton = ({onClick}: AddButtonType) => {
    return (
        <button className="addButton" onClick={onClick}>
            +
        </button>
    )
}

export default AddButton;