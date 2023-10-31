<template>
    <div>
        <role-list-add-new :is-add-new-role-sidebar-active.sync="isAddNewRoleSidebarActive" :id="id" :data="roleData"
            @refetch-data="refetchData" v-if="ability.can('create', 'roles') || true">
        </role-list-add-new>

        <b-card no-body class="mb-0">
            <div class="m-2">
                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                        <label>Show</label>
                        <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
                        <label>entries</label>
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="6">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Search..." />
                            <b-button variant="primary" @click="handleCreate">
                                <span class="text-nowrap">新增角色</span>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </div>

            <b-table ref="refRoleListTable" class="role-relative" :items="fetchRoles" responsive :fields="tableColumns"
                primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
                :sort-desc.sync="isSortDirDesc">
                <template #cell(working_paper_bit)="data">
                    <feather-icon v-if="data.item.working_paper_bit" icon="CheckIcon" size="18"
                        class="mr-50 text-success" />
                </template>
                <template #cell(invoicing_bit)="data">
                    <feather-icon v-if="data.item.invoicing_bit" icon="CheckIcon" size="18" class="mr-50 text-success" />
                </template>
                <template #cell(timesheet_bit)="data">
                    <feather-icon v-if="data.item.timesheet_bit" icon="CheckIcon" size="18" class="mr-50 text-success" />
                </template>
                <template #cell(action)="data">
                    <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
                        <template #button-content>
                            <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                        </template>
                        <b-dropdown-item v-if="ability.can('update', 'roles') || true"
                            :to="{ name: 'roles-edit', params: { id: data.item.id } }">
                            <feather-icon icon="EditIcon" />
                            <span class="align-middle ml-50">Edit</span>
                        </b-dropdown-item>
                    </b-dropdown>
                </template>
            </b-table>
            <div class="mx-2 mb-2">
                <b-row>

                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }}
                            entries</span>
                    </b-col>
                    <!-- Pagination -->
                    <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

                        <b-pagination v-model="currentPage" :total-rows="totalRoles" :per-page="perPage" first-number
                            last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>

                    </b-col>

                </b-row>
            </div>

        </b-card>
    </div>
</template>
  
<script>
import {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import roleStoreModule from "../roleStoreModule";
import useRolesList from "./useRolesList";
import RoleListAddNew from "./RoleListAddNew.vue"

export default {
    components: {
        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,
        vSelect,
        RoleListAddNew,
    },
    methods: {
        handleCreate() {
            this.id = 0
            this.resetRoleData()
            this.isAddNewRoleSidebarActive = true
        },
        handleEdit(item) {
            this.id = item.id
            this.roleData.id = item.id
            this.roleData.name = item.name
            this.isAddNewRoleSidebarActive = true
        }, resetRoleData() {
            this.roleData = {
                id: 0,
                name: '',
            }
        },
        confirmDelete(id) {
            this.$swal({
                title: 'Are you sure?',
                text: 'Your action is final and you will not be able to retrieve the role.',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            })
                .then(result => {
                    if (result.value) {
                        this.$store.dispatch("app-role/deleteRole", { 'id': id })
                            .then((response) => {
                                this.$swal({
                                    text: response.data.message,
                                    icon: 'success',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    showClass: {
                                        popup: 'animate__animated animate__bounceIn',
                                    },
                                    buttonsStyling: false,
                                })
                                this.refetchData()
                            }).catch((error) => {
                                this.$swal({
                                    text: JSON.stringify(error.response.data.message),
                                    icon: 'error',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    showClass: {
                                        popup: 'animate__animated animate__bounceIn',
                                    },
                                    buttonsStyling: false,
                                })

                            })
                    }
                })
        },
    },
    data() {
        return {
            id: 0,
            roleData: {},
        }
    },
    setup() {
        const APP_ROLE_STORE_MODULE_NAME = "app-role";

        if (!store.hasModule(APP_ROLE_STORE_MODULE_NAME))
            store.registerModule(
                APP_ROLE_STORE_MODULE_NAME,
                roleStoreModule
            );

        onUnmounted(() => {
            if (store.hasModule(APP_ROLE_STORE_MODULE_NAME))
                store.unregisterModule(APP_ROLE_STORE_MODULE_NAME);
        });

        const isAddNewRoleSidebarActive = ref(false);

        const {
            fetchRoles,
            tableColumns,
            perPage,
            currentPage,
            totalRoles,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refRoleListTable,
            refetchData,
            ability,
        } = useRolesList();

        return {
            //Sidebar
            isAddNewRoleSidebarActive,

            fetchRoles,
            tableColumns,
            perPage,
            currentPage,
            totalRoles,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refRoleListTable,
            refetchData,
            avatarText,
            ability,
        };
    },
};
</script>
  
<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}
</style>
  
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>