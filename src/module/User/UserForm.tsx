import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "../../component/Input/Input";
import Styles from "./UserFormStyle.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createUserAction,
  resetCreateListStatus,
  updateUserAction,
} from "./UserSlice";
import { ApiStatus, IUpdateUserActionProps, IUserForm } from "./User.type";
import { RootState } from "../../app/store";
import { useParams } from "react-router-dom";
import { toastError } from "../../component/ToastifyConfig";

type FormProps = {
  isEditForm?: boolean;
};

const UserForm = (props: FormProps) => {
  const { isEditForm } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const params = useParams();
  const userIdToEdit = useRef(parseInt(params.id || ""));
  const { list } = useAppSelector((state) => state.user);

  const { createUserFormStatus, updateUserFormStatus } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IUserForm = { name, email };

    if (name && email) {
      if (isEditForm) {
        //update
        const dirtyFormData: IUpdateUserActionProps = {
          id: userIdToEdit.current,
          data,
        };
        dispatch(updateUserAction(dirtyFormData));
      } else {
        //create
        dispatch(createUserAction(data));
      }
    } else {
      toastError("Please fill the form");
    }
  };

  useEffect(() => {
    if (isEditForm && userIdToEdit.current) {
      const userRecord = list.find((x) => x.id === userIdToEdit.current);
      if (userRecord) {
        setName(userRecord.name);
        setEmail(userRecord.email);
      }
    }
  }, [isEditForm]);

  useEffect(() => {
    if (createUserFormStatus === ApiStatus.success) {
      setName("");
      setEmail("");
      dispatch(resetCreateListStatus());
    }
  }, [createUserFormStatus]);

  return (
    <div className={Styles.container}>
      <form action="" onSubmit={onSubmit}>
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <div className={Styles["btn-wrapper"]}>
          <input
            type="submit"
            value={isEditForm ? "Update" : "Create"}
            disabled={
              createUserFormStatus === ApiStatus.loading ||
              updateUserFormStatus === ApiStatus.loading
            }
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
