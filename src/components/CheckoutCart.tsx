import { Button } from "@mantine/core";
import React from "react";
import { useSnapshot } from "valtio";
import { GlobalStore } from "../../store";
import baselinePaypal from "@iconify/icons-ic/baseline-paypal";
import baselineCurrencyBitcoin from "@iconify/icons-ic/baseline-currency-bitcoin";
import { showNotification } from "@mantine/notifications";
import { Icon } from "@iconify/react";

const CheckoutCart = () => {
  const GlobalStoreSnapshot = useSnapshot(GlobalStore);

  return (
    <div>
      <h2>
        <span>TOTAL :</span>
        {new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(
          GlobalStoreSnapshot.electronicsInCart.reduce(
            (accumlator, currentValue) => {
              return accumlator + currentValue.price * currentValue.quantity;
            },
            0
          )
        )}
      </h2>
      <section>
        <h4>CHECKOUT OPTIONS</h4>
        <Button.Group className=" my-3">
          <Button
            onClick={() => {
              showNotification({
                title: "COMING SOON",
                message: "When I grow up , I will add M-Pesa functionality",
              });
            }}
          >
            M-PESA
          </Button>
          <Button
            leftIcon={<Icon icon={baselinePaypal} />}
            onClick={() => {
              showNotification({
                title: "NOT SO FAST !",
                message: "Did , you expect me to add that ?",
              });
            }}
          >
            PAYPAL
          </Button>
          <Button
            leftIcon={<Icon icon={baselineCurrencyBitcoin} />}
            onClick={() => {
              showNotification({
                title: "HEY THERE",
                message: "nothing here , mostly  dark .",
              });
            }}
          >
            BITCOIN
          </Button>
        </Button.Group>
      </section>
    </div>
  );
};

export default CheckoutCart;
