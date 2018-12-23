<template>
  <div id="root">
    <div class="navbar navbar-fixed-top navbar-inverse" >
      <div class="container">
        <div class="nav-logo">
          <a class="" href="#">
            <img class="img-responsive" src="logo.png" alt="北京市XXXX科技有限公司" style="height: 100%;width: auto;" />
          </a>
        </div>
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navBar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse navbar-right" id="navBar">
          <ul class="nav navbar-nav">
            <li><a href="#">首页</a></li>
            <li><a href="#">公司介绍</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                产品中心<span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#">SmartCall智能呼</a></li>
                <li><a href="#">运营管理平台ＯＭＳ</a></li>
                <li><a href="#">客户关系管理系统</a></li>
                <li><a href="#">电销系统</a></li>
                <li><a href="#">知识库管理</a></li>
                <li><a href="#">排班管理模块</a></li>
                <li><a href="#">考试培训系统</a></li>
                <li><a href="#">多媒体调度指挥系统</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                行业方案<span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#">多媒体呼叫中心</a></li>
                <li><a href="#">保险行业</a></li>
                <li><a href="#">制造行业</a></li>
                <li><a href="#">政府部门</a></li>
                <li><a href="#">教育行业</a></li>
                <li><a href="#">酒店/旅游</a></li>
                <li><a href="#">电子商务</a></li>
                <li><a href="#">社区服务</a></li>
                <li><a href="#">铁路/客运</a></li>
                <li><a href="#">医疗卫生</a></li>
              </ul>
            </li>
            <li><a href="#">公司新闻</a></li>
            <li><a href="#">典型客户</a></li>
            <li><a href="#">合作伙伴</a></li>
            <li><a href="#">联系我们</a></li>
          </ul>
        </div>
      </div>
    </div>



<!--
    <mfooter></mfooter>
-->
  </div>
</template>

<script>

export default {
  name: 'iheader',
  data () {
    return {
    }
  },
  created(){
    console.log($);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-logo{
    float: left;
    height: 40px;
    margin-top: 5px;
    overflow: hidden;
  }
  .nav-logo a{
    margin: 0;
    padding: 0;
  }


  body {
    padding-top: 20px;
  }

  .footer {
    padding-top: 40px;
    padding-bottom: 40px;
    margin-top: 40px;
    border-top: 1px solid #eee;
  }

  /* Main marketing message and sign up button */
  .jumbotron {
    text-align: center;
    background-color: transparent;
  }
  .jumbotron .btn {
    padding: 14px 24px;
    font-size: 21px;
  }

  /* Customize the nav-justified links to be fill the entire space of the .navbar */

  .nav-justified {
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .nav-justified > li > a {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 0;
    font-weight: bold;
    color: #777;
    text-align: center;
    background-color: #e5e5e5; /* Old browsers */
    background-image: -webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#e5e5e5));
    background-image: -webkit-linear-gradient(top, #f5f5f5 0%, #e5e5e5 100%);
    background-image:      -o-linear-gradient(top, #f5f5f5 0%, #e5e5e5 100%);
    background-image:         linear-gradient(to bottom, #f5f5f5 0%,#e5e5e5 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f5f5f5', endColorstr='#e5e5e5',GradientType=0 ); /* IE6-9 */
    background-repeat: repeat-x; /* Repeat the gradient */
    border-bottom: 1px solid #d5d5d5;
  }
  .nav-justified > .active > a,
  .nav-justified > .active > a:hover,
  .nav-justified > .active > a:focus {
    background-color: #ddd;
    background-image: none;
    -webkit-box-shadow: inset 0 3px 7px rgba(0,0,0,.15);
    box-shadow: inset 0 3px 7px rgba(0,0,0,.15);
  }
  .nav-justified > li:first-child > a {
    border-radius: 5px 5px 0 0;
  }
  .nav-justified > li:last-child > a {
    border-bottom: 0;
    border-radius: 0 0 5px 5px;
  }

  @media (min-width: 768px) {
    .nav-justified {
      max-height: 52px;
    }
    .nav-justified > li > a {
      border-right: 1px solid #d5d5d5;
      border-left: 1px solid #fff;
    }
    .nav-justified > li:first-child > a {
      border-left: 0;
      border-radius: 5px 0 0 5px;
    }
    .nav-justified > li:last-child > a {
      border-right: 0;
      border-radius: 0 5px 5px 0;
    }
  }

  /* Responsive: Portrait tablets and up */
  @media screen and (min-width: 768px) {
    /* Remove the padding we set earlier */
    .masthead,
    .marketing,
    .footer {
      padding-right: 0;
      padding-left: 0;
    }
  }
</style>
