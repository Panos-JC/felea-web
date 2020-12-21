import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  useAdminQuery,
  useDeleteAdminMutation,
} from "../../../../../generated/graphql";
import { GeneralSnackbar } from "../../../../shared/generalSnackbar/GeneralSnackbar";
import { Loading } from "../../../../shared/loading/Loading";
import { DeleteUserCard } from "../../../deleteCard/DeleteUserCard";
import { PageTitle } from "../../../pageTitle/PageTitle";

interface AdminPageProps {}

export const AdminPage: React.FC<AdminPageProps> = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useAdminQuery({
    variables: { adminId: parseInt(id) },
  });
  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDelete = async () => {
    const { data } = await deleteAdmin({
      variables: { adminId: parseInt(id) },
    });

    if (data?.deleteAdmin.deleted) {
      history.goBack();
    }

    if (data?.deleteAdmin.errorMsg) {
      setMessage(data.deleteAdmin.errorMsg);
      setOpen(true);
    }
  };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Admin" />
      <DeleteUserCard
        userEmail={data.admin.user.email}
        avatar={data.admin.user.avatar || ""}
        name={`${data.admin.firstName} ${data.admin.lastName}`}
        handleDelete={handleDelete}
      />
      <GeneralSnackbar
        type="error"
        open={open}
        setOpen={setOpen}
        message={message}
      />
    </>
  );
};
