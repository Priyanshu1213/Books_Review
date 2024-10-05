import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../actions/bookActions'; 

const AddBook = () => {
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addBook({ title, author, description, genre, coverImage }));
    setTitle("");
    setAuthor("");
    setDescription("");
    setGenre("");
    setCoverImage("");
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </div>
        <div>
          <label>Cover Image URL</label>
          <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
