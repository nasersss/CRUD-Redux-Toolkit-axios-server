import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../component/Input/Input";
import Styles from "./UserFormStyle.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUserAction, resetCreateListStatus } from "./UserSlice";
import { ApiStatus, IUserForm } from "./User.type";
import { RootState } from "../../app/store";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { createUserFormStatus } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IUserForm = { name, email };
    dispatch(createUserAction(data));
  };

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
          <input type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
