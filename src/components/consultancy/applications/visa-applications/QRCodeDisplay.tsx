import React from "react";
import { QrCode } from "lucide-react";

interface QRCodeDisplayProps {
  paymentOption: "FonePay" | "Khalti" | "Esewa";
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ paymentOption }) => {
  // TODO: replace it with actual path of QRcode
  const qrCodeMapping: {
    [key in "FonePay" | "Khalti" | "Esewa"]: {
      qrCode: React.ReactNode;
      accountNumber: string;
    };
  } = {
    FonePay: {
      qrCode: <QrCode size={100} />,
      accountNumber: "FonePay Account Number",
    },
    Khalti: {
      qrCode: <QrCode size={100} />,
      accountNumber: "Khalti Accont Number",
    },
    Esewa: {
      qrCode: <QrCode size={100} />,
      accountNumber: "9860565785",
    },
  };

  const { qrCode, accountNumber } = qrCodeMapping[paymentOption];

  return (
    <>
      <p className="text-sm text-right text-[#838383] mt-4">
        Scan the QR code or send money to the {paymentOption} account below:
      </p>
      <div className="text-center bg-[#F6F8F9] p-4 rounded-xl">
        <div className="flex justify-center item-center text-[#687789]">
          {qrCode}
        </div>
        <div className="text-[#29935C] text-sm font-semibold">
          <p>{accountNumber}</p>
          <p>Scholar {paymentOption} account</p>
        </div>
      </div>
    </>
  );
};

export default QRCodeDisplay;
