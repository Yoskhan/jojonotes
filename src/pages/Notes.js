import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import NoteCard from '../Components/NoteCard';
import Masonry from 'react-masonry-css';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(
      'https://react-custom-hooks-5f368-default-rtdb.europe-west1.firebasedatabase.app/mynotes.json'
    )
      .then((res) => res.json())
      .then((data) => {
        let refacturedNotes = [];

        for (let key in data) {
          data[key].id = key;
          refacturedNotes.push(data[key]);
        }

        setNotes(refacturedNotes);
      });
  }, []);

  const deleteHandler = async (id) => {
    await fetch(
      'https://react-custom-hooks-5f368-default-rtdb.europe-west1.firebasedatabase.app/mynotes/' +
        id +
        '/.json',
      {
        method: 'DELETE',
      }
    );

    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id.toString()} xs={12} sm={6} md={3} lg={4}>
            <NoteCard note={note} deleteHandler={deleteHandler}></NoteCard>
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
