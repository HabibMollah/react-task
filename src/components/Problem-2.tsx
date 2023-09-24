import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useContacts, { baseURL } from '../hooks/useContacts';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const Problem2 = () => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [allContacts, setAllContacts] = useState<any>([]);

  // const { data, isLoading } = useContacts();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
  } = useInfiniteQuery(
    ['contacts'],
    async () => {
      const res = await axios.get(`${baseURL}/contacts/`, {
        params: {
          page: page,
        },
      });

      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  useEffect(() => {
    if (data) {
      setAllContacts((prevContacts) => [...prevContacts, ...data.pages]);
    }
  }, [data]);

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleCloseA = () => setShowA(false);
  const handleShowA = () => setShowA(true);

  const handleCloseB = () => setShowB(false);
  const handleShowB = () => setShowB(true);

  const handleSwitchToA = () => {
    setShowB(false);
    setShowA(true);
  };
  const handleSwitchToB = () => {
    setShowA(false);
    setShowB(true);
  };

  if (isLoading) return <Spinner />;

  if (allContacts) console.log(allContacts);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleShowA}>
            All Contacts
          </button>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showA}
            onHide={handleCloseA}>
            <Modal.Header closeButton>
              <Modal.Title>Modal A</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* {data.pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page.results.map(
                      (contact) => {
                        console.log(contact);
                        return <p>{contact.phone}</p>;
                      }
                      // (
                      // <p
                      //   style={{
                      //     border: '1px solid gray',
                      //     borderRadius: '5px',
                      //     padding: '10rem 1rem',
                      //     background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                      //   }}
                      //   key={project.id}>
                      //   {project.name}
                      // </p>
                      // )
                    )}
                  </React.Fragment>
                ))} */}
              <div>
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}>
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer className="my-custom-footer">
              <div className="gap-1 d-flex">
                <input className="" type="checkbox" id="even-only" />
                <label className="" htmlFor="even-only">
                  Only even
                </label>
              </div>

              <div className="gap-2 d-flex">
                <Button variant="primary" onClick={handleShowA}>
                  All Contacts
                </Button>
                <Button variant="secondary" onClick={handleSwitchToB}>
                  US Contacts
                </Button>
                <Button variant="danger" onClick={handleCloseA}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleShowB}>
            US Contacts
          </button>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showB}
            onHide={handleCloseB}>
            <Modal.Header closeButton>
              <Modal.Title>Modal B</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Modal B{' '}
              <div>
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}>
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer className="my-custom-footer">
              <div className="gap-1 d-flex">
                <input className="" type="checkbox" id="even-only" />
                <label className="" htmlFor="even-only">
                  Only even
                </label>
              </div>

              <div className="gap-2 d-flex">
                <Button variant="primary" onClick={handleSwitchToA}>
                  All Contacts
                </Button>
                <Button variant="secondary" onClick={handleShowB}>
                  US Contacts
                </Button>
                <Button variant="danger" onClick={handleCloseB}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
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
