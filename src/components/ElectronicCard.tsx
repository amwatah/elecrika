/* eslint-disable @next/next/no-img-element */
import { ActionIcon, Button, Card, Indicator } from "@mantine/core";
import React from "react";
import baselineAdd from "@iconify/icons-ic/baseline-add";
import baselineMinus from "@iconify/icons-ic/baseline-minus";
import baselineAddShoppingCart from "@iconify/icons-ic/baseline-add-shopping-cart";
import { Icon } from "@iconify/react";
import { useSnapshot } from "valtio";
import { GlobalStore } from "../../store";
import { showNotification } from "@mantine/notifications";

interface Props {
  id: string;
  deviceName: string;
  price: number;
  imageUrl: string;
  stocked: number;
  quantity?: number;
}
const ElectronicCard = ({
  id,
  deviceName,
  price,
  imageUrl,
  stocked,
  quantity,
}: Props) => {
  const globalStoreSnapshot = useSnapshot(GlobalStore);
  function addItemToCart() {
    globalStoreSnapshot.addItemtoCart({
      id,
      deviceName,
      price,
      imageUrl,
      stocked,
      quantity: 1,
    });
    showNotification({
      title: `${deviceName} added to your  cart `,
      message: " proceed to checkout !",
      color: "teal",
      autoClose: 2000,
    });
    console.log("cart", globalStoreSnapshot.electronicsInCart);
  }
  return (
    <Indicator color="teal" position="middle-start" radius="xs" label={stocked}>
      <Card className=" m-1  w-64">
        <Card.Section>
          <img
            className=" h-64 w-64 rounded-md object-cover "
            src={imageUrl}
            alt={deviceName}
          />
        </Card.Section>

        <Card.Section className=" mx-1 flex items-center justify-between">
          <h5>{deviceName}</h5>
          <p className=" font-bold">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </p>
        </Card.Section>
        <Card.Section className=" actions flex w-64 items-center  justify-around p-2    ">
          <Button
            disabled={globalStoreSnapshot.electronicsInCart.some(
              (itemIncart) => itemIncart.id === id
            )}
            onClick={addItemToCart}
            leftIcon={<Icon icon={baselineAddShoppingCart} />}
            className="  grow"
          >
            ADD
          </Button>
        </Card.Section>
      </Card>
    </Indicator>
  );
};

export default ElectronicCard;
