import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Contact {
    id:string;
    name:string;
    email:string;
}
const useAllUserFetch = () => {
  const [users, setUser] = useState<Contact[]>([]);
  const [userLoader, setUserLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users');
        setUser(response.data.users);
        setUserLoader(false);
        
      } catch (error) {
        setUserLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { users, userLoader };
};


const useFetchUser = (id: string) => {
  const [loader,setLoader] = useState(true);
  const [data,setData] = useState<Contact>();
  useEffect(() => {
      axios.post(`/api/users/read`, {
          id: id
      })
          .then(response => {
              setData(response.data.user);
              setLoader(false);
          })
          .catch(error => {
              console.error('Error fetching user:', error);
              setLoader(false);
          });
  }, [id]);
  return {data,loader};
};


const useFetchMainBalance = () => {
  const [loader,setLoader] = useState(true);
  const [data,setData] = useState();
  useEffect(() => {
      axios.get(`/api/users/main-balance`, )
          .then(response => {
              setData(response.data.balance);
              setLoader(false);
          })
          .catch(error => {
              console.error('Error fetching balance:', error);
              setLoader(false);
          });
  }, []);
  return {data,loader};
};


  
const useUserDelete = async (id: string): Promise<void> => {
    try {
      const response = await axios.post(`/api/users/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      toast.error(error?.data?.error || 'An error occurred while deleting the user.');
    }
  };

  
  const formatDate = (dateString:any) => {
    if (!dateString) return "No date provided";
  
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust toLocaleString options for specific formatting
  };

  export { useUserDelete, useAllUserFetch, useFetchUser,useFetchMainBalance,formatDate};