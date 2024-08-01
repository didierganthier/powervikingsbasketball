"use client";
// components/AdminLayout.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';

const AdminLayout = ({ children }: any) => {
  const router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/admin/login');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <button onClick={handleSignOut} className="bg-red-500 px-4 py-2 rounded">Sign Out</button>
      </header>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li><Link href="/admin/dashboard">Home</Link></li>
          <li><Link href="/admin/players">Players</Link></li>
          <li><Link href="/admin/coaches">Coaches</Link></li>
          <li><Link href="/admin/games">Games</Link></li>
        </ul>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
