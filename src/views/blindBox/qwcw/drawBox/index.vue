<script lang="ts" setup>
import { computed } from 'vue'
import { findAppDetaildsBySeriesId, type IFindAppDetaildsBySeriesId } from '@/server/api/qwcw'
import { useQwcwStore } from '@/stores/box/qwcw'

const { qwcwUserList, qwcwFileInfo } = useQwcwStore()

const userId = computed(() => {
  return qwcwUserList.value[0].userId
})

// const token = computed(() => {
//   return qwcwUserList.value[0].token
// })

/** 获取盒子商品信息 */
async function getBoxGoodsInfo() {
  const params: IFindAppDetaildsBySeriesId = {
    seriesId: 261,
  }
  const [err, res] = await findAppDetaildsBySeriesId(params)
  if (err) return
  qwcwFileInfo.value.boxGoodsList = res.detailsList.map(item => ({
    id: item.id,
    boxImg: item.boxImg,
    ductName: item.ductName,
    boxSeriesId: item.boxSeriesId,
  }))
}

async function pageCreated() {
  await getBoxGoodsInfo()
}
pageCreated()
</script>

<template>
  <div class="draw-box-page">
    <div class="box-content">
      <a-card v-for="item in qwcwFileInfo.boxGoodsList" :key="item.id" hoverable style="width: 150px">
        <template #cover>
          <img alt="example" :src="item.boxImg">
        </template>
        <a-card-meta :title="item.ductName" :description="item.id" />
      </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.draw-box-page {
  @apply w-full h-full p-10px overflow-y-scroll;
  :deep(.ant-card-body) {
    @apply px-10px py-15px;
  }
}
.box-content {
  @apply flex flex-wrap gap-5px;
}
</style>
