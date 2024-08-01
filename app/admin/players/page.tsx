"use client";
// pages/admin/players.js
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';
import AdminLayout from '@/components/AdminLayout';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', image: null });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const querySnapshot = await getDocs(collection(db, "players"));
    const playerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlayers(playerList as any);
  };

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewPlayer({ ...newPlayer, [name]: files[0] });
    } else {
      setNewPlayer({ ...newPlayer, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, position, image } = newPlayer;
    let imageUrl = '';

    if (image) {
      const storageRef = ref(storage, `players/${(image as any).name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, 'players'), { name, position, imageUrl });
    setNewPlayer({ name: '', position: '', image: null });
    fetchPlayers();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Players</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          value={newPlayer.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="position"
          value={newPlayer.position}
          onChange={handleInputChange}
          placeholder="Position"
          className="border p-2 mb-2 w-full"
        />
        <input
          title='Image'
          type="file"
          name="image"
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Player</button>
      </form>
      <div>
        <h3 className="text-xl font-bold mb-4">Existing Players</h3>
        <div className="grid grid-cols-2 gap-4">
          {players.map((player: any) => (
            <div key={player.id} className="border p-4 rounded-lg">
              <h4 className="font-bold">{player.name}</h4>
              <p>{player.position}</p>
              {player.imageUrl && <img src={player.imageUrl} alt={player.name} className="w-32 h-32 object-cover rounded-full mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Players;
