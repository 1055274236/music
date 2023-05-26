<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { useDebounceFn, useMouseInElement } from '@vueuse/core'
import {
  Search,
  CloseBold,
  SemiSelect,
  FullScreen,
  Setting,
  CopyDocument,
  ArrowLeftBold,
  ArrowRightBold
} from '@element-plus/icons-vue'
import SongApi from '@renderer/api/SongApi'
import { SmartBoxBase } from '@renderer/api/type'
import { useRouter } from 'vue-router'

const router = useRouter()

interface DataType {
  keyword: string
  isMax: boolean
  isFocus: boolean
  smartbox: SmartBoxBase[]
}

const data: DataType = reactive({
  keyword: '',
  isMax: false,
  isFocus: false,
  smartbox: []
})

onMounted(() => {
  window.electron.ipcRenderer.on('mainWindow:changeimize', (_, state: 'max' | 'unMax') => {
    data.isMax = state === 'max'
  })
})

const close = (): void => {
  window.app.quit()
}
const maxsize = (): void => {
  window.app.maximize()
}
const minisize = (): void => {
  window.app.minimize()
}

const getSmartbox = useDebounceFn(async () => {
  const _smartbox: SmartBoxBase[] = []
  const result = await SongApi.getSmartbox(data.keyword)
  for (const item in result.data) {
    _smartbox.push(result.data[item])
  }
  _smartbox.sort((a, b): number => {
    return a.order - b.order
  })
  data.smartbox = _smartbox
}, 300)

const searchClick = (): void => {
  router.push({ path: `/searchresult/${data.keyword}` })
}

const autocomplete_box = ref(null)
const { isOutside } = useMouseInElement(autocomplete_box)

const goHistory = (n: number): void => {
  window.history.go(n)
}
</script>

<template>
  <div id="main-top">
    <div class="box-left">
      <div class="route-option">
        <el-icon @click="goHistory(-1)">
          <ArrowLeftBold />
        </el-icon>
        <el-icon @click="goHistory(1)">
          <ArrowRightBold />
        </el-icon>
      </div>
      <el-input
        v-model="data.keyword"
        :class="['search-input', { 'is-focus': data.isFocus }]"
        placeholder="请输入关键字"
        @focus="() => (data.isFocus = true)"
        @blur="() => (data.isFocus = false)"
        @input="() => data.isFocus && data.keyword && getSmartbox()"
        @keyup.enter="searchClick"
      >
        <template #prefix>
          <el-icon class="search-input-icon" @click="searchClick"><Search /></el-icon>
        </template>
      </el-input>
      <transition :name="'fade'">
        <div
          v-show="(data.isFocus || !isOutside) && data.keyword.length > 0"
          id="autocomplete-box"
          ref="autocomplete_box"
        >
          <div v-if="data.smartbox.length > 0">
            <div
              v-for="(typeItem, typeIndex) in data.smartbox"
              :key="typeIndex"
              class="autocomplete-type"
            >
              <div v-if="typeItem.name !== 'MV'">
                <div class="type-label">
                  {{ typeItem.name }}
                </div>
                <div class="type-list">
                  <div
                    v-for="(listItem, listIndex) in typeItem.itemlist"
                    :key="listIndex"
                    class="list-item"
                    @click=";(data.keyword = listItem.name) && searchClick()"
                  >
                    <div class="item-name">
                      {{ listItem.name }}
                    </div>
                    <div v-if="typeItem.name !== '歌手'" class="item-singer">
                      {{ listItem.singer }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <el-empty :image-size="100" />
          </div>
        </div>
      </transition>
    </div>
    <div class="box-right">
      <el-icon>
        <Setting />
      </el-icon>
      <el-icon @click="minisize">
        <SemiSelect />
      </el-icon>
      <el-icon @click="maxsize">
        <CopyDocument v-if="data.isMax" />
        <FullScreen v-else />
      </el-icon>
      <el-icon @click="close">
        <CloseBold />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main-top {
  -webkit-app-region: drag;
  background-color: var(--theme-color);
  height: var(--el-header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  & > * {
    -webkit-app-region: no-drag;
  }
  .box-left {
    display: flex;
    align-items: center;
    .route-option {
      color: #fff;
      margin-right: 10px;
      & > * {
        margin: 0 5px;
        width: 20px;
        height: 20px;
        font-size: 15px;
        border-radius: 50%;
        background-color: #f4f4f480;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: var(--transition);
        }
        &:hover {
          &::after {
            opacity: 0.3;
            background-color: gray;
          }
        }
      }
    }
    .search-input {
      width: 160px;
      transition: var(--transition);
      opacity: 0.5;

      &.is-focus {
        width: 260px;
        opacity: 1;
      }
      .search-input-icon {
        cursor: pointer;
      }
    }
    #autocomplete-box {
      z-index: 10;
      border-radius: 5px;
      box-shadow: var(--el-box-shadow-lighter);
      background-color: #fff;
      width: 400px;
      max-height: 300px;
      max-height: 300px;
      position: fixed;
      top: 50px;
      left: 30px;
      overflow-y: auto;
      .autocomplete-type {
        padding: 5px;
        .type-label {
          font-size: 14px;
        }
        .type-list {
          padding: 5px;
          .list-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 3px;
            background-color: transparent;
            border-radius: 5px;

            cursor: pointer;
            transition: var(--transition);
            & > * {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .item-singer {
              min-width: 100px;
              text-align: right;
            }
            &:hover {
              background-color: var(--el-menu-hover-bg-color);
            }
          }
        }
      }
    }
  }

  .box-right {
    display: flex;
    align-items: center;
    > * {
      cursor: pointer;
      color: #fff;
      margin: 0 5px;
      font-size: 20px;
    }
  }
}
</style>

<style lang="scss">
.search-input {
  .el-input__wrapper {
    border-radius: 20px;
  }
}
</style>
