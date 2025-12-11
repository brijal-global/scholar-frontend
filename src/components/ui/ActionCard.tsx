/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import DeleteModal from "@/components/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";
import useFetch from "@/hooks/useFetch";

const ActionCard = ({ item, actions }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const { hitApi, loading } = useFetch(
    actions?.delete?.deleteApiUrl(item?.id),
    {
      method: "DELETE",
      now: false,
      showSuccessToast: true,
    }
  );

  const deleteItem = async () => {
    const res = await hitApi();

    if (res?.success) {
      actions?.delete?.postDelete?.();
      setDeleteModalStatus(false);
    }
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        {actions?.edit && (
          <Link href={actions?.edit?.editLink(item?.id)}>
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

      <DeleteModal
        isOpen={deleteModalStatus}
        closeModal={() => setDeleteModalStatus(false)}
        title={actions?.delete?.label}
        description={actions?.delete?.description}
        action={deleteItem}
        loading={loading}
      />
    </div>
  );
};

export default ActionCard;
