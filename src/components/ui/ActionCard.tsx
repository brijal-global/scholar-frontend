/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";

const ActionCard = ({ data, refetch, actions }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const deleteItem = async (id: any) => {
    await hitApi(actions?.delete?.deleteApiUrl(id), { method: "DELETE" });

    setDeleteModalStatus(false);

    actions?.delete?.postDelete();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        {actions?.edit && (
          <Link href={actions?.edit?.editLink(data?.id)}>
            <FiEdit3 size={20} color="#0295a9" className="cursor-pointer" />
          </Link>
        )}

        {actions?.delete && (
          <CiTrash
            size={20}
            color="red"
            onClick={() => {
              setDeleteModalStatus(true);
            }}
            className="cursor-pointer"
          />
        )}
      </div>

      {deleteModalStatus && (
        <DeleteModal
          isOpen={deleteModalStatus}
          closeModal={() => setDeleteModalStatus(false)}
          title={actions?.delete?.label}
          description={actions?.delete?.description}
          action={() => {
            deleteItem(data?.id);
            setDeleteModalStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default ActionCard;
