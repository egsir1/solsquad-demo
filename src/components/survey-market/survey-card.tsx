"use client";

import Image from "next/image";
import { FC } from "react";
import * as Styles from "./style";
<<<<<<< Updated upstream
import { SurveyModel } from "@/models/SurveyModel";
=======
import { useRouter } from "next/navigation";
>>>>>>> Stashed changes

interface SurveyCardProps extends Omit<SurveyModel, 'questions'> {
  onSetQrUrl: () => void;
}

export const SurveyCard: FC<SurveyCardProps> = ({
  surveyId,
  title,
  creator,
  reward,
  status,
  maxResponses,
  expireTime,
  onSetQrUrl
}) => {
<<<<<<< Updated upstream
  // Calculate duration from expireTime
  const duration = new Date(expireTime).toLocaleDateString();
  
  // For now, we'll use placeholder values for participants and owner info
  const participants = 0;
  const owner_name = creator;
  const owner_avatar = "/assets/default-avatar.png";

  const percentage = Math.min((participants / maxResponses) * 100, 100);
=======
  const percentage = Math.min((participants / limit) * 100, 100);
  const router = useRouter();
>>>>>>> Stashed changes

  return (
    <Styles.Card>
      <Styles.CardHeader onClick={() => router.push(`/user/survey/${title}`)}>
        <div>
          <p>{title}</p>
          <div>
            <span>
              <Image
                src={"/assets/green-dot.svg"}
                width={16}
                height={16}
                alt=""
              />
              {status}
            </span>
            <span>Exp: {duration}</span>
          </div>
        </div>
        <Image src={"/assets/arrow-right.svg"} width={16} height={16} alt="" />
      </Styles.CardHeader>
      <Styles.CardBody>
        <Styles.CardBodyTop>
          <p>Reward</p>
          <h2>{reward.amount} {reward.token}</h2>
        </Styles.CardBodyTop>
        <Styles.CardBodyBottom>
          <div>
            <p>
              <Image src={"/assets/users.svg"} width={18} height={18} alt="" />
              {participants}
            </p>
            <p>
              <Image src={"/assets/users.svg"} width={18} height={18} alt="" />
              {maxResponses}
            </p>
          </div>
          <Styles.CardBodyLine width={percentage}>
            <div></div>
          </Styles.CardBodyLine>
        </Styles.CardBodyBottom>
      </Styles.CardBody>
      <Styles.CardFooter>
        <div>
          <Image src={owner_avatar} width={40} height={40} alt="" />
          <p>{owner_name}</p>
        </div>
        <Image onClick={onSetQrUrl} src={"/assets/code.svg"} width={16} height={16} alt="" />
      </Styles.CardFooter>
    </Styles.Card>
  );
};
