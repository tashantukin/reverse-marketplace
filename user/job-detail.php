<?php 
include 'jobs.php';
$custom_id = $_GET['customid'];

$customContent = getContent($custom_id);

?>



<!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Market Place :: Job Detail</title>
   <!-- core js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery-min.js"></script>
   <!-- bootstrap js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/moment.min.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap.min.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap-datetimepicker.min.js"></script>
   <!-- bootbox js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootbox.min.js"></script>
   <link href="https://bootstrap.arcadier.com/spacetime/css/importFonts.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/style.css" rel="stylesheet" type="text/css">
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.nicescroll.min.js"></script>
   <!-- flying element js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/codex-fly.js"></script>
   <!-- mobile-menu js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/mobile-menu.js"></script>

   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/pagination.min.js"></script>
   <!-- custom js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/custom.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.ddslick.js"></script>
   <!-- bootstrap style -->
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/fancy-radio.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/pagination.css" rel="stylesheet" type="text/css">

   <!-- custom style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/style.css" rel="stylesheet" type="text/css">
   <!-- responsive style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/responsive.css" rel="stylesheet" type="text/css">
   <link href="css/custom.css" rel="stylesheet" type="text/css">
   <!-- modal style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/modal.css" rel="stylesheet" type="text/css">
</head>

