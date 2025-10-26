"use client";

interface demoData {
  id: string;
  PaymentType: string;
  PaymentMethod: string;
  University: string;
  Program: string;
  totalAmount: string;
  status: "Paid" | "Failed";
}
const mockData: demoData[] = [
  {
    id: "1",
    PaymentType: "Application Fee",
    PaymentMethod: "Mobile Banking",
    University: "Yonsei University",
    Program: "Business Administration (Graduate)",
    totalAmount: "NPR 13992.87 ($100.00)",
    status: "Paid",
  },
  {
    id: "2",
    PaymentType: "Visa Fee",
    PaymentMethod: "Mobile Banking",
    University: "Yonsei University",
    Program: "Business Administration (Graduate)",
    totalAmount: "NPR 13992.87 ($100.00)",
    status: "Failed",
  },
];
function StylePallet({ status }: { status: demoData["status"] }) {
  const Styles = {
    Paid: "bg-[#B7FFBB] text-[#1E9E24]",
    Failed: "bg-[#FFE9E9] text-[#DE4F4F]",
  };

  return (
    <span
      className={`block px-3 py-1 rounded-md text-sm text-center font-medium ${Styles[status]} text-nowrap w-full`}
    >
      {status}
    </span>
  );
}
export default function Payment() {
  return (
    <>
      <section className="p-5">
        <div>
          <h2 className="font-semibold text-xl">Payments</h2>
          <p className="text-sm text-[#929292]">
            Core details about the Student
          </p>
        </div>
        {/* Personal Information */}
        <h3 className="text-[#258654] font-bold mt-5 mb-3">
          Payment Verification
        </h3>
        <div>
          {mockData.map((item) => (
            <div
              key={item.id}
              className="text-sm mb-4 p-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <p className="text-[#606060]">Payment Summary</p>
                <p>
                  <StylePallet status={item.status} />
                </p>
              </div>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>Payment Type:</p>
                <p> {item.PaymentType}</p>
              </div>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>Payment Method: </p>
                <p>{item.PaymentMethod}</p>
              </div>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>University:</p>
                <p> {item.University}</p>
              </div>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>Program:</p> <p>{item.Program}</p>
              </div>
              <div className="text-[#29935C] font-bold text-lg flex items-center justify-between mt-2">
                <p>Total Amount:</p> <p>{item.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
