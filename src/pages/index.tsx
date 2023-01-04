import { ActionIcon, Indicator, Paper, Text, TextInput } from "@mantine/core";

import { useSnapshot } from "valtio";
import { GlobalStore } from "../../store";
import { api } from "../utils/api";
import { Icon } from "@iconify/react";
import baselineShoppingCart from "@iconify/icons-ic/baseline-shopping-cart";
import sharpSearch from "@iconify/icons-ic/sharp-search";
import ElectronicCard from "../components/ElectronicCard";
import Link from "next/link";

const Shop = () => {
  const globalStoreSnapshot = useSnapshot(GlobalStore);
  const { data: electronics } = api.electronics.getElectronics.useQuery();

  return (
    <div>
      <Paper className="header container sticky top-0 z-50 mx-auto  mt-1 flex items-center justify-between p-2">
        <Text className=" text-xs font-bold" color="blue">
          ELECTRIKA
        </Text>
        <TextInput
          placeholder="eg. Smartphone"
          icon={<Icon icon={sharpSearch} />}
          radius="xl"
        />
        <Link href="/cart">
          <Indicator label={globalStoreSnapshot.electronicsInCart.length}>
            <ActionIcon color="">
              <Icon icon={baselineShoppingCart} />
            </ActionIcon>
          </Indicator>
        </Link>
      </Paper>
      <section className="electronics container mx-auto grid justify-items-center gap-1 sm:grid-cols-3 md:grid-cols-4">
        {electronics?.map((electronic) => (
          <ElectronicCard {...electronic} key={electronic.id} />
        ))}
      </section>
    </div>
  );
};

export default Shop;
