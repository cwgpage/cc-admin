<script lang="ts" setup>
import type { IFindAppDetaildsBySeriesId, IRandomPage } from '@/server/api/qwcw'
import { computed, ref } from 'vue'
import { findAllDetails, findAppDetaildsBySeriesId, randomPage } from '@/server/api/qwcw'
import { useQwcwStore } from '@/stores/box/qwcw'
import { customLog } from '@/utils/utils'
import { useIntervalFn } from '@vueuse/core'

const { qwcwBoxOption, checkBoxIds } = useQwcwStore()

const currentCheckBoxId = computed(() => checkBoxIds.value[0])

const currentBoxInfo = ref({
  id: 0,
  seriesName: '',
  coverImg: '',
})

/** 获取盒子商品信息 */
async function getBoxGoodsInfo() {
  const params: IFindAppDetaildsBySeriesId = {
    seriesId: currentCheckBoxId.value,
  }
  const [err, res] = await findAppDetaildsBySeriesId(params)
  if (err) return
  qwcwBoxOption.value.boxGoodsList = res.detailsList.map(item => ({
    id: item.id,
    boxImg: item.boxImg,
    ductName: item.ductName,
    boxSeriesId: item.boxSeriesId,
  }))

  currentBoxInfo.value = res
}

/** 随机获取盒子page */
async function getRandomPage() {
  const data: IRandomPage = {
    page: '',
    seriesId: currentBoxInfo.value.id,
  }
  const [err, res] = await randomPage(data)
  if (err) throw new Error('获取盒子page失败')
  if (err) return customLog.error(`系列：${currentBoxInfo.value.id}===>获取盒子page失败`)

  return res
}

/** 获取盒子 */
async function getBox() {
  const page = await getRandomPage()
  const [err, res] = await findAllDetails({ page, seriesId: currentBoxInfo.value.id })
  if (err) return customLog.error(`系列：${currentBoxInfo.value.id}；page：${page}===>获取抽盒失败`)
  checkBox(res, page)
}

/** 检测盒子 */
function checkBox(goodsBox: { list: any[], pageCode: string }, page: string = '') {
  // 先查看盒子书否检测过， 检测过就返回
  if (qwcwBoxOption.value.checkedListIds.includes(goodsBox.pageCode)) {
    console.log(`《${currentBoxInfo.value.seriesName}》系列，${goodsBox.pageCode} 盒子已检测`)
    return
  }
  // 没有检测过就检测
  const noHideList = qwcwBoxOption.value.boxGoodsList.filter(item => item.id && !item.ductName.includes('隐藏'))
  const noHideIds = noHideList.map(item => item.id)
  const hideIndex = goodsBox.list.findIndex(item => !noHideIds.includes(item.detailsId))
  if (hideIndex !== -1) {
    /** 有隐藏商品 */
    console.log(`=========《${currentBoxInfo.value.seriesName}》系列有隐藏=========`)
    customLog.success(currentBoxInfo.value.seriesName, '有隐藏商品')
    customLog.success(`seriesId：`, `${currentBoxInfo.value.id}`)
    customLog.success(`page：`, `${page}`)
    customLog.success(`盒子ID：`, `${goodsBox.pageCode}`)
    customLog.success(`盒子位置：`, `${hideIndex + 1}`)
    console.log('==============================')
    const newList1 = goodsBox.list.map(item => ({
      detailsId: item.detailsId, 
      isSold: item.isSold, 
      page: item.page,
      seriesId: item.seriesId,
    }))
    const targetBox = {
      pageCode: goodsBox.pageCode,
      list: newList1,
    }
    // 记录有隐藏商品的盒子
    qwcwBoxOption.value.hideBoxList.push({targetBox})
  } else {
    /** 没有隐藏商品 */
    console.log(`《${currentBoxInfo.value.seriesName}》系列，${goodsBox.pageCode} 盒子没有隐藏`);
  }
  // 记录检测过的盒子
  qwcwBoxOption.value.checkedListIds.push(goodsBox.pageCode)
}

// 检测盒子定时器
const checkBoxInterval = useIntervalFn(async () => {
  await getBox()
}, 1000)
checkBoxInterval.pause()

function changeInterval() {
  if (checkBoxInterval.isActive.value) {
    checkBoxInterval.pause()
  } else {
    checkBoxInterval.resume()
  }
}

async function pageCreated() {
  await getBoxGoodsInfo()
  
}
pageCreated()
</script>

<template>
  <div class="draw-box-page">
    <div class="box-content">
      <a-card class="box-goods-item" v-for="item in qwcwBoxOption.boxGoodsList" :key="item.id" hoverable style="width: 150px">
        <template #cover>
          <img alt="example" :src="item.boxImg">
        </template>
        <a-card-meta :title="item.ductName" :description="item.id" />
      </a-card>
    </div>
    <div class="mt-20px">
      <a-button type="primary" @click="changeInterval">{{ checkBoxInterval.isActive.value ? '停止检测' : '开始检测' }}</a-button>
    </div>
    <div class="hide-box-list-wrap">
      <a-card v-for="item in qwcwBoxOption.hideBoxList" :key="item.pageCode" hoverable style="width: 200px">
        <template #cover>
          <img alt="example" :src="currentBoxInfo.coverImg">
        </template>
        <a-card-meta :title="'盒子有隐藏'" :description="'是否已购买'" />
      </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.draw-box-page {
  @apply h-full p-10px box-border;
  :deep(.ant-card-body) {
    @apply px-10px py-15px;
  }
}
.box-content {
  @apply flex overflow-y-scroll gap-10px py-10px px-5px w-800px;
  .box-goods-item {
    flex-shrink: 0; /* 不允许收缩，宽度就会生效 */
  }
}
.hide-box-list-wrap {
  @apply flex flex-wrap gap-15px mt-20px;
}
</style>
