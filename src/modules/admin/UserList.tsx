import { useEffect, useState } from "react";

import { ListGroup, ListGroupItem, Button, Form, Modal } from "react-bootstrap";

import { User } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { addRole, fetchUsers, removeRole } from "../../store/editUsers/actions";
import { getUsers } from "../../store/editUsers/selector";

const UserList = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users = useAppSelector(getUsers);

  const handleAddRole = (userId: string, role: string, displayName: string) => {
    dispatch(addRole({ userId, role, displayName }));
    setSelectedRole("");
    setShowModal(false);
  };

  const handleRemoveRole = (userId: string) => {
    dispatch(removeRole(userId))
      .then(() => console.log("HANDLER WORK"))
      .catch((error) => console.error(error));
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
          <ListGroupItem key={user.id}>
            <div>DisplayName: {user.displayName}</div>
            <div>Email: {user.email}</div>
            <div>Role: {user.role || "without Role"}</div>
            {user.role && (
              <Button
                variant="danger"
                onClick={() => handleRemoveRole(user.id)}
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
                modalUser?.id ? modalUser.id : "",
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
