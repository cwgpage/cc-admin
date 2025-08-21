/** 读取文件 */
async function readJsonFile() {
  try {
    // 选择文件
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] },
        },
      ],
      multiple: false,
    })

    // 获取文件内容
    const file = await fileHandle.getFile()
    const content = await file.text()
    const jsonData = JSON.parse(content)
    return { fileHandle, jsonData }
  } catch (error) {
    console.error(error)
  }
}

async function writeJsonFile(fileHandle: any, data: any) {
  // 创建可写流
  const writable = await fileHandle.createWritable()
  // 写入字符串化后的 JSON
  await writable.write(JSON.stringify(data, null, 2))
  // 关闭流（保存更改）
  await writable.close()
}

/** 处理文件 */
export async function handleJsonFile(data: any) {
  // 读取
  const { fileHandle } = await readJsonFile()
  // const jsonDataNew = JSON.stringify(data)
  // 写回原文件
  await writeJsonFile(fileHandle, data)
}
