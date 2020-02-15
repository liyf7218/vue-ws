<template>
<section>
  <div id="orgChart"></div>
</section>
</template>

<script>
export default {
  data() {
    return {
      chart: '',
      nodesData: [{
          id: "1",
          name: "Jack Hill",
          title: "Chairman and CEO",
          email: "amber@domain.com",
          img: "https://balkangraph.com/js/img/1.jpg",
          tags: ["Management"]
        },
        {
          id: "2",
          pid: "1",
          name: "Lexie Cole",
          title: "QA Lead",
          email: "ava@domain.com",
          img: "https://balkangraph.com/js/img/2.jpg",
          tags: ["IT"]
        },
        {
          id: "3",
          pid: "1",
          name: "Janae Barrett",
          title: "Technical Director",
          img: "https://balkangraph.com/js/img/3.jpg",
          tags: ["IT"]
        },
        {
          id: "4",
          pid: "1",
          name: "Aaliyah Webb",
          title: "Manager",
          email: "jay@domain.com",
          img: "https://balkangraph.com/js/img/4.jpg",
          tags: ["IT"]
        },
        {
          id: "5",
          pid: "2",
          name: "Elliot Ross",
          title: "QA",
          img: "https://balkangraph.com/js/img/5.jpg"
        },
        {
          id: "6",
          pid: "2",
          name: "Anahi Gordon",
          title: "QA",
          img: "https://balkangraph.com/js/img/6.jpg"
        },
        {
          id: "7",
          pid: "2",
          name: "Knox Macias",
          title: "QA",
          img: "https://balkangraph.com/js/img/7.jpg"
        },
        {
          id: "8",
          pid: "3",
          name: "Nash Ingram",
          title: ".NET Team Lead",
          email: "kohen@domain.com",
          img: "https://balkangraph.com/js/img/8.jpg"
        },
        {
          id: "9",
          pid: "3",
          name: "Sage Barnett",
          title: "JS Team Lead",
          img: "https://balkangraph.com/js/img/9.jpg"
        },
        {
          id: "10",
          pid: "8",
          name: "Alice Gray",
          title: "Programmer",
          img: "https://balkangraph.com/js/img/10.jpg"
        },
        {
          id: "11",
          pid: "8",
          name: "Anne Ewing",
          title: "Programmer",
          img: "https://balkangraph.com/js/img/11.jpg"
        },
        {
          id: "12",
          pid: "9",
          name: "Reuben Mcleod",
          title: "Programmer",
          img: "https://balkangraph.com/js/img/12.jpg"
        },
        {
          id: "13",
          pid: "9",
          name: "Ariel Wiley",
          title: "Programmer",
          img: "https://balkangraph.com/js/img/13.jpg"
        },
        {
          id: "14",
          pid: "4",
          name: "Lucas West",
          title: "Marketer",
          img: "https://balkangraph.com/js/img/14.jpg"
        },
        {
          id: "15",
          pid: "4",
          name: "Adan Travis",
          title: "Designer",
          img: "https://balkangraph.com/js/img/15.jpg"
        },
        {
          id: "16",
          pid: "4",
          name: "Alex Snider",
          title: "Sales Manager",
          img: "https://balkangraph.com/js/img/16.jpg"
        }
      ],
    };
  },
  methods: {
    init() {
      // set org-chart options
      OrgChart.toolbarUI.expandAllIcon = '<i class="toolbar-ui-icon el-icon-rank"></i>';
      OrgChart.toolbarUI.fitIcon = '<i class="toolbar-ui-icon el-icon-full-screen"></i>';
      OrgChart.toolbarUI.zoomInIcon = '<i class="toolbar-ui-icon el-icon-zoom-in"></i>';
      OrgChart.toolbarUI.zoomOutIcon = '<i class="toolbar-ui-icon el-icon-zoom-out"></i>';
      OrgChart.toolbarUI.layoutIcon = '<i class="toolbar-ui-icon el-icon-upload2"></i>';
      OrgChart.templates.polina.field_number_children = '<circle cx="60" cy="110" r="15" fill="#F57C00"></circle><text fill="#ffffff" x="60" y="115" text-anchor="middle">{val}</text>';

      let nodesData = this.formatNodesData();

      // init org-chart
      this.chart = new OrgChart(document.getElementById("orgChart"), {
        template: "polina",
        lazyLoading: true,
        layout: OrgChart.treeRightOffset,
        mouseScrool: OrgChart.action.zoom,
        // 点击节点, 单击时编辑,双击时切换展开收敛 --> 其中双击会出发两次单击,这个就很难受了
        // nodeMouseClick: OrgChart.action.expandCollapse,
        nodeMouseClick: OrgChart.action.none,
        nodeMouseDbClick: OrgChart.action.edit,
        collapse: {
          level: 3,
          allChildren: true
        },
        enableSearch: true,
        enableDragDrop: true,
        toolbar: {
          layout: true,
          zoom: true,
          fit: true,
          expandAll: true
        },
        menu: {
          pdf: {
            text: "Export PDF"
          },
          png: {
            text: "Export PNG"
          },
          svg: {
            text: "Export SVG"
          },
          csv: {
            text: "Export CSV"
          }
        },
        nodeMenu: {
          // details: {
          //   text: "Details"
          // },
          // edit: {
          //   text: "Edit"
          // },
          add: {
            text: "Add"
          },
          remove: {
            text: "Remove"
          }
        },
        tags: {
          "Management": {
            template: "rony"
          },
          "Marketing Manager": {
            template: "polina"
          },
          "IT Manager": {
            template: "ana"
          },
          "IT": {
            template: "ula"
          },
          "Marketing": {
            template: "belinda"
          }
        },
        nodeBinding: {
          field_0: "name",
          field_1: "title",
          img_0: "img"
        },
        nodes: nodesData,
      });

    },
    childCount(id) {
      let count = 0;
      for (var i = 0; i < this.nodesData.length; i++) {
        if (this.nodesData[i].pid == id) {
          count++;
          count += this.childCount(this.nodesData[i].id);
        }
      }
      return count;
    },
    formatNodesData(nodesData = this.nodesData) {
      return this.nodesData.map(ele => ({
        ...ele,
        field_number_children: this.childCount(ele.id)
      }))
    },

  },
  mounted() {
    this.init();
  }
}
</script>

<style>
#orgChart {
  width: 100%;
  height: 940px;
  position: relative;
}

#orgChart>svg {
  background-color: #eee;
  border: 2px solid lightgrey;
  border-radius: 10px;
  width: 99%;
  height: 935px;
}

#orgChart .bg-toolbar-container .toolbar-ui-icon {
  font-size: 25px;
  margin: 5px 0;
}
</style>
