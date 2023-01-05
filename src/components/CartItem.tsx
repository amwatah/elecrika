/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { ActionIcon, Card } from "@mantine/core";
import baselineAdd from "@iconify/icons-ic/baseline-add";
import baselineMinus from "@iconify/icons-ic/baseline-minus";
import baselineDelete from "@iconify/icons-ic/baseline-delete";
import React from "react";
import { useSnapshot } from "valtio";
import { GlobalStore } from "../../store";

interface Props {
  id: string;
  deviceName: string;
  price: number;
  imageUrl: string;
  stocked: number;
  quantity: number;
}

const CartItem = ({
  id,
  deviceName,
  price,
  imageUrl,
  quantity,
  stocked,
}: Props) => {
  const globalStoreSnapshot = useSnapshot(GlobalStore);
  function deleteCartItem() {
    globalStoreSnapshot.removeItemFromCart(id);
  }
  return (
    <Card className=" m-1 flex items-center justify-evenly gap-4">
      <Card.Section>
        <img
          className=" h-20 w-20 rounded-full object-cover "
          src={imageUrl}
          alt={deviceName}
        />
      </Card.Section>

      <Card.Section className=" mx-1 flex grow items-center justify-between">
        <h5 className=" grow">{deviceName}</h5>
        <p className=" font-bold">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(price)}{" "}
        </p>
        X <span className=" font-black">{quantity}</span>
      </Card.Section>
      <Card.Section className=" actions flex  items-center  justify-around p-2    ">
        <ActionIcon
          onClick={() => {
            if (quantity <= stocked) {
              globalStoreSnapshot.increaseQuantity(id);
            }
          }}
        >
          <Icon className=" text-2xl" icon={baselineAdd} />
        </ActionIcon>

        <ActionIcon
          onClick={() => {
            if (quantity > 1) {
              globalStoreSnapshot.decreaseQuantity(id);
            }
          }}
        >
          <Icon className=" text-2xl" icon={baselineMinus} />
        </ActionIcon>
        <ActionIcon color="red" onClick={deleteCartItem}>
          <Icon className=" text-4xl" icon={baselineDelete} />
        </ActionIcon>
      </Card.Section>
    </Card>
  );
};

export default CartItem;
