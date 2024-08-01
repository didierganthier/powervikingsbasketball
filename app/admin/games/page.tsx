"use client";
// pages/admin/games.js
import { useState, useEffect } from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import AdminLayout from '@/components/AdminLayout';

const Games = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ teamA: '', teamB: '', date: '' });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const querySnapshot = await getDocs(collection(db, "games"));
    const gameList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setGames(gameList as any);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { teamA, teamB, date } = newGame;

    await addDoc(collection(db, 'games'), { teamA, teamB, date });
    setNewGame({ teamA: '', teamB: '', date: '' });
    fetchGames();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Games</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="teamA"
          value={newGame.teamA}
          onChange={handleInputChange}
          placeholder="Team A"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="teamB"
          value={newGame.teamB}
          onChange={handleInputChange}
          placeholder="Team B"
          className="border p-2 mb-2 w-full"
        />
        <input
          title='date'
          type="date"
          name="date"
          value={newGame.date}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Game</button>
      </form>
      <div>
        <h3 className="text-xl font-bold mb-4">Existing Games</h3>
        <div className="grid grid-cols-2 gap-4">
          {games.map((game: any) => (
            <div key={game.id} className="border p-4 rounded-lg">
              <h4 className="font-bold">{game.teamA} vs {game.teamB}</h4>
              <p>{new Date(game.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Games;
