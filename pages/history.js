import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GiBookPile } from 'react-icons/gi';

export default function Home() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        let info = JSON.parse(localStorage.getItem('transactions'))?.reverse() || [];
        setTransactions(info);
        
      }, []);

  return (
    <div>
      <Head>
        <title>History</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="w-full h-screen max-w-md mx-auto">

        <p className='text-center font-bold py-4'>History</p>

        <div className='py-4 space-y-4'>

            {transactions.map(({paymentFor, university:{name}, data: {reference}}) => (
                <Link href={`/transaction?reference=${reference}`} key={reference} className='p-3 flex gap-4 items-center bg-neutral-900 rounded-md'>
                    <div className='bg-neutral-700 rounded-full w-8 h-8 flex justify-center items-center'>
                        <GiBookPile className="text-neutral-300" />
                    </div>

                    <div className=''>
                        <p className='font-bold'>{paymentFor}</p>
                        <p className='text-sm text-neutral-700'>{name}</p>
                        <p className='text-xs text-neutral-700'>
                            <span className='font-bold'>Ref: </span>{reference}
                            {/* <span className='font-bold ml-5'>Time: </span>15/11/2022 14:08:33 */}
                        </p>
                    </div>
                </Link>
            ))}


        </div>

      </main>

    </div>
  )
}
