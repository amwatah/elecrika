import {
  ActionIcon,
  Autocomplete,
  Indicator,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";

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
  function data() {
    const searchItems: string[] = [];
    electronics?.forEach((el) => searchItems.push(el.deviceName));
    return searchItems;
  }
  return (
    <div>
      <Paper
        bg="dark"
        className="header container fixed top-0 z-50 mx-auto  flex items-center justify-between p-2 pt-1"
      >
        <Text className=" text-xs font-bold" color="blue">
          ELECTRIKA
        </Text>
        <Autocomplete
          placeholder="eg. Smartphone"
          icon={<Icon icon={sharpSearch} />}
          radius="xl"
          data={data()}
        />
        <Link href="/cart">
          <Indicator label={globalStoreSnapshot.electronicsInCart.length}>
            <ActionIcon color="teal">
              <Icon className=" text-4xl" icon={baselineShoppingCart} />
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