<body class="seller-items">
   <!-- header -->
   <div class="header user-login" data-offset-top="0" data-spy="affix">
      <div class="container">
         <div class="row">
            <div class="pull-left">
               <div class="logo">
                  <button id="menu-toggle" class="visible-xs-inline-block"><i class="icon icon-menu"></i></button>
                  <a href="https://bootstrap.arcadier.com/spacetime/index.html"><img
                        src="https://bootstrap.arcadier.com/spacetime/images/logo.svg" alt="Logo"></a>
                  <div class="category-items" style="display:none">
                     <ul>
                        <li class="hasSub"><a href="https://bootstrap.arcadier.com/spacetime/category.html">Kids</a>
                        </li>
                        <li class="hasSub"><a href="https://bootstrap.arcadier.com/spacetime/category.html">Adults </a>
                        </li>
                        <li class="hasSub"><a href="https://bootstrap.arcadier.com/spacetime/category.html">Men</a></li>
                        <li class="hasSub">
                           <a href="https://bootstrap.arcadier.com/spacetime/category.html">Women</a>
                           <ul class="submenu">
                              <li><a href="https://bootstrap.arcadier.com/spacetime/category.html">Boots</a></li>
                              <li><a href="https://bootstrap.arcadier.com/spacetime/category.html">Handbags</a></li>
                              <li><a href="https://bootstrap.arcadier.com/spacetime/category.html">Skirts</a></li>
                              <li><a href="https://bootstrap.arcadier.com/spacetime/category.html">Jeans</a></li>
                              <li><a href="https://bootstrap.arcadier.com/spacetime/category.html">Trousers</a></li>
                           </ul>
                        </li>
                        <li class="hasSub"><a href="https://bootstrap.arcadier.com/spacetime/category.html">Fashion</a>
                        </li>
                     </ul>
                  </div>
               </div>
               <div class="search-bar">
                  <form action="search.html">
                     <input type="text" placeholder="Service you are looking for" class="form-control">
                     <input type="submit" class="btn-find" value="">
                  </form>
               </div>
               <div class="clearfix"></div>
            </div>
            <div class="pull-right">
               <div class="main-nav">
                  <ul class="navigation">
                     <li><a href="https://bootstrap.arcadier.com/spacetime/seller-dashboard2.html" class="hidden-xs">BE
                           A
                           SELLER</a> <a id="mobi-search"
                           href="https://bootstrap.arcadier.com/spacetime/javascript:void(0);" class="visible-xs"><i
                              class="icon icon-search"></i></a>
                     </li>
                     <li class="inbox-menu"><a href="#"><i class="icon inbox-icon"></i><sub>2</sub></a></li>
                     <!-- End Inbox menu -->
                     <li class="language-menu">
                        <div id="SelectLanguage" class="language-list"></div>
                     </li>
                     <li class="user-login dropdown">
                        <a class="hidden-xs" href="javascript:void(0);"><img
                              src="https://bootstrap.arcadier.com/spacetime/images/mrs_auntie.jpg" alt="user pic"
                              align="absmiddle" />Waiudodis Tome</a> <a class="visible-xs" onclick="toggleMobiNav(this)"
                           href="javascript:void(0);"><i class="icon icon-user"></i></a>
                        <ul class="login-nav dropdown-menu">
                           <li><a href="https://bootstrap.arcadier.com/spacetime/purchase-history.html">Purchases</a>
                           </li>
                           <li><a href="https://bootstrap.arcadier.com/spacetime/buyer-settings.html">Settings</a></li>
                           <li><a href="#">Logout</a></li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="clearfix"></div>
         </div>
      </div>
      <div id="mobile-menu">
         <ul>
            <li>
               <a href="https://bootstrap.arcadier.com/spacetime/seller_sales.html">SELL</a>
               <ul>
                  <li><a href="https://bootstrap.arcadier.com/spacetime/seller-dashboard2.html">Dashboard</a></li>
                  <li><a href="https://bootstrap.arcadier.com/spacetime/seller_items.html">Your Items</a></li>
                  <li><a href="https://bootstrap.arcadier.com/spacetime/seller_item_upload2.html">Upload</a></li>
                  <li><a href="https://bootstrap.arcadier.com/spacetime/order-list.html">Orders</a></li>
                  <li><a href="https://bootstrap.arcadier.com/spacetime/seller_sales.html">Sales</a></li>
               </ul>
            </li>
            <li>
               <a href="https://bootstrap.arcadier.com/spacetime/buyer-settings.html">PROFILE</a>
               <ul>
                  <li><a href="https://bootstrap.arcadier.com/spacetime/purchase-history.html">Purchases</a></li>
                  <li><a href="https://bootstrap.arcadier.com/spacetime/buyer-settings.html">Settings</a></li>
                  <li><a href="#">Logout</a></li>
               </ul>
            </li>
         </ul>
      </div>
   </div>
   <!-- header -->
   <div class="main">
      <div class="content-pages">
      <div class="freelancer-content-main">


            <div class="container">
               <div class="page-reverse-title">
                  <h1>Job Detail</h1>
               </div>
               <div class="blue-tabdesign">
                     <div class="navtab-flex">
                     <div class="quote-title-design">Accounting Firm Name</div>
                     <div class="navtab-filter">
                         <a href="freelancer_quote.html" class="btn btn-quote-submit">Edit</a>
                     </div>
                     </div>
               <div class="quote-question-main">
                  <div class="row">
                     <div class="col-sm-8">
                        <div class="quote-question-section">
                           <h4>Job Summary</h4>
                           <div class="qq-title"><span class="dash"></span><span class="title">BAS Agent</span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Tax</span><div class="qq-option"><span>AUD <b>0.00</b></span></div></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Audit</span><div class="qq-option"><span>AUD <b>0.00</b></span></div></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Book-keeping</span><div class="qq-option"><span>AUD <b>10.00</b></span></div></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Payroll</span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Finance</span></div>
                           <div class="qq-title"><span class="dash"></span><span>Other Jobs 1</span>
                              <p>  File 1 | <a href="#">Download File</a></p>
                           </div>
                           <div class="qq-title"><span class="dash"></span><span>Other Jobs 2</span><p>  File 2 | <a href="#">Download File</a></p>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-4">
                        <div class="info-box">
                           <p>Email: Company@gmail.com</p>
                           <p>Name: Company Name</p>
                           <p>Contact Number: 9999 9999</p>
                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="row">
                     <div class="col-sm-12">
                        <div class="quote-question-section">
                           <div class="qq-title"><span class="dash"></span><span class="title">Total</span><div class="qq-option"><span>AUD <b>10.00</b></span></div></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">All at once - Discount</span><div class="qq-option"><span>AUD <b>10.00</b></span></div></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">All at once - Total</span><div class="qq-option"><span>AUD <b>10.00</b></span></div></div>
                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="row">
                     <div class="col-sm-6">
                        <div class="quote-question-section">
                           <div class="qq-title">Job to be completed by: <span class="danger"> Urgent</span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Full Time</span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Contract</span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Hourly</span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Fixed Price</span><span>AUD 10.00</span></div>

                           <div class="form-group">
                              <label for="comments">Comments to applicant:</label>
                              <div class="comment-desc">Patilibunti, sintere crente constiu muscivi denamqu itastrum publiis, ne conloctum, nihilius eo etilinam manunum tum inat poerem nem, us bons re, Cas alicae conte, vitifere que nonsus, cononvenditi, ocae inirtil icaur, virtius aperus, te publistraed re confex manducontisEdicauci ondicae, quostastati, quitiamernum tum inatuset potius. Quam re tum se ina L. Fora tum atis estatis neque arideff rehenditea quam ina, P. Huc faccibus Catraed eesigna, omplicemPatilibunti, sintere crente constiu muscivi denamqu itastrum publiis, ne conloctum, nihilius eo etilinam manunum tum inat poerem nem, us bons re, Cas alicae conte, vitifere que nonsus, cononvenditi, ocae inirtil icaur, virtius aperus, te publistraed re confex manducontisEdicauci ondicae, quostastati, quitiamernum tum inatuset potius. Quam re tum se ina L. Fora tum atis estatis neque arideff rehenditea quam ina, P. Huc faccibus Catraed eesigna, omplicem</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="navtab-flex flex-justify-content-center">
                     <div class="navtab-filter">
                        <a href="homepage.html" class="btn btn-quote-cancel">Back</a>
                     </div>
                  </div>
               </div>

            </div>
            
         </div>
         </div>


      </div>
   </div>
   <!-- End Item form-->
   </div>
   </div>
   <!-- footer -->
   <div class="footer">
      <div class="container">
         <div class="row">
            <div class="footer-wrapper">
               <div class="footer-navigation">
                  <ul>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/about-us.html">ABOUT</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/return-policy.html">SERVICE TERMS</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/privacy-policy.html">PRIVACY</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/terms-of-service.html">RETURNS</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/contact.html">CONTACT</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/faq.html">FAQ</a></li>
                  </ul>
                  <div class="clearfix"></div>
               </div>
               <div class="footer-bottom">
                  <h6>MARKETPLACENAMELIMIT30CHARSTOO</h6>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="backTop"><a href="javascript:void(0);" onclick="ScrollTop();"><img
            src="https://bootstrap.arcadier.com/spacetime/images/mobile_top.svg"></a></div>
   <div class="modal fade model-img-crop" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-body">
               <div id="modaldialog" class="html5imageupload" data-download="true" data-save="false" data-resize="true"
                  data-width="150" data-height="150" data-url="canvas.php" style="width: 100%;">
                  <input type="file" name="thumb" />
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- footer -->
   <!--modal register-->
   <div class="modal-frame model-register">
      <div class="mymodal">
         <div class="modal-inset">
            <div class="modal-body">
               <div class="modal-wrapper">
                  <div class="modal-logo text-center"><img
                        src="https://bootstrap.arcadier.com/spacetime/images/logo.png">
                  </div>
                  <div class="modal-head">Register / Sign in</div>
                  <div class="modal-main">
                     <ul>
                        <li><a href="#"><img src="https://bootstrap.arcadier.com/spacetime/images/fb_login.svg"></a>
                        </li>
                        <li><a href="#"><img src="https://bootstrap.arcadier.com/spacetime/images/goo_login.svg"></a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <button class="modal-close close"></button>
      </div>
   </div>
   <!--modal register-->
   <div class="modal-overlay"></div>

    <!-- begin footer -->
   <script type="text/javascript">
      $(function () { var ddlData = [{ text: "EN", value: 1, imageSrc: "images/gb.svg" }, { text: "CN", value: 2, imageSrc: "images/cn.svg" }, { text: "FR", value: 3, imageSrc: "images/fr.svg" }]; $('.language-list').ddslick({ data: ddlData, width: 100, imagePosition: "left", onSelected: function (selectedData) { } }); });

      jQuery(document).ready(function () {

         jQuery('.datepicker').datetimepicker({
            viewMode: 'days',
            format: 'DD/MM/YYYY'
         });

         jQuery("#mobi-search").click(function () {
            jQuery(".search-bar").slideToggle();
            if (jQuery("#mobile-menu").is(":visible")) {
               jQuery("#mobile-menu").hide();
            }
            if (jQuery(".category-menu").is(":visible")) {
               jQuery(".category-menu").hide();
            }
         });

         /*nice scroll */
         jQuery("#mobile-menu > ul").niceScroll({ cursorcolor: "#000", cursorwidth: "6px", cursorborderradius: "5px", cursorborder: "1px solid transparent", touchbehavior: true });

         jQuery("#menu-toggle").click(function () {
            var target = jQuery(".category-items");
            var parent = jQuery(".category-menu");
            jQuery(parent).show();
            jQuery(target).slideToggle();
            if (jQuery("#mobile-menu").is(":visible")) {
               jQuery("#mobile-menu").hide();
            }
         });

         jQuerymodal = jQuery('.modal-frame');
         jQueryoverlay = jQuery('.modal-overlay');
         jQuerymodal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
            if (jQuerymodal.hasClass('state-leave')) {
               jQuerymodal.removeClass('state-leave');
            }
         });
         jQuery('.close').on('click', function () {
            jQueryoverlay.removeClass('state-show');
            jQuerymodal.removeClass('state-appear').addClass('state-leave');
            jQuery('body').removeClass('modal-open')
         });
         jQuery('#register-modal').on('click', function () {
            jQueryoverlay.addClass('state-show');
            jQuerymodal.removeClass('state-leave').addClass('state-appear');
            jQuery('html, body').animate({ scrollTop: 0 }, 0);
            jQuery('body').addClass('modal-open');

         });
         jQuery('body').on('click','.save-link',function () {
            var $input = $(this).closest('.qq-option').find('input');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span>AUD <b>'+number_format($input.val(),2)+'</b></span><a href="javascript:void(0);" class="edit-link">Edit</a>');
               $input.remove();
            }
         });
         jQuery('body').on('click','.cancel-link',function () {
            var $input = $(this).closest('.qq-option').find('input');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a>');
               $input.remove();
            }
         });
         jQuery('body').on('click','.edit-link',function () {
            var $input = $(this).closest('.qq-option').find('span b');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<input type="text" class="numbersOnlyD" placeholder="AUD 0.00" value="'+$input.text()+'"><a href="javascript:void(0);" class="save-link">Save</a>|<a href="javascript:void(0);" class="cancel-link">Cancel</a>');
               $input.remove();
            }
         });
         
         jQuery('body').on('click','.save-linkdate',function () {
            var $input = $(this).closest('.qq-option').find('input');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span><b>'+$input.val()+'</b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a>');
               $input.remove();
            }
         });
         jQuery('body').on('click','.cancel-linkdate',function () {
            var $input = $(this).closest('.qq-option').find('input');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span><b>DD/MM/YYYY</b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a>');
               $input.remove();
            }
         });
         jQuery('body').on('click','.edit-linkdate',function () {
            var $input = $(this).closest('.qq-option').find('span b');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<input type="text" class="datepicker" placeholder="DD/MM/YYYY" value="'+$input.text()+'"><a href="javascript:void(0);" class="save-linkdate">Save</a>|<a href="javascript:void(0);" class="cancel-linkdate">Cancel</a>');
               jQuery('.datepicker').datetimepicker({
                  viewMode: 'days',
                  format: 'DD/MM/YYYY'
               });
               $input.remove();
            }
         });
         
      });
      function number_format(number,decimals,dec_point,thousands_sep) {
         number  = number*1;//makes sure `number` is numeric value
         var str = number.toFixed(decimals?decimals:0).toString().split('.');
         var parts = [];
         for ( var i=str[0].length; i>0; i-=3 ) {
            parts.unshift(str[0].substring(Math.max(0,i-3),i));
         }
         str[0] = parts.join(thousands_sep?thousands_sep:',');
         return str.join(dec_point?dec_point:'.');
      }
   </script>


   <script type="text/javascript" src="scripts/manage.js"></script>

         <!-- end footer -->


</body>

</html>