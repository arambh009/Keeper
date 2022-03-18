import { uiActions } from './ui-slice';
import { notesActions } from './notes-slice';

export const fetchNotesData = () => {
  return async (dispatch) => {
    

    const fetchData = async () => {
      const response=await fetch('https://react-http-f1485-default-rtdb.firebaseio.com/notes.json');
       
        if (!response.ok) {
        throw new Error('Could not fetch data!');
      }
   
      const data = await response.json();
   
      return data;
    };

    try {
      const notesData = await fetchData();
     
      const loadedNotes=[];
      
      for(const key in notesData){
      if(!key)continue;
        loadedNotes.push({
          id:key,
          title:notesData[key].title,
          tagline:notesData[key].tagline,
          content:notesData[key].content,
          pinned:notesData[key].pinned
        })
      }
      const pinnedNotes=loadedNotes.filter((item) => item.pinned ===true);
      const unpinnedNotes=loadedNotes.filter((item) => item.pinned === false);
      
      const finalNotes=[...pinnedNotes,...unpinnedNotes];
     
      dispatch(
        notesActions.replaceNotesList({
          items: finalNotes || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching data failed!',
        })
      );
    }
  };
};

export const sendNotesData = (notes) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending data!',
      })
    );
   
    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-f1485-default-rtdb.firebaseio.com/.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            notes: notes.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent  data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending  data failed!',
        })
      );
    }
  };
};