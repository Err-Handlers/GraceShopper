import CompletedOrder from "./CompletedOrder";

const Account = ({ token }) => {
  return (
    <>
      <div className="mainContainer">
        <div className="cartContainer">
          <center>
            <h2 className="cartHeader">Order History</h2>
          </center>
          <CompletedOrder token={token} />
        </div>
      </div>
    </>
  );
};

export default Account;
