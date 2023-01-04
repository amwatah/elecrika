import { Icon } from "@iconify/react";
import { ActionIcon, Button, Card, Indicator } from "@mantine/core";
import baselineAdd from "@iconify/icons-ic/baseline-add";
import baselineMinus from "@iconify/icons-ic/baseline-minus";
import baselineAddShoppingCart from "@iconify/icons-ic/baseline-add-shopping-cart";
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

const CartItem = ({ id, deviceName, price, imageUrl, quantity }: Props) => {
  const globalStoreSnapshot = useSnapshot(GlobalStore);
  function removeFromCart() {
    globalStoreSnapshot.removeItemFromCart(id);
  }
  return (
    <Indicator color="teal" position="middle-start" radius="xs">
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
          <ActionIcon>
            <Icon icon={baselineAdd} />
          </ActionIcon>
          <Button
            color="red"
            onClick={removeFromCart}
            leftIcon={<Icon icon={baselineAddShoppingCart} />}
            className="  grow"
          >
            REMOVE
          </Button>
          <ActionIcon>
            <Icon icon={baselineMinus} />
          </ActionIcon>
        </Card.Section>
      </Card>
    </Indicator>
  );
};

export default CartItem;
