
import CompletedOrder from "./CompletedOrder"

const Account = ({
  token,
  shippingFirstName,
  shippingLastName,
  shippingState,
  shippingZipcode,
  shippingCity,
  shippingStreet,
}) => {
  

  return (
    <>
      <div className="mainContainer">
        <div className="cartContainer">
              <CompletedOrder
                token={token}
                shippingFirstName={shippingFirstName}
                shippingLastName={shippingLastName}
                shippingState={shippingState}
                shippingZipcode={shippingZipcode}
                shippingCity={shippingCity}
                shippingStreet={shippingStreet}
              />
            
            
        </div>
      </div>
    </>
  );
};

export default Account;