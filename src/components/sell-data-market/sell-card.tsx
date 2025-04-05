import { useState } from "react";
import * as Styles from "./style";

type SellingData = {
  survey_id: number;
  title: string;
  summary: string;
  data_type: string;
  price: number;
  buyer: string | null;
  sold_at: number;
};

type Props = {
  data: SellingData;
};

const SellingDataCard: React.FC<SellingData> = ({
  title,
  data_type,
  price,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = () => {
    setIsLoading(true);
    // Simulate an API call or blockchain transaction
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Mock delay of 1 second
  };

  const buttonText = data_type === "FREE" ? "Get Free" : `Buy for ${price} SOL`;
  const isDisabled = isLoading;

  return (
    <Styles.CardContainer>
      <Styles.CardTitle>{title}</Styles.CardTitle>
      <Styles.CardDetails>
        Type: {data_type}{" "}
        {data_type === "PAID" && price ? `| Price: ${price} SOL` : ""}
      </Styles.CardDetails>
      <Styles.ActionButton onClick={handleAction} disabled={isDisabled}>
        {isLoading ? "Processing..." : buttonText}
      </Styles.ActionButton>
    </Styles.CardContainer>
  );
};

export default SellingDataCard;
