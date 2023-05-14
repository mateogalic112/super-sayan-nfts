"use-client";

import { Weapon } from "models/Weapon";
import Image from "next/image";
import Tooltip from "rc-tooltip";
import { parseAttributes } from "./utils";
import "rc-tooltip/assets/bootstrap_white.css";
import "./index.scss";

interface Props {
  weapon: Weapon;
}

const AttachedItem = ({ weapon }: Props) => {
  const parsedAttributes = parseAttributes({ weapon });

  return (
    <div>
      <Tooltip
        overlayClassName="weapon-tooltip"
        placement="top"
        trigger={["hover"]}
        mouseLeaveDelay={0}
        overlay={
          <div className="weapon-metadata-container">
            <ul className="weapon-metadata">
              {parsedAttributes.map((item) => (
                <li key={item.label} className="weapon-item">
                  <p className="weapon-item-label">{item.label}</p>
                  <p className="weapon-item-value">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Image src={weapon.image} width={32} height={32} alt={weapon.name} />
      </Tooltip>
    </div>
  );
};

export default AttachedItem;
