// app/success/page.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Clear local storage
    localStorage.removeItem('cart');

    // 2. Optional: If you use Context API to manage state,
    // call a function like clearCart() here.
    // context.clearCart();

    // 3. Optional: Redirect to home after a few seconds
    setTimeout(() => router.push('/'), 5000);
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold">Thank you for your order!</h1>
      <p>Your cart has been cleared.</p>
    </div>
  );
}
