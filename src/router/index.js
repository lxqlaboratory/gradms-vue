import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/coursenew',
    component: Layout,
    name: 'coursenew',
    meta: {
      title: '教师管理',
      icon: 'example'
    },
    children: [
      {
        path: 'collegeWorkOutTeachingSchedule',
        name: 'collegeWorkOutTeachingSchedule',
        component: () => import('@/views/coursenew/collegeWorkOutTeachingSchedule'),
        meta: { title: '学院排课' }
      },
      {
        path: 'examAffairMaterialExport',
        name: 'examAffairMaterialExport',
        component: () => import('@/views/coursenew/examAffairMaterialExport'),
        meta: { title: '考务材料导出' }
      },
      {
        path: 'examInvigilaterArrange',
        name: 'examInvigilaterArrange',
        component: () => import('@/views/coursenew/examInvigilaterArrange'),
        meta: { title: '监考人员安排 '}
      },
      {
        path: 'examTourCollegeArrange',
        name: 'examTourCollegeArrange',
        component: () => import('@/views/coursenew/examTourCollegeArrange'),
        meta: { title: '巡考人员安排 '}
      },
      {
        path: 'examAffairArrange',
        name: 'examAffairArrange',
        component: () => import('@/views/coursenew/examAffairArrange'),
        meta: { title: '考务人员安排 '}
      },
      {
        path: 'teacherCourseTaskQuery',
        name: 'teacherCourseTaskQuery',
        component: () => import('@/views/coursenew/teacherCourseTaskQuery'),
        meta: { title: '教师授课查询'}
      },
      {
        path: 'collegeWorkOutTeachingSchedule',
        name: 'collegeWorkOutTeachingSchedule',
        component: () => import('@/views/coursenew/collegeWorkOutTeachingSchedule'),
        meta: { title: '学院排课'}
      },
      {
        path: 'examAffairInfoQuery',
        name: 'examAffairInfoQuery',
        component: () => import('@/views/coursenew/examAffairInfoQuery'),
        meta: { title: '考务信息查询'}
      },
      {
        path: 'examAffairPersonManage',
        name: 'examAffairPersonManage',
        component: () => import('@/views/coursenew/examAffairPersonManage'),
        meta: { title: '监考人库管理'}
      },
      {
        path: 'examAffairPersonManageAdd',
        name: 'examAffairPersonManageAdd',
        component: () => import('@/views/coursenew/examAffairPersonManageAdd'),
        meta: { title: '监考人员添加'}
      },
      {
        path: 'examInvigilaterArrange',
        name: 'examInvigilaterArrange',
        component: () => import('@/views/coursenew/examInvigilaterArrange'),
        meta: { title: '考试安排管理'}
      }
    ]
  },
  {
    path: '/tutor',
    component: Layout,
    name: 'tutor',
    meta: {
      title: '导师管理',
      icon: 'example'
    },
    children: [
      {
        path: 'degreeCollegeTutorMemberManage',
        name: 'degreeCollegeTutorMemberManage',
        component: () => import('@/views/tutor/degreeCollegeTutorMemberManage'),
        meta: { title: '学院导师组管理'}
      },
      {
        path: 'degreeCollegeTutorMemberManageAdd',
        name: 'degreeCollegeTutorMemberManageAdd',
        component: () => import('@/views/tutor/degreeCollegeTutorMemberManageAdd'),
        meta: { title: '导师组成员添加'}
      },
      {
        path: 'collegeMaintainStudentTutor',
        name: 'collegeMaintainStudentTutor',
        component: () => import('@/views/tutor/collegeMaintainStudentTutor'),
        meta: { title: '学院维护学生导师'}
      },
      {
        path: 'studentViewCollegeTutor',
        name: 'studentViewCollegeTutor',
        component: () => import('@/views/tutor/studentViewCollegeTutor'),
        meta: { title: '查看导师信息'}
      },
      {
        path: 'tutorInfoQueryBrowse',
        name: 'tutorInfoQueryBrowse',
        component: () => import('@/views/tutor/tutorInfoQueryBrowse'),
        meta: { title: '导师查询浏览'}
      },
      {
        path: 'tutorBaseInfoMaintain',
        name: 'tutorBaselInfoMaintain',
        component: () => import('@/views/tutor/tutorBaseInfoMaintain'),
        meta: { title: '导师基本信息维护'}
      },  
      {
        path: 'tutorDetailInfoShow',
        name: 'tutorDetailInfoShow',
        component: () => import('@/views/tutor/tutorDetailInfoShow'),
        meta: { title: '导师详细信息'}
      },
      {
        path: 'tutorAuxiliaryMaintain',
        name: 'tutorAuxiliaryMaintain',
        component: () => import('@/views/tutor/tutorAuxiliaryMaintain'),
        meta: { title: '辅助信息维护'}
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    name: 'student',
    meta: {
      title: '学生管理',
      icon: 'example'
    },
    children: [
      {
        path: 'studentBaseInfoMaintain',
        name: 'studentBaselInfoMaintain',
        component: () => import('@/views/student/studentBaseInfoMaintain'),
        meta: { title: '学生基本详细维护'}
      },  
      {
        path: 'studentDetailInfoShow',
        name: 'studentDetailInfoShow',
        component: () => import('@/views/student/studentDetailInfoShow'),
        meta: { title: '学生详细信息'}
      }
    ]
  },
  {
    path: '/graduate',
    component: Layout,
    name: 'graduate',
    meta: {
      title: '学位管理',
      icon: 'example'
    },
    children: [
      {
        path: 'degreeTutorCheckStudentGraduateApply',
        name: 'degreeTutorCheckStudentGraduateApply',
        component: () => import('@/views/graduate/degreeTutorCheckStudentGraduateApply'),
        meta: { title: '导师审核毕业申请'}
      } 
    ]
  },
  {
    path: '/thesisreview',
    component: Layout,
    name: 'thesisreview',
    meta: {
      title: '论文评阅',
      icon: 'example'
    },
    children: [
      {
        path: 'thesisReviewPasswordUpdate',
        name: 'thesisReviewPasswordUpdate',
        component: () => import('@/views/thesisreview/thesisReviewPasswordUpdate'),
        meta: { title: '密码修改'}
      },
      {
        path: 'thesisReviewExpertInfoMaintain',
        name: 'thesisReviewExpertInfoMaintain',
        component: () => import('@/views/thesisreview/thesisReviewExpertInfoMaintain'),
        meta: { title: '基本信息'}
      }, 
      {
        path: 'thesisReviewOnlineReview',
        name: 'thesisReviewOnlineReview',
        component: () => import('@/views/thesisreview/thesisReviewOnlineReview'),
        meta: { title: '论文评阅'}
      }, 
      {
        path: 'thesisReviewExpertManage',
        name: 'thesisReviewExpertManage',
        component: () => import('@/views/thesisreview/thesisReviewExpertManage'),
        meta: { title: '评阅专家管理'}
      }, 
      {
        path: 'thesisReviewConfigManage',
        name: 'thesisReviewConfigManage',
        component: () => import('@/views/thesisreview/thesisReviewConfigManage'),
        meta: { title: '评阅配置管理'}
      }, 
      {
        path: 'thesisReviewDirectionManage',
        name: 'thesisReviewDirectionManage',
        component: () => import('@/views/thesisreview/thesisReviewDirectionManage'),
        meta: { title: '评阅方向管理'}
      }, 
      {
        path: 'thesisReviewPersonManage',
        name: 'thesisReviewPersonManage',
        component: () => import('@/views/thesisreview/thesisReviewPersonManage'),
        meta: { title: '评阅人管理'}
      }, 
      {
        path: 'thesisReviewPersonManageAdd',
        name: 'thesisReviewPersonManageAdd',
        component: () => import('@/views/thesisreview/thesisReviewPersonManageAdd'),
        meta: { title: '评阅人添加'}
      }, 
      {
        path: 'thesisReviewReviewInfoManage',
        name: 'thesisReviewReviewInfoManage',
        component: () => import('@/views/thesisreview/thesisReviewReviewInfoManage'),
        meta: { title: '评阅信息管理'}
      }, 
      {
        path: 'thesisReviewReviewInfoExpertMaintain',
        name: 'thesisReviewReviewInfoExpertMaintain',
        component: () => import('@/views/thesisreview/thesisReviewReviewInfoExpertMaintain'),
        meta: { title: '评阅信息专家表'}
      }, 
      {
        path: 'thesisReviewReviewStateTrace',
        name: 'thesisReviewReviewStateTrace',
        component: () => import('@/views/thesisreview/thesisReviewReviewStateTrace'),
        meta: { title: '评阅状态追踪'}
      }, 
      {
        path: 'thesisReviewReviewFeeManage',
        name: 'thesisReviewReviewFeeManage',
        component: () => import('@/views/thesisreview/thesisReviewReviewFeeManage'),
        meta: { title: '评阅费用管理'}
      } 
    ]
  },

  {path: '/', redirect: '/login' ,hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
