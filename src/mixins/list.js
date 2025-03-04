export default {
	data() {
		return {
			loading: true, //遮罩层
			disabled: true, //禁用状态
			ids: "", //多选id
			tableData: [], //表格数据
			total: 0, //列表总数
			listUrl: '', //列表地址,
			params: {},
			areaList: [],
			cityList: [],
			countryList: [],
			checkedList: [], //选中的对象
			state: false,
		}
	},
	methods: {
		initTableData(url, params) {
			this.params = params;
			this.listUrl = url;
			this.getTableData(params)
		},
		getTableData(params) { //获取表格数据
			this.loading = true;
			this.state = false;
			this.$http
				.post(this.listUrl, params)
				.then(res => {
					this.loading = false;
					if (res.code == '200') {
						if (res.totalCount != undefined) {
							this.total = res.totalCount;
						}
						this.tableData = res.body;
						this.state = true;
					} else {
						this.tableData = [];
						this.state = true;
					}
				})
				.catch(error => {
					this.loading = false;
					this.state = false;
				});
		},
		//获取所有地区数据
		getAreaData() {
			let areaObj = JSON.parse(this.getSessionStorage('areaObj'));
			let areaData = JSON.parse(this.getSessionStorage('areaData'));

			if (!areaObj || !areaData) {
				this.$http.post(this.$api.areaData)
					.then(res => {
						if (res.code == '200') {
							let areaList = res.body;
							let obj = areaList.reduce((coll, item) => {
								let key = item.areaId;
								coll[key] = item;
								return coll;
							}, {})
							this.areaList = this.getAreaTree(areaList, this.areaRootId);
							this.setSessionStorage('areaData', this.areaList);
							this.setSessionStorage('areaObj', obj);
						}
					})
					.catch(error => {});
			} else {
				this.areaList = areaData;
			}
		},
		// 递归处理地区树状结构
		getAreaTree(array, pid) {
			const newArray = array.reduce((coll, item) => {
				if (item.pid == pid) {
					item.child = this.getAreaTree(array, item.areaId)
					coll.push(item);
				}
				return coll;
			}, [])
			return newArray
		},
		//获取地区ids
		getAreaList(id, areaData) {
			if (!areaData) {
				areaData = JSON.parse(this.getSessionStorage('areaData'));
			}
			let arr = areaData.filter(item => {
				return item.areaId == id;
			})
			return arr[0].child;
		},
		chooseProvince(index) {
			this.cityList = this.areaList[index].child;
		},
		chooseCity(index) {
			this.countryList = this.cityList[index].child;
		},
		getPages(pageNo, pageSize) {
			//获取翻页数据
			this.params.pageNo = pageNo;
			this.params.pageSize = pageSize;
			this.getTableData(this.params);
		},
		query() { //条件查询
			this.getTableData(this.params);
		},
		checkIds(val) {
			let ids = [];
			for (let i in val) {
				ids.push(val[i].id);
			}
			this.ids = ids.join(",");
			this.disabled = val.length > 0 ? false : true;
			this.checkedList = val;
		},
		deleteBatch(url, ids) { //删除
			this.$confirm('是否确定删除？', '警告', {
					type: "error"
				})
				.then(mes => {
					this.$http.post(url, {
						ids: ids
					}).then(res => {
						if (res.code == "200") {
							this.$successMessage('删除成功');
							this.getTableData(this.params);
						}
					});
				})
				.catch(error => {});
		},
		removeBatch(url, roleId, ids) { //移除
			this.$confirm('确定移除吗？', '提示', {
					type: "error"
				})
				.then(mes => {
					this.$http.post(url, {
						roleId: roleId,
						userIds: ids
					}).then(res => {
						if (res.code == "200") {
							this.$successMessage('移除成功');
							this.getTableData(this.params);
						}
					});
				})
				.catch(error => {});
		},
		priorityBatch(url, ids, priorities, regDefId) { //保存排列循序
			this.$confirm('是否保存排列顺序', '提示', {
					type: "warning"
				})
				.then(mes => {
					this.$http.post(url, {
						ids: ids,
						priorities: priorities,
						regDefId: regDefId
					}).then(res => {
						if (res.code == "200") {
							this.$successMessage('操作成功');
							this.getTableData(this.params);
						}
					});
				})
				.catch(error => {});
		},
		prioritysBatchs(url, ids, priorities, disableds, regDefId) { //保存排列循序四个参数
			this.$confirm('是否保存排序？', '提示', {
					type: "warning"
				})
				.then(mes => {
					this.$http.post(url, {
						ids: ids,
						priorities: priorities,
						disableds: disableds,
						defId: regDefId
					}).then(res => {
						if (res.code == "200") {
							this.$successMessage('操作成功');
							this.getTableData(this.params);
						}
					});
				})
				.catch(error => {});
		},
		prioritysBatch(url, ids, priorities) { //保存排列
			this.$confirm('是否保存排序？', '提示', {
					type: "warning"
				})
				.then(mes => {
					this.$http.post(url, {
						ids: ids,
						priorities: priorities
					}).then(res => {
						if (res.code == "200") {
							this.$successMessage('保存成功');
							this.getTableData(this.params);
						}
					});
				})
				.catch(error => {});
		},
		revertBatch(url, ids) { //批量还原
			this.$confirm('是否确定还原？', '提示', {
					type: "warning"
				})
				.then(mes => {
					this.$http.post(url, {
						ids: ids
					}).then(res => {
						if (res.code == "200") {
							this.$successMessage('还原成功');
							this.getTableData(this.params);
						}
					});
				})
				.catch(error => {});
		},
		reviewBatch(url, ids) { //批量审核
			this.$confirm('是否批量审核', '提示', {
					type: "warning"
				})
				.then(mes => {
					this.$http.post(url, {
						ids: ids
					}).then(res => {
						if (res.code == "200") {
							this.$successMessage('审核成功!');
							setTimeout(() => {
								this.getTableData(this.params);
							}, 800);
						}
					});
				})
				.catch(error => {});
		},
		operationBatch(url, params, str = '操作成功!') {
			this.loading = true;
			this.state = false;
			this.$http.post(url, params).then(res => {
				if (res.code == '200') {
					this.$successMessage(str);
					setTimeout(() => {
						this.getTableData(this.params);
						this.loading = false;
						this.state = true;
					}, 800);
				} else {
					this.$errorMessage(res.message)
					this.loading = false;
					this.state = true;
				}
			}).catch(err => {});
		},
	},
	created() {
		if (this.areaList.length == 0) {
			this.getAreaData();
		}
	}
}
