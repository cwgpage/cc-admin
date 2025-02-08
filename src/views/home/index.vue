<script setup lang="ts">
// 美化打印实现方法
function prettyLog() {
  const isEmpty = (value: any) => {
    return value == null || false || value === ''
  }
  const prettyPrint = (title: string, text: string, color: string) => {
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      'background:transparent',
    )
  }
  // 基础信息打印
  const info = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, '#909399')
  }

  const error = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, '#F56C6C')
  }

  const success = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, '#26df44')
  }

  return {
    info,
    error,
    success,
  }
}

// 创建打印对象
const log = prettyLog()
log.error('这是基础信息!')
log.success('这是基础信息!')
</script>

<template>
  <div>
    <a-space wrap>
      <a-button type="primary">
        Primary Button
      </a-button>
      <a-button>Default Button</a-button>
      <a-button type="dashed">
        Dashed Button
      </a-button>
      <a-button type="text">
        Text Button
      </a-button>
      <a-button type="link">
        Link Button
      </a-button>
    </a-space>
  </div>
</template>

<style scoped lang="scss"></style>
