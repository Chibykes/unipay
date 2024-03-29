import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

import { BsArrowRight } from 'react-icons/bs';
import { useRouter } from 'next/router';


// Response
// {
//   message : "Success"
//   redirecturl : "http://localhost:8080/verify?trxref=1669316941348&reference=1669316941348"
//   reference : "1669316941348"
//   response : "Approved"
//   status : "success"
//   trans : "2310511113"
//   trxref : "1669316941348"
// }




export default function Home() {
  
  const router = useRouter();

  const [payment, setPayments] = useState({});
  const [config, setConfig] = useState({
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000,
    publicKey: 'pk_test_1036b2692892ebe21cf87429183177c154984321',
  });

  const initializePayment = usePaystackPayment(config);


  const onSuccess = (data) => {
    let trx = JSON.parse(localStorage.getItem('transactions')) || [];
    let updatedTrx = JSON.stringify([...trx, { ...payment, data }]);

    localStorage.setItem('transactions', updatedTrx);
    router.push(`/success?reference=${data.reference}`);
  };
  
  
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
  
  useEffect(() => {

    let info = JSON.parse(localStorage.getItem('payment'));
    setPayments(info);
    setConfig({ ...config, email: info?.email, amount: Number(info?.amount) * 100  });
    
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="w-full h-screen max-w-md p-5 mx-auto">

        <p className='text-center font-bold py-4'>Confirm Payments</p>

        <div className='space-y-4'>
            
            <div className='relative w-10 h-10 mx-auto'>
                <Image src={`/img/${payment?.university?.logo}`} layout="fill" objectFit="cover" />
            </div>

            <p className='font-bold text-center'>{payment?.university?.name}</p>

            <div className='bg-neutral-200 divide-y divide-neutral-600 p-4 rounded-lg'>
                <div className='py-2'>
                    <p className='text-xs text-zinc-700'>Type</p>
                    <p className='font-bold'>{payment?.paymentFor}</p>
                </div>
                <div className='py-2'>
                    <p className='text-xs text-zinc-700'>Fullname</p>
                    <p className='font-bold'>{payment?.fullname}</p>
                </div>
                <div className='py-2'>
                    <p className='text-xs text-zinc-700'>Email</p>
                    <p className='font-bold'>{payment?.email}</p>
                </div>
                <div className='py-2'>
                    <p className='text-xs text-zinc-700'>Phone</p>
                    <p className='font-bold'>{payment?.phone}</p>
                </div>
            </div>

            <p className='font-bold text-3xl text-center'>&#8358;{Number(payment?.amount).toLocaleString()}</p>

            <div className=''>
                <p onClick={() => initializePayment(onSuccess, onClose)} className='text-white flex items-center justify-center gap-2 p-4 bg-black rounded-md bg-transparent w-full text-center text-sm font-bold'>
                    Continue
                    <BsArrowRight className='text-white' />
                </p>
            </div>

        </div>

      </main>

    </div>
  )
}
