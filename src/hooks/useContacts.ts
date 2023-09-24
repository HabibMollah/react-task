import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const baseURL = 'https://contact.mediusware.com/api';

export default function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () =>
      axios
        .get(`${baseURL}/contacts/`)
        .then((res) => res.data)
        .catch((err) => console.error(err)),
  });
}
