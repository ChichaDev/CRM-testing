import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import { ListGroup, ListGroupItem } from "react-bootstrap";

type User = {
  displayName: string;
  email: string;
  uid: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const firestore = getFirestore();

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as User[];
      setUsers(usersData);
    };
    getUsers();
  }, []);

  return (
    <ListGroup>
      {users.map((user) => (
        <ListGroupItem key={user.uid}>
          <div>{user.displayName}</div>
          <div>{user.email}</div>
          <div>{user.uid}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default UserList;
