<script lang="ts" setup>
import { ref } from 'vue'
import { findAppBoxSeries, type IFindAppBoxSeries } from '@/api/qwcw'

import { useUserStore } from '@/stores/user'

const { userList } = useUserStore()

const form = ref<IFindAppBoxSeries>({
  currentPage: 1,
  pageSize: 10,
  goodType: '',
  userId: 0,
})

/** 盒子列表 */
const boxList = ref([])

/** 获取盒子列表 */
async function getBoxList() {
  form.value.userId = userList.value[0].userId
  const [err, res] = await findAppBoxSeries(form.value)
  if (err) return
  console.log(res)
}

async function pageCreated() {
  getBoxList()
}

pageCreated()
</script>

<template>
  <div>
    <a-card hoverable style="width: 200px">
      <template #cover>
        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png">
      </template>
      <!-- <template #actions>
        <setting-outlined key="setting" />
        <edit-outlined key="edit" />
        <ellipsis-outlined key="ellipsis" />
      </template> -->
      <a-card-meta title="Card title" description="This is the description">
        <template #avatar>
          <!-- <a-avatar src="https://joeschmoe.io/api/v1/random" /> -->
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<style></style>
