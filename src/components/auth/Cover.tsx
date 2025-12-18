import professional from "@/assets/images/professional.jpg";
import Image from "next/image";

const Cover = () => {
  return (
    <div className="hidden lg:block overflow-hidden relative h-screen">
      <Image
        src={professional}
        alt="sign-in"
        width={1000}
        height={1000}
        className="w-full h-full object-top object-cover"
      />
      <div className="absolute h-full inset-0 bg-linear-to-b from-transparent to-black flex flex-col justify-end p-16 gap-4">
        <h1 className="text-white text-3xl font-bold flex items-center gap-2 tracking-wide">
          Scholar Operations Portal
        </h1>
        <p className="text-gray-300 text-sm max-w-2xl">
          Onboard or Manage all the subscribed colleges with ease. Add, edit,
          and delete colleges with just a few clicks. You can also view the
          details of the colleges and the students who are subscribed to them.
        </p>
      </div>
    </div>
  );
};

export default Cover;
