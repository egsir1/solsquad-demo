"use client";

import Image from "next/image";
import { FC } from "react";
import * as Styles from "./style";

interface SurveyCardProps {
  title: string;
  reward: number;
  duration: string;
  limit: number;
  participants: number;
  status: string;
  owner_name: string;
  owner_avatar: string;
}

export const SurveyCard: FC<SurveyCardProps> = ({
  duration,
  limit,
  owner_avatar,
  owner_name,
  participants,
  reward,
  status,
  title,
}) => {
  const percentage = Math.min((participants / limit) * 100, 100);

  return (
    <Styles.Card>
      <Styles.CardHeader>
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
          <h2>{reward} SOL</h2>
        </Styles.CardBodyTop>
        <Styles.CardBodyBottom>
          <div>
            <p>
              <Image src={"/assets/users.svg"} width={18} height={18} alt="" />
              {participants}
            </p>
            <p>
              <Image src={"/assets/users.svg"} width={18} height={18} alt="" />
              {limit}
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
        <Image src={"/assets/code.svg"} width={16} height={16} alt="" />
      </Styles.CardFooter>
    </Styles.Card>
  );
};
