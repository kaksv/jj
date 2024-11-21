'use client';

import { JobModel, type Job } from '@/models/Job'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeAgo from './TimeAgo'
import Link from 'next/link'
import axios from 'axios';


 
export default  function JobRaw({jobDoc}:{jobDoc :Job}) {
 
  
  return (
    <>
      <div className="bg-white p-6 rounded-t-lg shadow-sm md:flex relative">
        <div className="absolute cursor-pointer top-4 right-4 text-gray-400">
          {/* <FontAwesomeIcon className="size-5" icon={faHeart} /> */}
        </div>
        <div className="flex grow  gap-4">
          <div className="content-center">
            <img className="size-12" src="/dcd1.png" alt="" />
          </div>
          <div className="grow sm:flex">
            <div className="grow">
              <div>
                 <Link href={`/jobs/${jobDoc.orgId}`} className="hover:underline block text-gray-500 text-sm">{jobDoc.orgName || '?'}</Link>
              </div>
              <div className="font-bold mb-1 text-lg">
                <Link className='hover:underline' href={'/show/'+jobDoc._id}>{jobDoc.title}</Link>
                
                </div>
              <div className="text-gray-500 text-xs capitalize">
                {jobDoc.remote} 
                {' '}&middot;{' '}
                {jobDoc.city}, {jobDoc.country} {' '} 
                 | {jobDoc.type}{' '}
                 {jobDoc.isAdmin && (
                  <>
                   {' '}&middot;{' '}
                    <Link href={'/jobs/edit/'+jobDoc._id}>Edit</Link>
                   {' '}&middot;{' '}
                    <button type='button' onClick={async () => {
                      await axios.delete('/api/jobs?id='+jobDoc._id);
                      window.location.reload();
                    }}>
                      Delete
                      </button>
                  </>
                 )}
              </div>
            </div>
            {jobDoc.createdAt && (
               <div className=" content-end text-gray-600 text-sm">
                      <TimeAgo createdAt={jobDoc.createdAt} />
               </div>
            )}
           
          </div>
        </div>
      </div>
    </>
  )
}
