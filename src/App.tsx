import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World!</h1>} />
    </Routes>
  );
}
