import React from 'react';
import { IconFont } from 'components';
import styles from './assets/style/index.less';

const changeLogList = [
  {
    version: '1.2.1',
    date: '2018-09-30',
    log: [
      '迁移braft-editor到2.x',
      '集成node性能监控平台alinode',
    ],
  },
  {
    version: '1.2.0',
    date: '2018-06-26',
    log: [
      '新增反馈功能，用户可提交和编辑反馈，可对反馈进行回复讨论，作者或系统管理员可关闭已经没有讨论必要的反馈',
      '本项目进入维护阶段，今后以bugfix为主，完结撒花🎉🎉🎉',
    ],
  },
  {
    version: '1.1.8',
    date: '2018-06-14',
    log: [
      '新增文章草稿，草稿只有自己可见，文章可通过编辑在发布和草稿状态间转换',
      '个人中心新增对草稿的搜索和管理',
      '新增默认分类，默认分类无法被编辑和删除',
      '修复分类可以同名bug，支持点击分类和tag进行快速搜索',
    ],
  },
  {
    version: '1.1.7',
    date: '2018-06-13',
    log: [
      '新增团队管理员可邀请未加入团队的用户加入及生成相应的审批和消息',
      '用户活跃剔除已经删除的文章',
      '访问不存在的用户主页跳转到404页',
    ],
  },
  {
    version: '1.1.6',
    date: '2018-06-12',
    log: [
      '新增文章搜索页，完善文章查询机制，可进行多维度查询',
      '头部导航栏新增搜索功能',
      '个人中心-文章管理支持标题模糊查询和时间范围查询',
    ],
  },
  {
    version: '1.1.5',
    date: '2018-06-08',
    log: [
      '原个人主页变更为个人中心，管理和设置个人信息',
      '新增用户设置主页封面、个人简介、收钱码等信息',
      '新增个人主页，用于展示用户信息、资料、文章或动态等',
      '新增给原创文章打赏功能，需要该文章开启接受打赏且作者上传了收钱码',
      '评论和回复支持骚气的emoji了（需要输入法支持）',
      '之前遗漏的文章列表展示文章标签',
      '个人主页入口位于头部导航栏头像下，快速入口分散在其他页面的用户名点击进入',
    ],
  },
  {
    version: '1.1.3',
    date: '2018-06-05',
    log: [
      '新增活跃用户排行榜',
      'UI调整，统一翻页样式',
      '其他细节改进',
    ],
  },
  {
    version: '1.1.2',
    date: '2018-06-01',
    log: [
      '新增团队成员退出团队功能',
      '新增团队管理员转让团队、踢出团队成员等管理团队操作',
      '修复修改团队bug',
    ],
  },
  {
    version: '1.1.1',
    date: '2018-05-31',
    log: [
      '修复路径错误导致某些页面不能正确访问或使用',
      '优化登录逻辑，在登录页刷新时不再自动登录，可使用用户名或邮箱登录',
      '优化注册逻辑，需要确认密码',
      '优化头像显示',
      '其他细节改进',
    ],
  },
  {
    version: '1.1.0',
    date: '2018-05-02',
    log: [
      '根据功能点重新划分页面，使用新的页面布局',
      '新增团队功能，申请加入团队后，成为团队的一份子，所写的文章也会自动归档',
      '团队管理员默认为团队创建者，可以对团队的名称、封面和简介进行修改',
      '新增博客首页，浏览团队和最新文章',
      '新增审批功能，系统管理员、团队管理员根据权限对需要审批的操作进行同意或驳回',
      '新增消息功能，新增文章的评论、回复、审批有新的进度，会发送消息给相应的用户',
      '新增webSocket消息，有新消息时即时弹窗',
      '文章新增标签（关键词），文章分类由系统管理员管理，文章标签由作者管理',
      '新增发送站内信功能，目前只开放给系统管理员，往后或许会逐步开放',
      '新增更新日志，没错就是现在写的这个',
      '新增404页面，访问不存在的页面（比如已经被删除的文章）用作代替',
      '已知BUG修复',
      '其他细节改进',
    ],
  },
  {
    version: '1.0.0',
    date: '2018-04-02',
    log: [
      '实现用户注册、登录、修改密码等用户功能',
      '实现文章新增、编辑、删除等功能',
      '加入互动功能，可对文章进行评论，对评论进行回复',
      '实现博客基本的使用功能，上线内测',
    ],
  },
];

const ChangeLog = () => (
  <div className={styles.changeLogPage}>
    <div className={styles.changeLogHeader}>
      <IconFont type="rec" fontSize="30px" />
      <div className={styles.title}>更新日志</div>
    </div>
    <div className={styles.changeLogList}>
      {changeLogList.map(item => (
        <div key={item.version} className={styles.logItem}>
          <div className={styles.itemHeader}>
            <IconFont type="version" fontSize="32px" color="#00ADB5" />
            {item.version}
            <span className={styles.versionDate}>{item.date}</span>
          </div>
          <ul className={styles.itemBody}>
            {item.log.map((log, i) => <li key={i}>{log}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default ChangeLog;
