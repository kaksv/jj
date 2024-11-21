'use client'
import {
  faEnvelope,
  faPerson,
  faPhone,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from '@radix-ui/themes'
import { useState } from 'react'
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css'
import ImageUpload from './ImageUpload'
import { redirect } from 'next/navigation'
import { saveJobAction } from '../actions/JobActions'
import type { Job } from '@/models/Job'
import 'react-country-state-city/dist/react-country-state-city.css'
import { stat } from 'fs'

export default function JobForm({orgId, jobDoc} : {orgId:string, jobDoc?:Job}) {
  const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || 0);
  const [stateName, setStateName] = useState(jobDoc?.state || 0);
  const [cityName, setCityName] = useState(jobDoc?.state || '');

  async function handleSaveJob(data:FormData) {
  
    data.set('country', countryName.toString());
    data.set('state', stateName.toString());      
    data.set('city', cityName.toString());
    data.set('countryId', countryId.toString());
    data.set('stateId', stateId.toString());      
    data.set('cityId', cityId.toString());
    data.set('orgId', orgId)
    const jobDoc = await saveJobAction(data);

    redirect(`/jobs/${jobDoc.orgId}`);

  }
 

  return (
    <Theme>
      <form action={handleSaveJob} className="container mt-6 flex flex-col gap-4">
        {jobDoc && (
          <input type='hidden' name='id' value={jobDoc?._id} />
        )}
        
        <TextField.Root name='title' placeholder="Job Title" defaultValue={jobDoc?.title || ''} />

        <div className="grid sm:grid-cols-3 grid-cols-3 gap-6 ">
          <div>
            Remote?
            <RadioGroup.Root defaultValue={jobDoc?.remote || 'hybrid'} name="remote">
              <RadioGroup.Item value="onsight">On-Site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid Remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully Remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full Time?
            <RadioGroup.Root defaultValue={jobDoc?.type || 'full'} name="type">
              <RadioGroup.Item value="project">
                Project/Contract
              </RadioGroup.Item>
              <RadioGroup.Item value="part">Part-Time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full-Time</RadioGroup.Item>
              <RadioGroup.Item value="onetime">One Time Gig</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary (per year)
            <TextField.Root name='salary' defaultValue={jobDoc?.salary || ''}>
              <TextField.Slot>$</TextField.Slot>
              {/* <TextField.Slot>k/year</TextField.Slot> */}
            </TextField.Root>
          </div>
        </div>

        <div className="container flex flex-cols sm:flex-rows gap-4 items-center *:grow">
          Location
          <CountrySelect
            defaultValue={countryId ? {id:countryId, name: countryName} : 0}
            onChange={(e:any) => {
              // console.log(e);
              setCountryId(e.id)
              setCountryName(e.name);
              
            }}
            placeHolder="Select Country"
          />
          <h6>State</h6>
          <StateSelect
            defaultValue={stateId ? {id:stateId, name: stateName} : 0}
            countryid={countryId}
            onChange={(e:any) => {
              // console.log(e)
              setStateId(e.id)
              setStateName(e.name)
            }}
            placeHolder="Select State"
          />
          <h6>City</h6>
          <CitySelect
          defaultValue={cityId ? {id:cityId, name: cityName} : 0}
            countryid={countryId}
            stateid={stateId}
            onChange={(e:any) => {
              // console.log(e)
              setCityId(e.id);
              setCityName(e.name);
            }}
            placeHolder="Select City"
          />
        </div>
        <div className="sm:flex ">
          <div className="w-1/3">
            <h3>Job Icon</h3>
            <ImageUpload name='jobIcon' icon={faStar} defaultValue={jobDoc?.jobicon || ''} />
          </div>
          <div className="grow">
            <h3>Contact Person</h3>
            <div className="flex gap-2 grow ">
              <div>
                <ImageUpload name='contactPhoto' icon={faUser} defaultValue={jobDoc?.contactPhoto || ''} />
              </div>
              <div className="grow flex flex-col gap-2">
                <TextField.Root placeholder="Your Name" name='contactName' defaultValue={jobDoc?.contactName || ''}>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="Phone" type="tel" name='contactPhone' defaultValue={jobDoc?.contactPhone || '' }>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>

                <TextField.Root placeholder="Email" type="email" name='contactEmail' defaultValue={jobDoc?.contactEmail || ''}>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea
        defaultValue={jobDoc?.description || ''}
          className="container"
          placeholder="Job Description"
          resize="vertical"
          name='description'
        />
        <div className="flex justify-center">
          <Button size="3">
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  )
}
