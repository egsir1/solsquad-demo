// components/QRCode.tsx
"use client";

import { QRCodeCanvas } from "qrcode.react";
import * as Styles from "./style";
import Image from "next/image";
interface QRCodeProps {
  url: string;
  onClose: () => void;
}

const QRCode: React.FC<QRCodeProps> = ({ url, onClose }) => {
  return (
    <Styles.QRCodeContainer>
      <Image onClick={onClose} width={24} height={24} src={"/assets/close.svg"} alt="" />
      <div>
        <QRCodeCanvas
          value={url}
          size={395}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
    </Styles.QRCodeContainer>
  );
};

export default QRCode;
