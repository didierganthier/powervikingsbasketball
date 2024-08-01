"use client";
// pages/admin/dashboard.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db, storage } from '../../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AdminLayout from '@/components/AdminLayout';

const Dashboard = () => {
  const [content, setContent] = useState([]);
  const [newContent, setNewContent] = useState({ title: '', description: '', image: null });
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      }
    });
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const querySnapshot = await getDocs(collection(db, "content"));
    const contentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContent(contentList as any);
  };

  return (
    <AdminLayout />
  );
};

export default Dashboard;
