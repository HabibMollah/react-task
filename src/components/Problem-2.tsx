import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const baseURL = 'https://contact.mediusware.com/api';

const Problem2 = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: () =>
      axios
        .get(`${baseURL}/contacts/`)
        .then((res) => res.data)
        .catch((err) => console.error(err)),
  });

  if (isLoading) return <Spinner />;

  if (data) console.log(data);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button">
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button">
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Problem2;
