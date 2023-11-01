import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function useAddressList() {
  const toast = useToast();

  const refAddressListTable = ref(null);

  const tableColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "名称" },
    { key: "type", label: "卡类型" },
    { key: "last_update", label: "到期时间" },
  ];

  const perPage = ref(10);
  const totalAddresses = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [10, 25, 50, 100];
  const searchQuery = ref("");
  const sortBy = ref("address");
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

  const fetchAddresses = (ctx, callback) => {
    let address = [
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
    totalAddresses.value = address.length;

    /* store.dispatch('address/fetchAddresses', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response => {
            const { addresses, total} = response.data
            callback(addresses)
            totalAddresses.value = total
        })
        .catch(() => {
            toast({
                component: ToastificationContent,
                props: {
                  title: 'Error fetching addresses list',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                },
            })
        }) */
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
  };
}
