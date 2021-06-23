<template>
  <div class="row">
    <q-list class="col-12">
      <q-item>
        <q-item-section avatar>
          <q-avatar size="48px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">
            {{ info[$lang].name }}
          </q-item-label>
          <q-item-label caption>
            {{ info[$lang].description }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item-label header class="text-primary text-bold row items-center q-gutter-x-sm text-h6">
        <q-icon name="label" />
        <div>
          {{ info[$lang].basicInfoTitle }}
        </div>
      </q-item-label>
      <div class="row q-pa-md q-col-gutter-md">
        <div v-for="({ icon, value }, i) in info[$lang].basicInfo" :key="i" class="col-xl-6 col-xs-12 row q-gutter-x-sm items-center">
          <q-icon :name="icon" />
          <div>
            {{ value }}
          </div>
        </div>
      </div>
      <q-item-label header class="text-primary text-bold row items-center q-gutter-x-sm text-h6">
        <q-icon name="label" />
        <div>
          {{ info[$lang].eduTitle }}
        </div>
      </q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label class="row q-col-gutter-y-md">
            <div class="col-12">
              <q-icon name="business" /> {{ info[$lang].universityName }}
            </div>
            <div class="col-12">
              <q-icon name="access_time" /> 2014-09 ~ 2018-07
            </div>
            <div class="col-12">
              <q-icon name="book" /> {{ info[$lang].major }}
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
       <q-item-label header class="text-primary text-bold row items-center q-gutter-x-sm text-h6">
        <q-icon name="label" />
        <div>
          {{ info[$lang].skillsCertificate }}
        </div>
      </q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label class="row q-gutter-y-sm">
            <div class="col-12">
              {{ info[$lang].computerCertificate }}
            </div>
            <div class="col-12">
              CET6
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item-label header class="text-primary text-bold row items-center q-gutter-x-sm text-h6">
        <q-icon name="label" />
        <div>
          {{ info[$lang].skillsTitle }}
        </div>
      </q-item-label>
      <div class="row q-col-gutter-y-md q-py-md">
        <div
          v-for="(item, i) in info[$lang].skills"
          :key="i"
          class="col-md-3 col-xs-4"
        >
          <div :class="['column', 'items-center', `text-${colors[i]}`]">
             <q-knob
              v-model="item.value"
              readonly
              track-color="grey-6"
              show-value
              size="70px"
              :thickness="0.22"
              :color="item.color"
              :class="[]"
            >
              {{ item.value }} %
            </q-knob>
            {{ item.label }}
          </div>
        </div>
      </div>

      <!-- 工作经历 -->
      <q-item-label header class="text-primary text-bold row items-center q-gutter-x-sm text-h6">
        <q-icon name="label" />
        <div>
          {{ info[$lang].workHistoriesTitle }}
        </div>
      </q-item-label>
      <div v-for="(w, i) in info[$lang].workHistories" :key="i" class="q-px-md q-pb-lg">
        <div class="row q-col-gutter-md items-center">
          <div class="text-h6">
            <q-icon name="business" /> {{ w.name }}
          </div>
          <div>
            <q-icon name="access_time" /> {{ w.duration }}
          </div>
          <div>
            <q-icon name="work" /> {{ w.jobTitle }}
          </div>
        </div>
        <q-separator />
        <ul>
          <li
            v-for="(p, j) in w.projects"
            :key="j"
            class="relative-position"
          >
            <b>{{ p.name }}</b> <br>
            <div class="text-grey-9 q-py-sm" v-html="p.description" />
            <div class="row q-gutter-sm q-pb-sm items-center">
              <q-chip v-for="(ts, k) in p.technologyStack" :key="k" :color="colors[k]" outline>
                {{ ts }}
              </q-chip>
            </div>
            <div class="row justify-end items-center">
              <span v-if="p.info" class="text-red-7">
                {{ p.info }}
              </span>
              <q-btn
                v-if="p.address"
                flat
                color="primary"
                icon-right="arrow_forward"
                label="点击访问"
                @click="openURL(p.address)"
              />
            </div>
          </li>
        </ul>
      </div>
    </q-list>
  </div>
</template>
<script>
import { openURL } from 'quasar'

export default {
  data: () => ({
    colors: ['purple-5', 'orange-5', 'primary', 'teal-5', 'brown-5', 'green-5', 'indigo-5', 'pink-5', 'red-5', 'grey-9', 'blue-5', 'cyan-5'],
    info: {
      'zh-CN': {
        name: '赵东升',
        description: '敢于创新，拥抱变化，爱学习新技术',
        basicInfoTitle: '基本信息',
        basicInfo: [
          { label: '职位', value: '前端开发工程师', icon: 'work' },
          { label: '地点', value: '北京/合肥', icon: 'location_on' },
          { label: '经验', value: '三年', icon: 'access_time' },
          { label: '邮箱', value: '1197160272@qq.com', icon: 'email' },
          { label: '电话', value: '17610953850', icon: 'call' },
          { label: '个人博客', value: 'blog.donsen.site', icon: 'web' },
        ],
        eduTitle: '教育经历',
        universityName: '皖西学院',
        major: '电子信息工程/本科',
        skillsCertificate: '技能证书',
        skillsTitle: '技能特长',
        computerCertificate: '计算机二级证书（C语言）',
        skills: [
          { label: 'HTML', value: 80 },
          { label: 'CSS', value: 80 },
          { label: 'JavaScript', value: 80 },
          { label: 'Node', value: 80 },
          { label: 'TypeScript', value: 80 },
          { label: 'Vue', value: 80 },
          { label: 'Webpack', value: 80 },
          { label: '小程序开发', value: 80 },
          { label: 'Git', value: 80 },
          { label: 'Java', value: 80 },
          { label: 'MySQL', value: 80 },
          { label: 'Linux基础', value: 80 }
        ],
        workHistoriesTitle: '工作经历',
        projectAddress: 'Project Address',
        workHistories: [
          {
            name: '北京优锘科技',
            duration: '2017-10 ~ 2018-12',
            jobTitle: '前端开发',
            projects: [
              {
                name: '优锘科技官网',
                description: '展示优锘科技平台能力及公司形象',
                address: 'http://www.uinnova.cn',
                technologyStack: ['Vue', 'Vuex', 'Vue-Router', 'Node', 'SSR', 'I18n', 'Quasar', 'Webpack']
              },
              {
                name: 'ThingJS平台',
                description: '在线搭建3D可视化场景的平台',
                address: 'https://www.thingjs.com',
                technologyStack: ['JavaScript', 'WebGL', 'HTML', 'JQuery', 'CSS']
              },
              {
                name: '模模搭平台',
                description: '3D模型库展示、3D场景展示以及客户端工具下载',
                address: 'http://www.3dmomoda.com',
                technologyStack: ['Java', 'Jfinal', 'Beetl', 'MySQL', 'Vue', 'JQuery']
              }
            ]
          },
          {
            name: '安徽微一信息技术有限公司',
            duration: '2019-01 ~ 2019-09',
            jobTitle: '前端开发',
            projects: [
              {
                name: '上海市青浦区文明城区有奖答题活动（微信端页面）',
                description: '微信授权登录、签到领积分 <br> 答题得积分生成打卡天数以及积分的周排名、月排名',
                address: 'http://yx.w1js.com',
                technologyStack: ['Laraval', 'PHP', 'MySQL', 'Quasar', 'Vue', 'Webpack']
              },
              {
                name: '汇玩校园平台',
                description: '微信授权登录，签到领取积分，积分商城',
                address: false,
                info: '已下线',
                technologyStack: ['Laraval', 'PHP', 'MySQL', 'Quasar', 'Vue', 'Webpack']
              },
              {
                name: '中国邮政EMS周转箱 ',
                description: '用户端：线上购箱、寄快递通知快递员。<br>快递员端：箱体次数核销、购箱信息确认',
                address: 'http://ems1.w1js.com/',
                technologyStack: ['Laraval', 'PHP', 'MySQL', 'Vue', 'Webpack']
              },
              {
                name: '徽商期货员工食堂（微信小程序）',
                description: '供徽商期货公司员工食堂就餐购买菜品使用。<br> 通过积分核销，可 下单、二维码核销、订单查看',
                address: false,
                info: '微信内搜索“徽商期货食堂”小程序即可',
                technologyStack: ['微信小程序', 'HTML', 'JavaScript', 'CSS']
              },
              {
                name: '中国邮政积分商城（移动端）',
                description: '积分商城，每日签到领取积分，呼叫快递员',
                address: 'http://pingan-apply.w1js.com/',
                technologyStack: ['移动端', 'Laraval', 'PHP', 'MySQL', 'Vue', 'Webpack']
              }
            ]
          },
          {
            name: '亚信科技（中国）',
            duration: '2019-09 ~ 至今',
            jobTitle: '前端开发',
            projects: [
              {
                name: '联通物联网运营平台',
                description: `管理联通各个省市的物联网卡数据<br> 
                  主要功能模块：<br> 
                  首页数据展示：图表，地图<br>
                  查询：资费计划、虚拟账号、综合、成本、发展人差异信息 <br>
                  管理：客户经理、Jasper账号 <br>
                  存卡：卡列表，状态变更、导出、打印
                  报表统计：历史用量、实时用量、日报表卡用量、卡统计、收入统计 <br>
                  收入成本统计：收入录入、连接数录入、非连接录入、自采卡成本、成本核算、卡费核销`,
                address: false,
                info: '公网无法访问，内网项目',
                technologyStack: ['SpringBoot', 'Java', 'MySQL', 'Vue', 'Webpack', 'ElementUI']
              },
              {
                name: '亚信科技产品展示平台',
                description: `展示亚信科技的所有产品及能力`,
                address: false,
                info: '需要指定账号才可以进入系统',
                technologyStack: ['SpringBoot', 'Java', 'MySQL', 'Vue', 'Webpack', 'ElementUI']
              },
              {
                name: '亚信科技商机运营平台',
                description: `爬取商机，分析商机，管理商机，系统权限`,
                address: false,
                info: '需要指定账号才可以进入系统',
                technologyStack: ['SpringBoot', 'Java', 'MySQL', 'Vue', 'Webpack', 'Quasar', 'Echarts', '百度地图']
              },
              {
                name: '广西交通科学研究院智慧路网一体化平台',
                description: '广西交通管理一体化平台，分为计量系统、用地管理系统等子系统，每个子系统有其特定业务，统一授权、认证平台',
                address: false,
                info: '内网项目',
                technologyStack: ['Java', 'SpringBoot', 'JQuery', 'MySQL']
              },
              {
                name: '公路施工质量智能管理系统',
                description: '对道路施工情况的智能管控，摊铺机、压路机的硬件数据采集并用可视化的形式展现设备工作情况，碾压遍数、温度、速度等',
                info: '内网项目',
                address: false,
                technologyStack: ['SpringBoot', 'Java', 'Vue3', 'ElementUI', 'Canvas']
              },
              {
                name: '魔脉演讲微信公众号网页',
                description: '可以在该平台上购买以及学习演讲课程，报名平台活动，提交课程作业，导师评价',
                technologyStack: ['SpringBoot', 'Java', 'Vue3', 'Vant-UI', 'MySQL', 'TypeScript'],
                address: 'https://www.momai.online/',
                info: '请在微信客户端打开'
              }
            ]
          }
        ]
      },
      'en': {
        name: 'Zion Dotson',
        description: 'Dare to innovate, embrace change, and love to learn new technologies',
        basicInfoTitle: 'Basic Info',
        basicInfo: [
          { label: 'work title', value: 'Front-end development engineer', icon: 'work' },
          { label: 'location', value: 'BeiJing', icon: 'location_on' },
          { label: 'experience', value: '3 Years', icon: 'access_time' },
          { label: 'email', value: '1197160272@qq.com', icon: 'email' },
          { label: 'phone', value: '17610953850', icon: 'call' },
          { label: 'personal website', value: 'blog.donsen.site', icon: 'web' },
        ],
        eduTitle: 'Educational experience',
        universityName: 'West AnHui University',
        major: 'Electronic Information Engineering/Undergraduate',
        skillsCertificate: 'Skills Certificate',
        skillsTitle: 'Skills',
        computerCertificate: 'Computer Certificate II (C Language)',
        workHistoriesTitle: 'Work Experience',
        projectAddress: 'Project Address',
        skills: [
          { label: 'HTML', value: 80 },
          { label: 'CSS', value: 80 },
          { label: 'JavaScript', value: 80 },
          { label: 'Node', value: 80 },
          { label: 'TypeScript', value: 80 },
          { label: 'Vue', value: 80 },
          { label: 'Webpack', value: 80 },
          { label: 'Wechat Applets', value: 80 },
          { label: 'Git', value: 80 },
          { label: 'Java', value: 80 },
          { label: 'MySQL', value: 80 },
          { label: 'Linux Base', value: 80 }
        ],
        workHistories: [
          {
            name: 'Uinnova BeiJing',
            duration: '2017-10 ~ 2018-12',
            jobTitle: 'Front-end development engineer',
            projects: [
              {
                name: 'Uinnova official website',
                description: 'Demonstrate the capabilities and company image of U-Tech',
                address: 'http://www.uinnova.cn',
                technologyStack: ['Vue', 'Vuex', 'Vue-Router', 'Node', 'SSR', 'I18n', 'Quasar', 'Webpack']
              },
              {
                name: 'ThingJS Platform',
                description: 'Build a platform for 3D visualization scene online',
                address: 'https://www.thingjs.com',
                technologyStack: ['JavaScript', 'WebGL', 'HTML', 'JQuery', 'CSS']
              },
              {
                name: 'momoda platform',
                description: '3D model library display, 3D scene display and client tool download',
                address: 'http://www.3dmomoda.com',
                technologyStack: ['Java', 'Jfinal', 'Beetl', 'MySQL', 'Vue', 'JQuery']
              }
            ]
          },
          {
            name: 'AnHui WeiYi Information Technology',
            duration: '2019-01 ~ 2019-09',
            jobTitle: 'Front-end development engineer',
            projects: [
              {
                name: 'Prize-answering activity in the civilized city district of Qingpu District, Shanghai (Wechat Page)',
                description: 'WeChat authorizes, log in and sign in to receive points. <br> Answer the questions to get the number of days to generate points and the weekly ranking and monthly ranking of the points',
                address: 'http://yx.w1js.com',
                technologyStack: ['Laraval', 'PHP', 'MySQL', 'Quasar', 'Vue', 'Webpack']
              },
              {
                name: 'HuiWan Campus Platform',
                description: 'WeChat authorized login, sign in to receive points, points mall',
                address: false,
                info: 'offline',
                technologyStack: ['Laraval', 'PHP', 'MySQL', 'Quasar', 'Vue', 'Webpack']
              },
              {
                name: 'EMS Turnover Box (Mobile Only)',
                description: 'User: Buy box online. Send express online with notifications to courier. <br>Courier：Confirm box order. Write off remain numbers of box.',
                address: 'http://ems1.w1js.com/',
                technologyStack: ['Laraval', 'PHP', 'MySQL', 'Vue', 'Webpack']
              },
              {
                name: 'HuiShangQiHuo Employee Canteen (Wechat Applet)',
                description: 'Use points to buy meals',
                address: false,
                info: 'Search "徽商期货食堂" in Wechat',
                technologyStack: ['Wechat Applets', 'HTML', 'JavaScript', 'CSS']
              },
              {
                name: 'EMS Online Points Mall (Mobile Only)',
                description: 'Sign in to get points, use points to exchange goods in online mall',
                address: 'http://pingan-apply.w1js.com/',
                technologyStack: ['Mobile', 'Laraval', 'PHP', 'MySQL', 'Vue', 'Webpack']
              }
            ]
          },
          {
            name: 'AsiaInfo (China)',
            duration: '2019-09 ~ Now',
            jobTitle: 'Front-end development engineer',
            projects: [
              {
                name: 'Unicom IOT System',
                description: `Manage iot cards of Unicom in different provinces or cities in China<br> 
                  Main functions: <br> 
                  Home page data presentation: charts, map<br>
                  Query: Tariff plan, Virtual account, Comprehensive, Cost, Developer difference information <br>
                  Manage: Client manager, Jasper Account <br>
                  Card: Card list, Status Change, Export, Print
                  Report Statistics: History usage, Realtime usage, Daily report card usage, Card statistics, Income statistics <br>
                  Income and Cost Statistics: Income entry, Connection entry, Non-connection entry, Self-picking card statistics, Cost accounting, Card fee check`,
                address: false,
                info: 'Intranet project, not accessable in public network',
                technologyStack: ['SpringBoot', 'Java', 'MySQL', 'Vue', 'Webpack', 'ElementUI']
              },
              {
                name: 'AsiaInfo Products Platform',
                description: `Show all the products and capabilities of AsiaInfo`,
                address: false,
                info: 'Need to specify an account to enter the system',
                technologyStack: ['SpringBoot', 'Java', 'MySQL', 'Vue', 'Webpack', 'ElementUI']
              },
              {
                name: 'AsiaInfo Business Opportunity Operation Platform',
                description: `Crawl business opportunities, Analyze business opportunities, Manage business opportunities, System permissions`,
                address: false,
                info: 'Need to specify an account to enter the system',
                technologyStack: ['SpringBoot', 'Java', 'MySQL', 'Vue', 'Webpack', 'Quasar', 'Echarts', 'Baidu Map']
              }
            ]
          }
        ]
      },
    }
  }),
  methods: {
    openURL
  }
}
</script>
<style lang="stylus">

</style>
