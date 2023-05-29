import { log } from "console";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import "./UserListStyle.module.css";
import { ApiStatus, IUser } from "./User.type";
import { useEffect, useState } from "react";
import { deleteUserAction, getUserListAction } from "./UserSlice";
import { Modal } from "../../component/Modal";

const UserList = () => {
  const [userDataToView, setUserDataToView] = useState<IUser | null>(null);
  const { list, listStatus } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  return (
    <>
      <table>
        <tr>
          <th>Sr.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {listStatus === ApiStatus.loading && <tbody>lists is loading</tbody>}
        {listStatus === ApiStatus.error && <tbody>Error in loading </tbody>}
        {listStatus === ApiStatus.ideal &&
          list.map((user: IUser, index: number) => {
            return (
              <tr>
                <td>{index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <input type="button" value="Edit" />
                  <input
                    type="button"
                    value="View"
                    onClick={() => {
                      setUserDataToView(user);
                    }}
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => {
                      dispatch(deleteUserAction(user.id));
                    }}
                  />
                </td>
              </tr>
            );
          })}
      </table>

      {userDataToView && (
        <Modal
          title={"Details user "}
          onClose={() => {
            setUserDataToView(null);
          }}
        >
          <>
            <div>
              <label htmlFor="">Name : {userDataToView.name}</label>
            </div>
            <div>
              <label htmlFor="">Name : {userDataToView.email}</label>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default UserList;
