import { uiActions } from './ui-slice';
import { notesActions } from './notes-slice';

export const fetchNotesData = () => {
  return async (dispatch) => {
      console.log('fetching');

    const fetchData = async () => {
      const response=await fetch('https://react-http-f1485-default-rtdb.firebaseio.com/notes.json');
        // console.log(response);
      
        if (!response.ok) {
        throw new Error('Could not fetch data!');
      }
    //  console.log(response,"sdsdsd")
      const data = await response.json();
      // console.log(data);
      return data;
    };

    try {
      const notesData = await fetchData();
      // console.log(notesData);
      const arr=[];
      // for()
      const loadedNotes=[];
      for(const key in notesData){
        loadedNotes.push({
          id:key,
          title:notesData[key].title,
          tagline:notesData[key].tagline,
          content:notesData[key].content,
          pinned:notesData[key].pinned
        })
      }
      dispatch(
        notesActions.replaceNotesList({
          items: loadedNotes || [],
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
      console.log(notes);
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