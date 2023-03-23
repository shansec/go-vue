<!--<template>-->
<!--  <div class="home-container">首页</div>-->
<!--</template>-->

<!--<script setup></script>-->

<!--<style lang="scss" scoped>-->
<!--  .home-container {-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    padding: 16px;-->
<!--    box-sizing: border-box;-->
<!--    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;-->
<!--  }-->
<!--</style>-->
<template>
  <el-table ref="table" :data="getTableData[0]" style="width: 100%">
    <template v-for="item in getTableData[1]">
      <el-table-column
        :label="item.unit ? `${item.label}（${item.unit}）` : item.label"
        :prop="item.value"
        :header-align="item.headerAlign || 'center'"
        :min-width="item.minWidth || 80"
        :align="item.align || 'center'"
      >
        <template v-slot="scope">
          {{ tableFormatter(item.value, scope.row) }}
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        headerList: [
          {
            label: '班级',
            value: 'class',
            unit: '',
            headerAlign: 'center',
            minWidth: '110',
            align: 'center',
          },
          {
            label: '姓名',
            value: 'name',
            unit: '',
            headerAlign: 'center',
            minWidth: '80',
            align: 'center',
          },
          {
            label: '成绩',
            value: 'grade',
            unit: '分',
            headerAlign: 'center',
            minWidth: '90',
            align: 'center',
          },
        ],
        tableData: [
          {
            class: '九年级1班',
            name: '张三',
            grade: '80',
          },
          {
            class: '九年级2班',
            name: '李四',
            grade: '85',
          },
          {
            class: '九年级2班',
            name: '王二',
            grade: '99',
          },
          {
            class: '九年级3班',
            name: '麻子',
            grade: '113',
          },
        ],
      }
    },
    computed: {
      getTableData() {
        return this.fotmatterTableData(this.tableData, this.headerList)
      },
    },
    methods: {
      // 对 tableData 和 headerList 进行处理，关键代码
      fotmatterTableData(data, header) {
        let enddata = []
        let endheader = []
        header.forEach((item, index) => {
          if (index === 0) {
            endheader.push({
              label: header[index].label,
              value: 'mainIndex',
              unit: header[index].unit,
              headerAlign: header[index].headerAlign,
              minWidth: header[index].minWidth,
              align: header[index].align,
            })
            data.forEach((ele, idx) => {
              endheader.push({
                label: ele[header[index].value],
                value: `type${idx}`,
              })
            })
          } else {
            let obj = {
              mainIndex: header[index].label,
              unit: header[index].unit,
            }
            data.forEach((ele, ind) => {
              obj[`type${ind}`] = ele[header[index].value]
            })
            enddata.push(obj)
          }
        })
        return [enddata, endheader]
      },

      // 列表格式化
      tableFormatter(prop, row) {
        if (row[prop] || row[prop] == 0) {
          if (prop === 'mainIndex') {
            if (row.unit) {
              return `${row[prop]}（${row.unit}）`
            }
            return row[prop]
          }
          return row[prop]
        }
        return '--'
      },
    },
  }
</script>
