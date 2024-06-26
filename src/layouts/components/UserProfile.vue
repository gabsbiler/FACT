<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const userProfileList = [
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'ri-user-line',
    title: 'Profile',
    value: 'profile',
  },
  { type: 'divider' },
]

const router = useRouter()
const currentUser = ref(null)

const logout = async () => {
  try{
    await $api('/auth/logout', {
      method: 'POST',
      body: {
        refresh_token: sessionStorage.getItem('refreshToken'),
      },
    })

    sessionStorage.clear()
    router.push('/login')

  }catch(e){
    sessionStorage.clear()
    router.push('/login')
    console.log("Error logging out: ", e)
  }
}

const fetchUser = async () => {
  try{
    const response = await $api('/users/me', {
      method: 'GET',
    })

    console.log(response)

    currentUser.value = response.data
  }catch(e){
    console.log("Error fetching user: ", e)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <VBadge
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      size="38"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="15px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <h6
              v-if="currentUser"
              class="text-sm font-weight-medium"
            >
              {{ currentUser.first_name }} {{ currentUser.last_name }}
            </h6>
            <VListItemSubtitle class="text-capitalize text-disabled">
              Admin
            </VListItemSubtitle>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :value="item.value"
              >
                <template #prepend>
                  <VIcon
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template
                  v-if="item.badgeProps"
                  #append
                >
                  <VBadge
                    inline
                    v-bind="item.badgeProps"
                  />
                </template>
              </VListItem>

              <VDivider
                v-else
                class="my-1"
              />
            </template>

            <VListItem>
              <VBtn
                block
                color="error"
                append-icon="ri-logout-box-r-line"
                @click="logout"
              >
                Logout
              </VBtn>
            </VListItem>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
