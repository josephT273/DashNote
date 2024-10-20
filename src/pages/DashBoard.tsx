import { useEffect, useState } from 'react';
import AddButton from '../components/AddButton';
import NoteCard from '../components/NoteCard';
import './Dashboard.css';
import { getAuth, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, } from 'firebase/firestore';

interface Notes {
    id: string,
    note: string;
}
const Dashboard = () =>{


    const [newNote, setNewNote] = useState(false);
    const [note, setNote] = useState("");
    const [result, setResult] = useState<Notes[]>([]);
    const database = getFirestore();
    const auth  = getAuth();

    const userId = auth.currentUser?.uid;

    const handleSave = async() => {
        const noteRef = collection(database, "notes/"+userId+"/note");
        await addDoc(noteRef, {note: note})
        setNewNote(!newNote);
        setNote("");
        fetchNotes();
    }
    const fetchNotes = async () => {
        if (!userId) return false;
        const userDocRef = collection(database, "notes", userId, "note");
        const querySnapshot = await getDocs(userDocRef);

        const notesArray = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                note: data.note || "", 
            };
        });
        setResult(notesArray);
    };

    const handleSignOut =async () => {
        signOut(auth);
        window.location.reload;
    }

    useEffect(() => {
        fetchNotes();
    }, []);
    return (
        <div className='dashboard'>
            <AddButton onClick={() => setNewNote(!newNote)}/>
            {newNote ?
            (
            <div className='addNote'>
                <h1>Create Note</h1>
                <textarea cols={70} maxLength={240} rows={5} onChange={(e) => setNote(e.target.value)}>{note}</textarea>
                <button className='saveNote' onClick={handleSave}>Save Note</button>
            </div>
            ) :
            (
                <>
                    <div className='title'>
                        <h1>DashNote</h1>
                        <button className='logoutButton' onClick={handleSignOut}>Logout</button>
                    </div>
                    <div className='noteGrid'>

                        {result.map((data) => (
                        <NoteCard key={data.id} content={data.note} />
                        ))}
                    </div>
                </>
            )
            }
        </div>
    );
}

export default Dashboard;