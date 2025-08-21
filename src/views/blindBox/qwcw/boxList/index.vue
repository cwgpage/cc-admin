<script lang="ts" setup>
import { ref } from 'vue'
import { findAppBoxSeries, type IFindAppBoxSeries } from '@/api/qwcw'

import qwcwJson from '@/json/box/qwcw.json'
import { useQwcwStore } from '@/stores/box/qwcw'
import { handleJsonFile } from '@/utils/setFile'

const { qwcwUserList, qwcwFileInfo } = useQwcwStore()

const form = ref<IFindAppBoxSeries>({
  currentPage: 1,
  pageSize: 10,
  goodType: '',
  userId: 0,
})

interface IBoxList {
  id: number
  seriesName: string
  deliverDate: string
  price: number
  /** 系列展示图 */
  coverImg: string
}

/** 盒子列表 */
const boxList = ref<IBoxList[]>([])

/** 总数 */
const total = ref(0)

/** 获取盒子列表 */
async function getBoxList() {
  form.value.userId = qwcwUserList.value[0].userId
  const [err, res] = await findAppBoxSeries(form.value)
  if (err) return

  boxList.value = res.list
  total.value = res.total
}

function setFileClick() {
  handleJsonFile(qwcwJson)
}

async function pageCreated() {
  qwcwFileInfo.value = qwcwJson
  getBoxList()
}

pageCreated()
</script>

<template>
  <div class="box-list-wrap">
    <div class="box-content">
      <a-card v-for="item in boxList" :key="item.id" hoverable style="width: 200px" @click="setFileClick">
        <template #cover>
          <img alt="example" :src="item.coverImg">
        </template>
        <!-- <template #actions>
          <setting-outlined key="setting" />
          <edit-outlined key="edit" />
          <ellipsis-outlined key="ellipsis" />
        </template> -->
        <a-card-meta :title="item.seriesName">
          <template #description>
            <div class="flex justify-between text-(16px) font-bold">
              <span class="text-red">￥{{ item.price }}</span>
              <span>{{ item.id }}</span>
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-list-wrap {
  @apply w-full h-full p-20px;

  :deep(.ant-card-body) {
    @apply px-10px py-15px;
  }
}
.box-content {
  @apply flex flex-wrap gap-4;
}
</style>
