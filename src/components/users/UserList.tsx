import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { ListGroup, ListGroupItem, Button, Form, Modal } from "react-bootstrap";
import { db } from "../../../firebase";

type User = {
  displayName: string;
  email: string;
  uid: string;
  role?: string | null;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as User[];
      setUsers(usersData);
    };
    getUsers();
  }, []);

  const handleAddRole = async (
    userId: string,
    role: string,
    displayName: string
  ) => {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { role: role });
    const updatedUsers = users.map((user) => {
      if (user.uid === userId) {
        return { ...user, role: role };
      }
      return user;
    });

    if (role === "driver") {
      const driverRef = collection(db, "drivers");

      addDoc(driverRef, {
        driver: displayName,
      });
      console.log(displayName + "added to Drivers db");
    }
    setUsers(updatedUsers);

    setSelectedRole("");

    setShowModal(false);
  };

  const handleRemoveRole = async (userId: string) => {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { role: null });
    const updatedUsers = users.map((user) => {
      if (user.uid === userId) {
        return { ...user, role: undefined };
      }
      return user;
    });

    const driverQuerySnapshot = await getDocs(collection(db, "drivers"));
    driverQuerySnapshot.forEach(async (docRef) => {
      const driverData = docRef.data();
      if (
        driverData.driver ===
        updatedUsers.find((user) => user.uid === userId)?.displayName
      ) {
        await deleteDoc(doc(db, "drivers", docRef.id));
        console.log(
          updatedUsers.find((user) => user.uid === userId)?.displayName +
            " removed from Drivers db"
        );
      }
    });

    setUsers(updatedUsers);
  };

  const handleOpenModal = (user: User) => {
    setModalUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <ListGroup>
        {users.map((user) => (
          <ListGroupItem key={user.uid}>
            <div>DisplayName: {user.displayName}</div>
            <div>Email: {user.email}</div>
            <div>Role: {user.role || "without Role"}</div>
            {user.role && (
              <Button
                variant="danger"
                onClick={() => handleRemoveRole(user.uid)}
              >
                Remove Role
              </Button>
            )}
            {!user.role && (
              <Button variant="success" onClick={() => handleOpenModal(user)}>
                Add Role
              </Button>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
            <option value="dispatcher">Dispatcher</option>
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleAddRole(
                modalUser?.uid ? modalUser.uid : "",
                selectedRole ? selectedRole : "",
                modalUser?.displayName ? modalUser.displayName : ""
              )
            }
          >
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
