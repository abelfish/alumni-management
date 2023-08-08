import { Fragment, useState, useEffect } from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';



export default function JobDescriptionEdit() {
  const navigate = useNavigate();
  const [jobAd, setJobAd] = useState({
    id: 0,
    jobTitle: '',
    description: '',
    salary: 0,
    companyName: '',
    address: '',
    lastApplyDate: '',
    closingDate: '',
    tags: [],
  });
  const { id } = useParams();
  const getJob = async () => {
    const response = await fetch(`http://localhost:8080/jobAdverts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJobAd(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
  };
  useEffect(() => {
    getJob();
  }, []);

  const onEditClicked = () => {
    navigate(`/jobAdverts/edit/${id}`);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg  md:px-20">
      <div className="lg:flex lg:items-center lg:justify-between p-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {jobAd.jobTitle}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {jobAd.companyName}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {jobAd.address}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {jobAd.salary}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Closing Date: {jobAd.closingDate}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Last Applied: {jobAd.lastApplyDate}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              onClick={onEditClicked}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Edit
            </button>
          </span>
        </div>
      </div>
      <div className=" px-8 md:px-16 py-10">
        <h2 className=" text-lg md:mb-6 md:px-4">Description</h2>
        <div className="mt-5 text-gray-500 flex lg:mt-0 lg:ml-4">
          {jobAd.description}
        </div>
      </div>
    </div>
  );
}
