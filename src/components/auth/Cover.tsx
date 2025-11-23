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
        <h1 className="text-white text-3xl font-bold flex items-center gap-2">
          Search or become a professional!
        </h1>
        <p className="text-white text-sm max-w-2xl">
          Connect with professionals, showcase your skills, and find or offer
          services all in one platform. Whether you&apos;re looking for
          expertise or to offer your services, we&apos;ve got you covered.
        </p>
      </div>
    </div>
  );
};

export default Cover;
