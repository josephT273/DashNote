import { useEffect, useState } from 'react';
import AddButton from '../components/AddButton';
import NoteCard from '../components/NoteCard';
import './Dashboard.css';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, getFirestore, } from 'firebase/firestore';

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
    }
    const fetchNotes = async () => {
          const userDocRef = doc(database, "notes/"+userId+"/note");
          const noteRef = collection(userDocRef, "note");
          const querySnapshot = await getDocs(noteRef);
  
          const notesArray = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                note: data.note || "", 
            };
        });
  
          setResult(notesArray);
          console.log(notesArray)
      };

    useEffect(() => {
        fetchNotes()
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
                    </div>
                    <div className='noteGrid'>
                        <NoteCard content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                        <NoteCard content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                        <NoteCard content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                        <NoteCard content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                        <NoteCard content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                    </div>
                </>
            )
            }
        </div>
    );
}

export default Dashboard;