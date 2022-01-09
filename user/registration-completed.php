<!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Market Place :: lodged</title>
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
   <!-- custom js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/custom.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.ddslick.js"></script>
   <!-- bootstrap style -->
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/fancy-radio.css" rel="stylesheet" type="text/css">

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
   <div class="main">
      <div class="content-pages">
         <div class="container">
            <div class="freelancer-content-main align-center-div">
               <div class="lodged-success-box">
                  <img src="images/lodged.svg">
                  <h1>Your registration is complete!</h1>
                  <p>After your registration is completed, you are able to</p>
                  <p>browse the marketplace now.</p>
                  <div class="btn-hbox">
                     <a class="btn btn-block btn-jobform-fill" href="/">Take me there!</a>
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

   <div class="modal fade modal-align-center" id="warningModal" role="dialog">
      <div class="modal-dialog">
         <!-- Modal content-->
         <div class="modal-content">
            <div class="modal-body">
                <div class="modal-job-popup">
                     <div class="modal-title">
                        <h4>Warning</h4>
                     </div>
                     
                     <div class="text-center">
                        <p>Please do not delete your cookies on your browser or<br>machine as they are the only way to identify you.</p>
                     </div>
                     <div class="btn-hbox">
                        <a class="btn btn-block btn-jobform-fill" href="homepage.html">I Understand</a>
                        <a class="btn btn-block btn-jobform-outline" href="freelancer-create-account.html">I'd like to register</a>
                     </div>
                </div>

            </div>
         </div>
      </div>
   </div>


   <!--modal register-->
   <div class="modal-overlay"></div>
   <script type="text/javascript">
      $(function () { var ddlData = [{ text: "EN", value: 1, imageSrc: "images/gb.svg" }, { text: "CN", value: 2, imageSrc: "images/cn.svg" }, { text: "FR", value: 3, imageSrc: "images/fr.svg" }]; $('.language-list').ddslick({ data: ddlData, width: 100, imagePosition: "left", onSelected: function (selectedData) { } }); });

      jQuery(document).ready(function () {

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
      });
   </script>


</body>

</html>