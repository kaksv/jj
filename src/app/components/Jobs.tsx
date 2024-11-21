import type { Job } from "@/models/Job";
import JobRaw from "./JobRaw";

export default function Jobs({header, jobs}:{header:string, jobs:Job[]}) {
  return (
    <>
      <div className="bg-gray-200 p-8 rounded-t-3xl">
        <h2 className="font-bold mb-4">{header || 'Recent Gigs'}</h2>

        <div className="flex flex-col gap-4">
          {!jobs?.length && (
            <div>No Gigs found.</div>
          )}
          {jobs && jobs.map(job => (
            // eslint-disable-next-line react/jsx-key
            <JobRaw jobDoc={job} />
          ))}
          
          
        </div>
      </div>
    </>
  )
}
