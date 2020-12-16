<template>
  <div class="account">
    <SecurePage v-if="!isSignedIn" />
    <div v-if="isSignedIn">
      <AccountUpdateForm />
    </div>
  </div>
</template>

<script>
import SecurePage from "@/components/SecurePage.vue";
import AccountUpdateForm from "@/components/AccountUpdateForm.vue";

export default {
  components: { SecurePage, AccountUpdateForm },
  computed: {
    isSignedIn: function() {
      return this.$store.getters.isSignedIn;
    }
  },
  data: () => ({})
};
</script>
