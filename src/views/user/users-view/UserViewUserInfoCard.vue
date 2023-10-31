<template>
  <b-card>
    <b-row>
      <!-- User Info: Top col -->
      <b-col cols="12" xl="8" sm="12" class="">
        <div class="d-flex justify-content-start">
          <div class="d-flex flex-column ml-0">
            <div class="mb-1">
              <h5 class="mb-2">
                {{ userData.name_en }}
                <span class="ml-3">{{ userData.name }}</span>
              </h5>
              <span class="card-text font-italic mr-3" v-if="userData.position">{{
                userData.position.position
              }}</span>
              <b-badge
                pill
                v-if="userData.is_teamleader"
                :variant="`light-primary`"
                class="text-capitalize"
              >
                Team Leader
              </b-badge>
            </div>
          </div>
        </div>
      </b-col>
      <b-col  cols="12" xl="4" sm="12" class="">
        <div class="d-flex justify-content-end">
         <b-button
                :to="{ name: 'users-edit', params: { id: userData.id } }"
                variant="primary"
              >
                Edit
              </b-button>
        </div>      
      </b-col>

      <!-- User Table: Left col -->
      <b-col  cols="12" xl="6" class="">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Staff ID</span>
            </th>
            <td class="pb-50">
              {{ userData.id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Team</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.team_id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Team Name</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.role }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Date of employment</span>
            </th>
            <td class="pb-50">
              {{ userData.date_of_employment }}
            </td>
          </tr>
          <tr>
            <th>
              <span class="font-weight-bold">Last Day of employment</span>
            </th>
            <td>
              {{ userData.last_day_of_employment }}
            </td>
          </tr>
        </table>
      </b-col>
      <!-- User Table: Right col -->
      <b-col cols="12" xl="6" class="">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">HKID</span>
            </th>
            <td class="pb-50">
              {{ userData.hk_id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Home Address</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.home_address }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Email Address</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.email }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Contact No.</span>
            </th>
            <td class="pb-50">
              {{ userData.phone }}
            </td>
          </tr>
          <tr>
            <th>
              <span class="font-weight-bold">Gender</span>
            </th>
            <td>
              {{ userData.gender }}
            </td>
          </tr>
          <tr>
            <th>
              <span class="font-weight-bold">Date of Birth</span>
            </th>
            <td>
              {{ userData.date_of_birth }}
            </td>
          </tr>
        </table>
      </b-col>
    <!--
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
  
        <div class="d-flex justify-content-start">
          <div class="d-flex flex-column ml-1" id="userTableLeft"></div>
        </div>

     
        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar variant="light-primary" rounded>
              <feather-icon icon="DollarSignIcon" size="18" />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">23.3k</h5>
              <small>Monthly Sales</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar variant="light-success" rounded>
              <feather-icon icon="TrendingUpIcon" size="18" />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">$99.87k</h5>
              <small>Annual Profit</small>
            </div>
          </div>
        </div>
      </b-col>
      -->

    </b-row>
  </b-card>
</template>

<script>
import { BCard, BButton, BAvatar, BRow, BCol, BBadge } from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import useUsersList from "../users-list/useUsersList";
import { onMounted } from "@vue/composition-api";

export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
    BBadge,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { resolveUserRoleVariant } = useUsersList();

    onMounted(() => {
      console.log("UserViewUserInfoCard", props);
    });

    return {
      avatarText,
      resolveUserRoleVariant,
    };
  },
};
</script>

<style>
#userTableLeft,
#userTableRight {
  width: 80%;
}

@media only screen and (max-width: 600px) {
  #userTableRight {
    width: 100%;
  }
}
</style>
