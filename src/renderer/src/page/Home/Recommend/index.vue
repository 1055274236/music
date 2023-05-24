<script lang="ts" setup>
import SongApi from '@renderer/api/SongApi'
import { GetRecommend } from '@renderer/api/type/getRecommend'
import { reactive, onMounted } from 'vue'

interface DataType {
  recommend?: GetRecommend
}

const data: DataType = reactive({})
onMounted(() => {
  getMessage()
})

const getMessage = (): void => {
  SongApi.getRecommend().then((result) => {
    console.log(result)
    data.recommend = result
    // 专辑筛选
    if (data.recommend) {
      data.recommend.focus.data.content = data.recommend.focus.data.content.filter(
        (item) => item.type === 10002
      )
    }
  })
}
const optimizeLikeNum = (likenum: number): string => {
  return likenum > 100000
    ? likenum > 100000000
      ? `${Math.ceil(likenum / 100000000)}亿`
      : `${Math.ceil(likenum / 10000)}万`
    : `${likenum}`
}
</script>

<template>
  <div id="recommend">
    <!-- 10002跳转到专辑界面 -->
    <div class="carousel">
      <el-carousel trigger="click" indicator-position="outside">
        <el-carousel-item v-for="item in data.recommend?.focus.data.content" :key="item.id">
          <img :src="item.pic_info.url" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="songlist">
      <div class="recommend-block-label">官方歌单</div>
      <div class="songlist-details">
        <RouterLink
          v-for="item in data.recommend?.recomPlaylist.data.v_hot"
          :key="item.content_id"
          class="songlist-item"
          :to="`/songlistdetails/${item.content_id}`"
        >
          <div class="songlist-item-box">
            <div class="item-img-box">
              <img :src="item.cover" :alt="item.title" />
              <div class="img-shade">
                <div class="img-shade-bottom">
                  <div class="listennum">{{ optimizeLikeNum(item.listen_num) }}</div>
                  <div class="icon-play"><Play /></div>
                </div>
              </div>
            </div>
            <div class="item-details-box"></div>
            <div class="item-details-label">{{ item.title }}</div>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="songlist">
      <div class="recommend-block-label">推荐歌单</div>
      <div class="songlist-details">
        <RouterLink
          v-for="item in data.recommend?.playlist.data.v_playlist"
          :key="item.tid"
          class="songlist-item"
          :to="`/songlistdetails/${item.tid}`"
        >
          <div class="songlist-item-box">
            <div class="item-img-box">
              <img :src="item.cover_url_big" :alt="item.title" />
              <div class="img-shade">
                <div class="img-shade-bottom">
                  <div class="listennum">{{ optimizeLikeNum(item.access_num) }}</div>
                  <div class="icon-play"><Play /></div>
                </div>
              </div>
            </div>
            <div class="item-details-box"></div>
            <div class="item-details-label">{{ item.title }}</div>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="rankingline">
      <div class="recommend-block-label">排行榜</div>
      <div class="rankingline-group-block">
        <div
          v-for="rankingGroup in data.recommend?.toplist.data.group"
          :key="rankingGroup.groupId"
          class="ranking-group"
        >
          <div class="ranking-label ranking-group-label">{{ rankingGroup.groupName }}</div>
          <div class="ranking-group-content">
            <div
              v-for="rankingItem in rankingGroup.toplist"
              :key="rankingItem.topId"
              class="ranking-item"
            >
              <div class="ranking-label ranking-item-label">{{ rankingItem.title }}</div>
              <div class="ranking-item-content">
                <div
                  v-for="rankingSong in rankingItem.song"
                  :key="rankingSong.songId"
                  class="ranking-song"
                >
                  <div class="ranking-song-cover">
                    <img :src="rankingSong.cover" alt="" />
                  </div>
                  <div class="ranking-song-title">
                    {{ rankingSong.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#recommend {
  .recommend-block-label {
    user-select: none;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .carousel {
    img {
      height: 100%;
      width: 100%;
    }
  }

  .songlist {
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
  }
  .rankingline {
    padding: 5px;
    .rankingline-group-block {
      .ranking-group {
        border-radius: 5px;
        margin: 16px 0;
        padding: 5px;
        box-shadow: var(--el-box-shadow-lighter);
        background-color: #f4f4f4;

        .ranking-label {
          width: 100%;
          text-align: center;
          font-weight: 600;
        }

        .ranking-group-content {
          display: flex;
          flex-wrap: wrap;

          .ranking-item {
            width: calc(33% - 20px);
            margin: 5px;
            padding: 5px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: var(--el-box-shadow-lighter);

            .ranking-item-content {
              .ranking-song {
                display: flex;
                align-items: flex-start;
                margin: 5px 0 5px 0;
                cursor: pointer;
                transform: scale(1);
                transition: all 0.5s ease;

                &:hover {
                  transform: scale(1.05);
                  // .ranking-song-title {
                  //   font-size: 18px;
                  //   font-weight: 600;
                  // }
                }
                .ranking-song-cover {
                  width: 60px;
                  height: 60px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .ranking-song-title {
                  flex: 1;
                  display: -webkit-box;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  font-size: 16px;
                  font-weight: 500;
                  transition: all 0.3s ease;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
