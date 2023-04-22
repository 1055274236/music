<script lang="ts" setup>
import SongListApi from '@renderer/api/SongListApi'
import {
  SongListCategoriesDataType,
  SongListCategoriesItem,
  SongListList
} from '@renderer/api/type'
import { reactive, onMounted, ref, onBeforeUnmount } from 'vue'
import { useMouseInElement } from '@vueuse/core'

interface DataType {
  songListType: SongListCategoriesDataType
  categoryId: number
  categoryName: string
  typeShow: boolean
  sortId: number
  page: number
  total: number
  songList: SongListList[]
  num: number
}

const data: DataType = reactive({
  songListType: { categories: [] },
  categoryId: 10000000,
  categoryName: '全部',
  typeShow: false,
  sortId: 1,
  songList: [],

  page: 1,
  total: 20,
  num: 20
})
const bigBox = ref<HTMLDivElement>()

onMounted(async () => {
  await getType()
  await getList()
  document.addEventListener('mouseup', closeType)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', closeType)
})

const getType = async (): Promise<void> => {
  const result = await SongListApi.getSongListCategories()
  data.songListType = result.data
}

const getList = async (): Promise<void> => {
  const result = await SongListApi.getSongLists({
    sortId: data.sortId,
    categoryId: data.categoryId,
    limit: 19,
    offect: (data.page - 1) * 20
  })

  data.songList = result.data.list
  data.total = result.data.sum
}

const { isOutside } = useMouseInElement(bigBox)
function closeType(): void {
  if (!isOutside.value || !data.typeShow) return
  data.typeShow && bigBox.value && (bigBox.value.style.height = getHeight() + 'px')
  setTimeout(() => {
    data.typeShow = false
    setTimeout(() => {
      !data.typeShow && bigBox.value && (bigBox.value.style.display = 'none')
    }, 500)
  })
}
const typeClick = (item: SongListCategoriesItem): void => {
  data.typeShow && bigBox.value && (bigBox.value.style.height = getHeight() + 'px')
  setTimeout(() => {
    data.typeShow = false
    data.categoryName = item.categoryName || '全部'
    data.categoryId = item.categoryId || 10000000
    data.page = 1
    getList()
    setTimeout(() => {
      !data.typeShow && bigBox.value && (bigBox.value.style.display = 'none')
    }, 500)
  })
}
const showType = (): void => {
  data.typeShow = true
  bigBox.value?.style.removeProperty('display')
  if (bigBox.value) {
    bigBox.value.style.height = getHeight() + 'px'
  }
  setTimeout(() => {
    data.typeShow && bigBox.value && bigBox.value.style.removeProperty('height')
  }, 500)
}
const getHeight = (): number => {
  let height = 0
  document.querySelectorAll('.big-type').forEach((item) => {
    height += item.clientHeight + 10
  })
  height > 28 && (height -= 28)
  return height
}
</script>

<template>
  <div id="songlist">
    <!-- 种类选择 -->
    <div class="songlist-type-box">
      <div class="type-box">
        <el-button
          :class="['select-type', { 'select-type-hide': data.typeShow }]"
          @click="showType"
        >
          {{ data.categoryName }}
        </el-button>
        <div ref="bigBox" :class="['big-box', { 'big-box-hide': !data.typeShow }]">
          <div
            v-for="(bigItem, bigIndex) in data.songListType.categories"
            :key="bigIndex"
            class="big-type"
          >
            <strong class="big-type-label">{{ bigItem.categoryGroupName }}</strong>

            <div class="big-type-details">
              <span
                v-for="smartItem in bigItem.items"
                :key="smartItem.categoryId"
                :class="[
                  'smart-type',
                  { 'smart-type-select': data.categoryId === smartItem.categoryId }
                ]"
                @click="typeClick(smartItem)"
              >
                {{ smartItem.categoryName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌单 -->
    <div class="songlist-details">
      <div v-for="item in data.songList" :key="item.dissid" class="songlist-item">
        <div class="songlist-item-box">
          <div class="item-img-box">
            <img :src="item.imgurl" :alt="item.dissname" />
          </div>
          <div class="item-details-box"></div>
          <div class="item-details-label">{{ item.dissname }}</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="data.page"
        :page-size="data.num"
        small
        background
        layout="prev, pager, next"
        :total="data.total"
        @update:current-page="getList"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#songlist {
  .type-box {
    user-select: none;
    position: relative;

    height: 40px;
    .select-type {
      position: absolute;

      &.select-type-hide {
        display: none;
      }
    }
    .big-box {
      position: absolute;
      width: 100%;
      overflow: auto;
      // height: 180px;
      transition: all 0.5s ease;
      box-shadow: var(--el-box-shadow);
      background-color: var(--theme-background-color);
      border-radius: 5px;
      z-index: 10;
      // padding: 10px;

      &.big-box-hide {
        height: 0 !important;
        box-shadow: none;
        overflow: hidden;
      }
      .big-type {
        display: flex;
        margin: 5px 16px;

        .big-type-label {
          margin-right: 10px;
          width: 60px;
        }
        .big-type-details {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
        }

        .smart-type {
          margin: 0 5px;
          cursor: pointer;

          &.smart-type-select {
            font-weight: 600;
            color: var(--theme-color);
          }
        }
      }
    }
  }

  .songlist-details {
    display: flex;
    flex-wrap: wrap;
    .songlist-item {
      flex: 1;
      height: 160px;
      position: relative;
      max-width: 200px;
      min-width: 160px;
      position: relative;
      margin: 10px 10px;

      .songlist-item-box {
        position: absolute;
        width: 100%;
        height: 160px;
        border-radius: 10px;
        // background-color: #c4c4c4;
        transition: all 0.5s ease;
        padding: 5px;
        overflow: hidden;
        cursor: pointer;
        z-index: 1;

        &:hover {
          height: 240px;
          z-index: 5;
          background-color: #c4c4c4;

          box-shadow: var(--el-box-shadow-dark);
        }
        .item-img-box {
          width: 100%;
          height: 160px;
          margin: 0 auto;

          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }

        .item-details-label {
          margin-top: 20px;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
        }
      }
    }
  }

  .pagination {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
  }
}
</style>
