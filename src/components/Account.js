import CompletedOrder from "./CompletedOrder";

const Account = ({ token }) => {
  return (
    <>
      <h2 className="cartHeader">Order History</h2>
      <div className="completed-order-container">
        <CompletedOrder token={token} />
        </div>
    </>
  );
};

export default Account;
