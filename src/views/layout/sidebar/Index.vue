<template>
	<el-menu router :unique-opened="true" class="sidebar-menu-entire" text-color="#666">
		<SidebarItem v-for="item in sibarItems" :key="item.path" :item="item"></SidebarItem>
	</el-menu>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
	components: { SidebarItem },
	data() {
		return {
			sibarItems: []
		};
	},
	methods: {
		getRouterList() {
			let routes = this.$router.options.routes;
			let sibarItems = [];
			routes.forEach(item => {
				if (item.meta) {
					sibarItems.push(item);
				}
			});
			this.sibarItems = sibarItems;
		}
	},
	mounted() {
		this.getRouterList();
	}
};
</script>