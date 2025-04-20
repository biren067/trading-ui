
import Link from 'next/link'
import Header from '@/components/Header';
export default function Home() {
  return (
    <div className="mx-20 mt-10">
       <Header />
    <ul className="border border-gray-400 p-4 rounded">
      <li className="text-blue-600 font-bold hover:underline mb-3">
        <Link href="/support-resistance" className="border-b-3 border-pink-300 pb-1 hover:italic">
          Support Resistance Page
        </Link>
      </li>
      <li className="text-blue-600 font-bold hover:underline mb-3">
        <Link href="/" className="border-b-3 border-pink-300 pb-1 hover:italic">
          Pending
        </Link>

      </li>
    </ul>
  </div>
  
  );
}
