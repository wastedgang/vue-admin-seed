<template>
    <div class="table-warpper">
        <div class="block-content">
            <div class="upload-file">
                <div style="margin-right:15px;">{{fileName}}</div>
                <el-upload
                        action
                        :auto-upload="false"
                        :on-change="handleUpload"
                        :show-file-list="false"
                    >
                    <el-button type="primary">点击传表格</el-button>
                </el-upload>
                <el-button style="margin-left:15px;" type="primary" @click="addToUserList">添加到用户列表</el-button>
            </div>

            <div class="table-content">
                <el-table
                    :data="uploadList"
                    size="mini"
                    :header-cell-style="{color:'#333333',fontSize:'13px',fontWeight:'500'}"
                    :cell-style="{color:'#575757',fontSize:'13px',fontWeight:'400'}"
                    :height="tableHeight"
                    ref="tableContent"
                >
                    <!-- 表格内容 -->
                    <el-table-column
                        v-for="(item,index) in tableNav"
                        :key="index"
                        align="center"
                        :prop="item.prop"
                        :label="item.label"
                        show-overflow-tooltip
                    />
                    <!-- 表格操作 -->
                    <el-table-column align="center" prop="operation" label="操作" width="100%">
                        <template slot-scope="scope">
                            <button @click="editUserData(scope)" class="operate-btn-primary" style="margin-right:2px;">编辑</button>
                            <button class="operate-btn-danger" @click="removeUserData(scope)">移除</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        
        <my-dialog
			:title="dialogTitle"
			:content="dialogContent"
			:visable="isDialogVisable"
			@confirm="getRulesForm"
			@cancel="isDialogVisable = false"
		/>
    </div>
</template>

<script>
import { readFile, charActer, excelDate} from '../assets/libs/ultis'
import xlsx from 'xlsx'

export default {
    data() {
        return {
            listTotalcount: 0, //表单总条数
			pageSize: 10, //每一页表单数
			pageNo: 1, //当前页
			tableHeight: window.innerHeight - 180, // 表格高度
            //表头导航
			tableNav: [
				{ prop: "name", label: "姓名" },
				{ prop: "gender", label: "性别" },
				{ prop: "birthtime", label: "出生日期" },
				{ prop: "birthplace", label: "出生地" },
				{ prop: "career", label: "职业" },
				{ prop: "phone", label: "手机号码" }
            ],
            uploadList: [], //表格数据
            fileName:'',     //文件名称

            //弹窗
			isDialogVisable: false,
			dialogContent: [], //content参数{content,name,label,rules,placeholder}
            dialogTitle: "",
            excelDataId:'', //操作数据的ID数据
        }
    },
    methods: {
        async handleUpload(ev) {
            let file = ev.raw;
            if(!file) return;
            //读取数据变成json格式
            this.fileName = file.name;
            let data = await readFile(file);
            let workbook = xlsx.read(data,{ type: 'binary'});
            workbook = workbook.Sheets[workbook.SheetNames[0]];
            data = xlsx.utils.sheet_to_json(workbook)

            //处理数据，为数据添加name
            let arr = []
            data.forEach(item => {
                let obj = {};
                for(let key in charActer) {
                    if(!charActer.hasOwnProperty(key)) break;
                    let value = charActer[key]
                    let text = value.text, type = value.type
                    let prop = ''
                    if(text === '出生日期') {
                        prop = excelDate(item[text],'/') || '';
                    } else {
                        prop = item[text] || '';
                    }
                    type === 'string'?(prop = String(prop)):null;
                    obj[key] = prop
                }
                obj['id'] =  Date.now().toString(36);;
                arr.push(obj);
            });
            this.listTotalcount = arr.length
            this.uploadList = arr
        },

        //显示编辑数据
		editUserData(scope) {
            this.excelDataId = scope.row.id;
			let content = scope.row;
			let editContent = [
				{
					content: "",
					name: "name",
					label: "姓名",
					placeholder: "请输入姓名",
					rules: [
						{
							required: true,
							message: "请输入姓名",
							trigger: "blur"
						}
					]
				},
				{
					content: "",
					name: "gender",
					label: "性别",
					placeholder: "请输入性别",
					rules: [
						{
							required: true,
							message: "请输入性别",
							trigger: "blur"
						}
					]
				},
				{
					content: "",
					name: "birthtime",
					label: "出生日期",
					placeholder: "请输入出生日期"
				},
				{
					content: "",
					name: "birthplace",
					label: "出生地",
					placeholder: "请输入出生地"
				},
				{
					content: "",
					name: "phone",
					label: "手机号码",
					placeholder: "请输入手机号码"
				}
			];
			let keys = Object.keys(content);
			editContent.forEach(item => {
				keys.forEach(key => {
					if(item.name == key) {
						item.content = content[key];
					}
				})
			});
			this.isDialogVisable = true;
			this.dialogTitle = "编辑用户";
			this.dialogContent = editContent;
		},
		// 更新编辑后数据
		getRulesForm(data) {
            let uploadList = this.uploadList;
            let excelDataId = this.excelDataId;
            for(let i=0;i<uploadList.length;i++) {
                if(uploadList[i].id === excelDataId) {
                    uploadList[i] = Object.assign(uploadList[i],data);
                    break;
                }
            }
            this.uploadList = uploadList;
            this.isDialogVisable = false;
        },
        //删除数据
        async removeUserData(scope) {
            try {
                await this.$confirm('此操作将删除该条数据', {
                    confirmButtonText:'确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            }
            catch(err) { return }
            let id = scope.row.id;
            let uploadList = this.uploadList;
            for(let i=0;i<uploadList.length;i++) {
                if(uploadList[i].id === id) {
                    uploadList.splice(i,1);
                    break;
                }
            }
        },

        //添加到用户列表
        addToUserList() {
            this.$router.push({
                name:'Account',
                params: {
                    path: this.$route.path,
                    data: this.uploadList
                }
            })
        },
    }
}
</script>

<style scoped>
.upload-file {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    align-items: center;
}
</style>