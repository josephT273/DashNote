import './NoteCard.css'
type NoteType = {
    content: String;
}

const NoteCard = ({content} : NoteType) => {
    return (
        <div className="noteCard">
            <span className="text">
                {content}
            </span>
        </div>
    )
}

export default NoteCard;