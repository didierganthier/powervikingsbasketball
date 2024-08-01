"use client";
// pages/admin/coaches.js
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';
import AdminLayout from '@/components/AdminLayout';

const Coaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [newCoach, setNewCoach] = useState({ name: '', role: '', image: null });

    useEffect(() => {
        fetchCoaches();
    }, []);

    const fetchCoaches = async () => {
        const querySnapshot = await getDocs(collection(db, "coaches"));
        const coachList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCoaches(coachList as any);
    };

    const handleInputChange = (e: any) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewCoach({ ...newCoach, [name]: files[0] });
        } else {
            setNewCoach({ ...newCoach, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, role, image } = newCoach;
        let imageUrl = '';

        if (image) {
            const storageRef = ref(storage, `coaches/${(image as any).name}`);
            await uploadBytes(storageRef, image);
            imageUrl = await getDownloadURL(storageRef);
        }

        await addDoc(collection(db, 'coaches'), { name, role, imageUrl });
        setNewCoach({ name: '', role: '', image: null });
        fetchCoaches();
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-4">Manage Coaches</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    name="name"
                    value={newCoach.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="role"
                    value={newCoach.role}
                    onChange={handleInputChange}
                    placeholder="Role"
                    className="border p-2 mb-2 w-full"
                />
                <input
                    title='Image'
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Coach</button>
            </form>
            <div>
                <h3 className="text-xl font-bold mb-4">Existing Coaches</h3>
                <div className="grid grid-cols-2 gap-4">
                    {coaches.map((coach: any) => (
                        <div key={coach.id} className="border p-4 rounded-lg">
                            <h4 className="font-bold">{coach.name}</h4>
                            <p>{coach.role}</p>
                            {coach.imageUrl && <img src={coach.imageUrl} alt={coach.name} className="w-32 h-32 object-cover rounded-full mt-2" />}
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Coaches;
