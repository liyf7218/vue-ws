import axios from "axios";
export default {
	data() {
		return {
			loading: true, //遮罩
			id: this.$route.query.id, //id
			type: this.$route.query.type, //操作类型
			dataInfo: {}, //基础表单信息
			form: this.$refs['form'] //
		}
	},
	methods: {
		/**
		 * 获取数据方法
		 * @param {number} id
		 * @param {object} obj
		 */
		getDataInfo(id, obj) {},
		/**
		 * @param {booealn} state 是否继续添加
		 * @param {string} url 添加方法的api地址
		 * @param {object} params 添加的参数
		 * @param {string} backUrl ，返回列表的路由地址
		 */
		saveDataInfo(state, url, params, backUrl) {
			let form = this.$refs['form'];
			form.validate((valid) => { //验证方法
				if (valid) {
					this.loading = true;
					axios.post(url, params)
						.then(res => {
							if (res.code == "200") {
								this.$successMessage('添加成功');
								if (state) {
									this.reset();
								} else {
									setTimeout(() => {
										this.routerLink(backUrl);
									}, 1000);
								}
							}
							this.loading = false;
						}).catch(error => {
							this.loading = false;
						})
				} else {
					this.$errorMessage("表单验证不通过,请检查 必填项 和 各数据的格式要求.");
					return false
				}
			})
		},
		updateDataInfo(url, params, backUrl) {
			let form = this.$refs['form'];
			form.validate((valid) => { //验证方法
				if (valid) {
					this.loading = true;
					axios.post(url, params)
						.then(res => {
							this.loading = false;
							if (res.code == "200") {
								this.$successMessage('修改成功');
								if (backUrl == '') {
									return false;
								} else {
									setTimeout(() => {
										this.routerLink(backUrl);
									}, 1000);
								}

							}
						}).catch(error => {
							this.loading = false;
						})
				} else {
					this.$errorMessage("表单验证不通过,请检查 必填项 和 各数据的格式要求.");
					return false
				}
			})
		},
		/**
		 *
		 * @param {string} type 判断添加还是修改 save，update
		 */
		isType(type) {
			return this.type == type ? true : false;
		},
		reset() {
      if(this.id && this.id != 0){
        this.getDataInfo(this.id);
      }else{
        this.$refs['form'].resetFields();
      }
		},
		validateForm(formRef = 'form') {
			let validatePass = false;
			let form = this.$refs[formRef];
			form.validate((valid) => { //验证方法
				validatePass = valid
				if (!valid) {
					this.$errorMessage('表单验证不通过,请检查 必填项 和 各数据的格式要求!');
				}
			});
			return validatePass;
		},
		clearFormValidate(formRef = 'form') {
			let form = this.$refs[formRef];
			form.clearValidate();
		}
	}

}
