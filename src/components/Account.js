import { useEffect, useState } from "react";

import CompletedOrder from "./CompletedOrder"

const Account = ({
  token,
}) => {
  

  return (
    <>
      <div className="mainContainer">
        <div className="cartContainer">
              <CompletedOrder
                token={token}
              />
            
            
        </div>
      </div>
    </>
  );
};

export default Account;
