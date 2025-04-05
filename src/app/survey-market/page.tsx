"use client";

import { SurveyMarketHeader } from "@/components/survey-market/header";
import { SurveyCard } from "@/components/survey-market/survey-card";
import { SurveyData } from "@/types/json";
import * as Styles from "@/components/survey-market/style";
import { useState } from "react";
import QRCode from "@/components/qr-code";

const SurveyMarket = () => {
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const handleQrCodeClick = (url: number) => {
    setShowQrCode(true);
    const ts = `https://localhost:3000/survey-market/${url}`;
    setQrCodeUrl(ts);
  };
  return (
    <div>
      <SurveyMarketHeader />
      <div>
        <h1></h1>
        <Styles.CardWrapper>
          {SurveyData.map((survey) => (
            <SurveyCard
              key={survey.id}
              {...survey}
              onSetQrUrl={() => handleQrCodeClick(survey?.id)}
            />
          ))}
        </Styles.CardWrapper>
      </div>
      {/** QR Code Modal */}
      {showQrCode && (
        <QRCode onClose={() => setShowQrCode(false)} url={qrCodeUrl} />
      )}
    </div>
  );
};

export default SurveyMarket;
