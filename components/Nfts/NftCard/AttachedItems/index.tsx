"use-client";

import Image from "next/image";
import Tooltip from "rc-tooltip";
import useGetInventoryItem from "../../../Inventory/hooks/useGetInventoryItem";
import useMarketItemMetadata from "../../../Inventory/hooks/useMarketItemMetadata";
import { parseAttributes } from "./utils";
import "rc-tooltip/assets/bootstrap_white.css";
import "./index.scss";

interface Props {
  tokenId: number;
}

const AttachedItems = ({ tokenId }: Props) => {
  const { data: weapon } = useGetInventoryItem(tokenId);
  const { data: metadata } = useMarketItemMetadata(tokenId);

  if (!weapon || !metadata) return null;

  const parsedAttributes = parseAttributes({ weapon, metadata });

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
        <Image src={weapon.image} width={60} height={50} alt={weapon.name} />
      </Tooltip>
    </div>
  );
};

export default AttachedItems;
