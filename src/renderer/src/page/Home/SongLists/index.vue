<script lang="ts" setup>
import SongListApi from '@renderer/api/SongListApi'
import {
  SongListCategoriesDataType,
  SongListCategoriesItem,
  SongListList,
  Allsort
} from '@renderer/api/type'
import { reactive, onMounted, ref, onBeforeUnmount } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { Play } from '@renderer/components/icon'

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
  activeName: number
  allsorts: Allsort[]
}

const data: DataType = reactive({
  songListType: { categories: [] },
  categoryId: 10000000,
  categoryName: '全部',
  typeShow: false,
  sortId: 1,
  songList: [],
  allsorts: [],
  activeName: 1,

  page: 1,
  total: 40,
  num: 40
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

  data.categoryName = data.songListType.categories[0].categoryName || '全部'
  data.categoryId = data.songListType.categories[0].categoryId || 10000000
  data.allsorts = [{ sortId: 1, sortName: '默认' }]
  const value = data.songListType.categories[0].items
  if (value && value[0] && value[0].allsorts instanceof Array)
    data.allsorts.push(...value[0].allsorts.filter((item) => item.sortId !== 1))
}

const getList = async (): Promise<void> => {
  const result = await SongListApi.getSongLists({
    sortId: data.sortId,
    categoryId: data.categoryId,
    limit: data.num - 1,
    offect: (data.page - 1) * data.num
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
    data.allsorts = [{ sortId: 1, sortName: '默认' }]
    if (item.allsorts instanceof Array)
      data.allsorts.push(...item.allsorts.filter((item) => item.sortId !== 1))
    data.activeName = 1
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

const optimizeLikeNum = (likenum: number): string => {
  return likenum > 100000
    ? likenum > 100000000
      ? `${Math.ceil(likenum / 100000000)}亿`
      : `${Math.ceil(likenum / 10000)}万`
    : `${likenum}`
}

const tableChange = (activeName: string): void => {
  data.sortId = parseInt(activeName)
  data.page = 1
  getList()
}

// const toSongList = (dissid: string): void => {
//   router.push(`/songlist/${dissid}`)
// }
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

    <el-tabs v-model="data.activeName" class="demo-tabs" @tab-change="tableChange">
      <el-tab-pane
        v-for="(item, index) in data.allsorts"
        :key="index"
        :label="item.sortName"
        :name="item.sortId"
        lazy
      ></el-tab-pane>
    </el-tabs>

    <!-- 歌单 -->
    <div class="songlist-details">
      <RouterLink
        v-for="item in data.songList"
        :key="item.dissid"
        class="songlist-item"
        :to="`/songlistdetails/${item.dissid}`"
      >
        <div class="songlist-item-box">
          <div class="item-img-box">
            <img :src="item.imgurl" :alt="item.dissname" />
            <div class="img-shade">
              <div class="img-shade-bottom">
                <div class="listennum">{{ optimizeLikeNum(item.listennum) }}</div>
                <div class="icon-play"><Play /></div>
              </div>
            </div>
          </div>
          <div class="item-details-box"></div>
          <div class="item-details-label">{{ item.dissname }}</div>
        </div>
      </RouterLink>
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
      height: 140px;
      position: relative;
      max-width: 140px;
      min-width: 120px;
      position: relative;
      margin: 0 10px 10px 0;

      .songlist-item-box {
        position: absolute;
        width: 100%;
        height: 140px;
        border-radius: 10px;
        // background-color: #c4c4c4;
        transition: all 0.5s ease;
        padding: 5px;
        overflow: hidden;
        cursor: pointer;
        z-index: 1;

        &:hover {
          height: 200px;
          z-index: 5;
          background-color: #c4c4c4;

          box-shadow: var(--el-box-shadow-dark);

          .img-shade {
            opacity: 1 !important;
          }
        }
        .item-img-box {
          width: 100%;
          height: 130px;
          position: relative;
          margin: 0 auto;

          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }

          .img-shade {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            background-color: #c4c4c480;
            opacity: 0;
            transition: opacity 0.5s ease;
            user-select: none;

            .img-shade-bottom {
              width: calc(100% - 10px);
              position: absolute;
              bottom: 0;

              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0 5px;
              .listennum {
                color: white;
                font-weight: 600;
              }

              .icon-play {
                font-size: 30px;
                color: var(--theme-color);
              }
            }
          }
        }

        .item-details-label {
          margin-top: 20px;
          color: black;

          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
