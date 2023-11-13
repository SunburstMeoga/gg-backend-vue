import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function useAddressList() {
  const toast = useToast();

  const refAddressListTable = ref(null);

  const tableColumns = [
    { key: "tokenId", label: "tokenId" },
    { key: "name"},
    { key: "owner", label: "owner" },
    /*     { key: "name", label: "名称" }, */
    /*     { key: "type", label: "卡类型" }, */
    { key: "utc", label: "时间" },
  ];

  const addr = ref(null);
  const statistic = ref({
    reward_type_1: 0,
    count_type_1: 0,
    reward_type_2: 0,
    count_type_2: 0,
    reward_type_3: 0,
    count_type_3: 0,
    reward_type_4: 0,
    count_type_4: 0,
    reward_type_5: 0,
    count_type_5: 0,
    reward_type_6: 0,
    count_type_6: 0,
    reward_type_7: 0,
    count_type_7: 0,
    number_of_invite:0,
    personal: 0,
    income_card:0,
    income_deposite:0,
    income_personal:0,
    income_team:0,
    income_pool:0,
    income_sum:0
  });
  const loading_stat = ref(false);
  const loading_nft = ref(false);

  const perPage = ref(10);
  const totalAddresses = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [10, 25, 50, 100];
  const searchQuery = ref("");
  const sortBy = ref("utc");
  const isSortDirDesc = ref(true);

  const dataMeta = computed(() => {
    const localItemsCount = refAddressListTable.value
      ? refAddressListTable.value.localItems.length
      : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalAddresses.value,
    };
  });

  const showMessage = (title, text, icon, variant) => {
    toast({
      component: ToastificationContent,
      props: {
        title,
        text,
        icon,
        variant,
      },
    });
  };

  const refetchData = () => {
    refAddressListTable.value.refresh();
  };

  watch([currentPage, perPage, searchQuery], () => {
    refetchData();
  });

  /*   watch([addr], () => {
    fetchStat();
  }) */

  const fetchStat = () => {
    loading_stat.value = true;
    store
      .dispatch("address/fetchStat", {
        addr: addr.value,
      })
      .then((response) => {
        statistic.value = { ...statistic.value, ...response.data };
        console.log(statistic.value);
        loading_stat.value = false;
      })
      .catch(() => {
        loading_stat.value = false;
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching statistic",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  const fetchAddresses = (ctx, callback) => {
    /*   let address = [
      {
        id: "1451",
        type: "财神卡",
        name: "贤人武财神",
        address: "0x0002....2asd",
        amount: 987654321,
        last_update: "2023-10-30 12:00:00",
      },
      {
        id: "1451",
        type: "合成道具卡",
        name: "青龙偃月刀",
        address: "0x0002....2asd",
        amount: 987654321,
        last_update: "2023-10-30 12:00:00",
      },
      {
        id: "1451",
        type: "角色卡",
        name: "美髯公",
        address: "0x0002....2asd",
        amount: 987654321,
        last_update: "2023-10-30 12:00:00",
      },
    ];

    callback(address);
    totalAddresses.value = address.length; */
    loading_nft.value = true
    store
      .dispatch("address/fetchAddresses", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
      })
      .then((response) => {
        loading_nft.value = false
        const { nfts, total } = response.data;
        callback(nfts);
        totalAddresses.value = total;
      })
      .catch((error) => {
        loading_nft.value = false
        console.log(error)
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching addresses list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  return {
    fetchAddresses,
    tableColumns,
    perPage,
    currentPage,
    totalAddresses,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refetchData,
    refAddressListTable,
    fetchStat,
    addr,
    statistic,
    loading_stat,
    loading_nft
  };
}
