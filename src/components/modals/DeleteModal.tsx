import { Modal } from "antd/lib";
import { CiTrash } from "react-icons/ci";
import { PrimaryButton, SecondaryOutlineButton } from "../ui/Buttons";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
  title: string;
  description: string;
  loading: boolean;
}

const DeleteModal = ({
  isOpen,
  closeModal,
  title,
  description,
  action,
  loading,
}: ModuleModalProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        closeIcon={null}
        centered
        onCancel={closeModal}
        styles={{
          mask: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          content: {
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
          },
        }}
      >
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex flex-col items-center gap-5">
            <span className="rounded-[50%] p-2.5 bg-[#FCEEEE] text-[#E05151]">
              <CiTrash size={25} />
            </span>
            <span className="font-medium text-lg text-red-600">{title}</span>
          </div>

          <p className="text-center">{description}</p>

          <div className="flex gap-4 items-center text-sm mt-5">
            <SecondaryOutlineButton
              title={"Cancel"}
              onClick={closeModal}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-12!"
            />

            <PrimaryButton
              title={"Delete"}
              onClick={action}
              disabled={loading}
              className="bg-red-500 text-white hover:bg-red-700 px-12!"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
