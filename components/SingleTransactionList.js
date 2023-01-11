// import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import Link from 'next/link';
import { GiBookPile } from 'react-icons/gi'

export default function SingleTransactionList({ reference, name, paymentFor }){
    return (
        <>
            {/* <div className="flex items-center bg-white p-4 gap-4 rounded-lg">
                {type === 'credit' ? <BiDownArrowAlt className="text-lg text-green-500" /> :
                <BiUpArrowAlt className="text-lg text-red-500" />}
                <div className='grow space-y-1'>
                    <p className='text-xs text-app-gray'>{type === "credit" ? "Money Recieved" : "Money Sent"}</p>
                    <p className='text-xs text-app-gray'>{details}</p>
                </div>
                <p className={`${type === "credit" ? "text-green-500" : "text-red-500"} text-xs font-bold`}>&#8358; {amount}</p>
            </div> */}

            <Link href={`/transaction?reference=${reference}`} className='p-3 flex gap-4 items-center bg-neutral-100 rounded-md'>
                <div className='rounded-full w-8 h-8 flex justify-center items-center'>
                    <GiBookPile className="text-black" />
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
        </>
    );
}