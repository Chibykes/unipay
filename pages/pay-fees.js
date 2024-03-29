import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiCaretDown } from 'react-icons/bi';

export default function Home() {

    const router = useRouter();

    const universities = [
        { 
            name: 'Micheal Okpara University',
            logo: 'mouau.png',
            options: [
                { type: 'School Fees', amount: '' },
                { type: 'Waec Verification', amount: '2500' }
            ]
        }
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        university: null,
        paymentFor: '', 
        amount: '',
        fullname: '',
        email: '',
        phone: '',
    })

    const handleFee = (e) => {
        let paymentFor = form.university.options.find(f => f.type === e.target.value);
        setForm({...form, paymentFor: paymentFor.type, amount: paymentFor.amount})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('payment', JSON.stringify(form))
        router.push('/confirmation');
    }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="w-full h-screen max-w-md p-5 mx-auto">

        <p className='text-center font-bold py-4'>Pay Fees</p>

        <form onSubmit={handleSubmit} className='space-y-4'>

            <div className='border-2 border-neutral-400 p-3 flex items-center gap-4 rounded-md' onClick={() => setModalOpen(true)}>
                <div className='relative w-7 h-7 rounded-full overflow-hidden'>
                    {!form?.university?.logo ? <div className='w-7 h-7 bg-green-800'></div> :
                    <Image src={`/img/${form?.university?.logo}`} layout="fill" objectFit="cover" />}
                </div>
                <p className='uppercase text-xs text-ellipsis'>{form?.university?.name || 'Choose university'}</p>
                <div className='ml-auto'>
                    <BiCaretDown className='text-white text-sm' />
                </div>
            </div>

            <div className=''>
                <select required className='border-2 border-neutral-400 p-3 flex items-center gap-4 rounded-md w-full   ' onChange={handleFee}>
                    <option value=''>Payment for?</option>
                    {form?.university?.options?.map(({type}, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className=''>
                <input required type="number" className='border-2 border-neutral-400 p-3 flex items-center gap-4 rounded-md w-full' placeholder='Amount' value={form.amount} onChange={(e) => setForm({...form, amount:e.target.value})} />
            </div>

            <div className=''>
                <input required className='border-2 border-neutral-400 p-3 flex items-center gap-4 rounded-md w-full' placeholder='Fullname' value={form.fullname} onChange={(e) => setForm({...form, fullname:e.target.value})} />
            </div>

            <div className=''>
                <input required type="email" className='border-2 border-neutral-400 p-3 flex items-center gap-4 rounded-md w-full' placeholder='Email' value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} />
            </div>

            <div className=''>
                <input required type="number" className='border-2 border-neutral-400 p-3 flex items-center gap-4 rounded-md w-full' placeholder='Phone' value={form.phone} onChange={(e) => setForm({...form, phone:e.target.value})} />
            </div>

            <div className=''>
                <button type="submit" className='border-2 border-black p-4 bg-black block rounded-md w-full text-white text-center text-sm font-bold'>
                    Submit
                </button>
            </div>

        </form>

        <div className={`${modalOpen ? 'block' : 'hidden'} fixed inset-0 w-full h-full p-4 bg-white`}>
            <div className=''>
                <input className='p-3 flex items-center gap-4 bg-neutral-200 rounded-md w-full' placeholder='Phone' />
            </div>

            <div className='py-2'>
                {universities?.map((uni, index) => (
                    <div key={index} onClick={() => {setForm({...form, university: uni}); setModalOpen(false);}} className='px-2 py-3 flex items-center gap-4 border-b border-neutral-900'>
                        <div className='relative w-7 h-7 rounded-full overflow-hidden'>
                            <Image src={`/img/${uni?.logo}`} layout="fill" objectFit="cover" />
                        </div>
                        <p className='uppercase text-xs text-ellipsis'>{uni?.name}</p>
                    </div>
                ))}
            </div>

        </div>


      </main>

    </div>
  )
}
