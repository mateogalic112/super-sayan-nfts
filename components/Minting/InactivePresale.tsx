"use client";

import useCheckOwner from "components/Minting/hooks/useCheckOwner";
import useStartPresale from "components/Minting/hooks/useStartPresale";

const InactivePresale = () => {
  const startPresale = useStartPresale();
  const { data: isOwner } = useCheckOwner();

  const renderButton = () => {
    switch (true) {
      case isOwner:
        return (
          <button onClick={() => startPresale.mutateAsync()}>
            Start presale!
          </button>
        );
      default:
        return <div>Presale hasn&#39;t started!</div>;
    }
  };

  return <div>{renderButton()}</div>;
};

export default InactivePresale;
