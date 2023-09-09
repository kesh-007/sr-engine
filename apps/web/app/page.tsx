import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-800 h-screen flex flex-col justify-center items-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-semibold mb-4">Automated Results, Customized for You</h1>
        <p className="text-lg mb-8">Streamline your workflow with our result automation platform.</p>
        <Link
          href="/login"
          className="bg-white text-black hover:font-bold text-lg font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform "
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}





// import { Button } from "@ui/components/button";

// export default function Page() {
//   return (
//     <>
//       <h1>Web</h1>
//       <Button>Click me</Button>
//     </>
//   );
// }
