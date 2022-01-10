
 <?php 
include 'jobs.php';
$job_id = $_GET['jobId'];
$user_id = $_GET['userId'];

$jobDetails = getContent($job_id);
$jobFiles = getFiles($job_id);
$userDetails = getFreelancerDetails($user_id);


$quotedDetails = getQuoted($job_id, $user_id);

$job_completion = '';
$job_type = '';

if ($jobDetails['Records'][0]['time_frame_nohurry'] == 'True') {
    $job_completion = 'No hurry';
}else if ($jobDetails['Records'][0]['time_frame_urgent'] == 'True') {
    $job_completion = 'Urgent';
}else {
    $job_completion = $jobDetails['Records'][0]['time_frame_timestamp'];
}


if ($jobDetails['Records'][0]['job_type_contract'] == 'True' && $jobDetails['Records'][0]['job_type_full_time'] == 'True' ) {

    $job_type = "<div class='qq-title'><span class='dash'></span><span class='title'>Full Time</span></div>
    <div class='qq-title'><span class='dash'></span><span class='title'>Contract</span> </div>";

}else if ($jobDetails['Records'][0]['job_type_contract'] == 'False' && $jobDetails['Records'][0]['job_type_full_time'] == 'True' )

    $job_type  = "<div class='qq-title'><span class='dash'></span><span class='title'>Full Time</span></div>";
else if  ($jobDetails['Records'][0]['job_type_contract'] == 'True' && $jobDetails['Records'][0]['job_type_full_time'] == 'False' )

    $job_type  = "<div class='qq-title'><span class='dash'></span><span class='title'>Contract</span></div>";

else {
    $job_type = '';
}
?>




<!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Market Place :: Quote</title>
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
  
   <!-- header -->
   <div class="main">
   <div class="content-pages">
      <div class="freelancer-content-main">


            <div class="container">
               <div class="page-reverse-title">
                  <h1>Quote</h1>
               </div>
               <div class="blue-tabdesign">
                     <div class="navtab-flex">
                     <div class="quote-title-design"><?php echo $userDetails['Records'][0]['company_name'] ?></p></div>
                     <div class="navtab-filter btn-margin">
                        <a href="/" class="btn btn-quote-cancel">Cancel</a>
                        <button type="button" class="btn btn-quote-submit">Submit Quote</button>
                     </div>
                     </div>
               <div class="quote-question-main">
                  <div class="row">
                     <div class="col-sm-8">
                        <div class="quote-question-section">
                            <div class="qq-total-sum">
                               <h4>1. Job Summary</h4>
                            <?php
                               foreach(json_decode($quotedDetails['Records'][0]['job_summary'],true) as $task) {
                                    echo "<div class='qq-title saved'><span class='dash'></span><span class='title'>" . $task['title']. " . </span><div class='qq-option'><span>AUD <b>" . $task['price']. "</b></span><a href='javascript:void(0);' class='edit-link'>Edit</a></div></div>";


                               }
                            ?>

                               <!-- <div class="qq-title saved"><span class="dash"></span><span class="title">BAS Agent</span><div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div></div>
                               <div class="qq-title saved"><span class="dash"></span><span class="title">Tax</span><div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div></div>
                               <div class="qq-title saved"><span class="dash"></span><span class="title">Audit</span><div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div></div>
                               <div class="qq-title saved"><span class="dash"></span><span class="title">Book-keeping</span><div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div></div>
                               <div class="qq-title saved"><span class="dash"></span><span class="title">Payroll</span><div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div></div>
                               <div class="qq-title saved"><span class="dash"></span><span class="title">Finance</span><div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div></div> -->
                              
                              
                               <!-- <div class="qq-title saved"><span class="dash"></span><span>Other Jobs 1</span>
                                  <p>  File 1 | <a href="#">Download File</a></p>
                                  <div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div>
                               </div>
                               <div class="qq-title saved"><span class="dash"></span><span>Other Jobs 2</span><p>  File 2 | <a href="#">Download File</a></p>
                                   <div class="qq-option"><span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div>
                               </div> -->
                            </div>
                        </div>
                     </div>
                     <div class="col-sm-4">
                        <div class="info-box">
                            <p>Email: <?php echo $userDetails['Records'][0]['email'] ?></p>
                           <p>Name: <?php echo $userDetails['Records'][0]['company_name'] ?></p>
                           <p>Contact Number: <?php echo $userDetails['Records'][0]['contact_number'] ?></p>
                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="row">
                     <div class="col-sm-12">
                        <div class="quote-question-section">
                           <div class="qq-title"><span class="dash"></span><span class="title">Total</span><div class="qq-option qq-total"><span class="">AUD <b><?php echo $quotedDetails['Records'][0]['total'] ?></b></span></div></div>
                           <div class="qq-title qq-discount saved"><span class="dash"></span><span class="title">All at once - Discount</span><div class="qq-option"><span>AUD <b><?php echo $quotedDetails['Records'][0]['all_discount'] ?></b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">All at once - Total</span><div class="qq-option qq-subtotal"><span>AUD <b><?php echo $quotedDetails['Records'][0]['all_total'] ?></b></span></div></div>
                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="row">
                     <div class="col-sm-6">
                        <div class="quote-question-section">
                           <div class="qq-title">Job to be completed by: <span class="danger"> <?php echo  $job_completion?> </span></div>
                           <div class="qq-title saved"><span class="dash"></span><span class="title">Availability</span><div class="qq-option"><span><b><?php echo $quotedDetails['Records'][0]['availability_date'] ?></b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a></div></div>
                           <div class="qq-title saved"><span class="dash"></span><span class="title">Validity Date</span><div class="qq-option"><span><b><?php echo $quotedDetails['Records'][0]['validity_date'] ?></b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a></div></div>
                           <!-- <div class="qq-title"><span class="dash"></span><span class="title">Full Time</span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Contract</span></div> -->
                           <?php echo $job_type ?>
                           
                           <div class="qq-title"><span class="dash"></span><span class="title">Hourly</span><span>AUD <?php echo $jobDetails['Records'][0]['payment_hourly_value'] ?></span></div>
                           <div class="qq-title"><span class="dash"></span><span class="title">Fixed Price</span><span>AUD <?php echo $jobDetails['Records'][0]['payment_fixed_value'] ?></span></div>

                           <div class="form-group">
                              <label for="comments">Comments to applicant:</label>
                              <div class="comment-desc"><?php echo $jobDetails['Records'][0]['comments'] ?></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="quote-question-main">
                  <div class="row">
                     <div class="col-sm-6">
                        <div class="quote-question-section custom-fancyjb">
                           <h4>2. Your Payment</h4>
                           <div class="checkbox-row-flex">
                              <div class="checkbox-width ">
                                 <div class="fancy-checkbox checkbox-sm">
                                    <input checked="<?php echo $quotedDetails['Records'][0]['deposit_required'] ?>" type="checkbox" name="deposit_required" id="deposit_required">
                                    <label for="deposit_required"><span>Deposit Required</span></label>
                                 </div>
                              </div>
                              <div class="qq-option"><span>AUD <b><?php echo $quotedDetails['Records'][0]['deposit_amount'] ?></b></span><a href="javascript:void(0);" class="edit-link">Edit</a></div>
                           </div>
                           
                           <div class="fancy-checkbox checkbox-sm">
                              <input checked="<?php echo $quotedDetails['Records'][0]['for_7_days'] ?>" type="checkbox" name="7_days" id="7_days">
                              <label for="7_days"><span>For 7 days</span></label>
                           </div>

                           <div class="fancy-checkbox checkbox-sm">
                               <input checked="<?php echo $quotedDetails['Records'][0]['for_30_days'] ?>" type="checkbox" name="30_days" id="30_days">
                              <label for="30_days"><span>For 30 days</span></label>
                           </div>

                           <div class="form-group">
                              <label for="payment_comments">Comments on payment terms:</label>
                              <textarea id="payment_comments" name="payment_comments" class="form-control" rows="5"><?php echo $quotedDetails['Records'][0]['comments_on_terms'] ?></textarea>
                           </div>
                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="row">
                     <div class="col-sm-6">
                        <div class="quote-question-section custom-fancyjb">
                           <label>Payment method:</label>
                           <div class="checkbox-row-flex">
                              <div class="checkbox-width ">
                                 <div class="fancy-checkbox checkbox-sm">
                                     <input checked="<?php echo $quotedDetails['Records'][0]['payment_cod'] ?>" type="checkbox" name="COD" id="COD">
                                    <label for="COD"><span>COD</span></label>
                                 </div>
                              </div>
                           </div>
                           <div class="checkbox-row-flex">
                              <div class="checkbox-width ">
                                 <div class="fancy-checkbox checkbox-sm">
                                    <input checked="<?php echo $quotedDetails['Records'][0]['payment_credit_card'] ?>" type="checkbox" name="credit_card" id="credit_card">
                                    <label for="credit_card"><span>Credit Card</span></label>
                                 </div>
                              </div>
                           </div>
                           <div class="checkbox-row-flex">
                              <div class="checkbox-width ">
                                 <div class="fancy-checkbox checkbox-sm">
                                    <input checked="<?php echo $quotedDetails['Records'][0]['payment_paypal'] ?>" type="checkbox" name="paypal" id="paypal">
                                    <label for="paypal"><span>PayPal</span></label>
                                 </div>
                              </div>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>

               <div class="navtab-flex">
                  <div class="question-requester-design">Have a question? Ask requester a question <a href="#">here</a></div>
                  <div class="navtab-filter btn-margin">
                     <a href="/" class="btn btn-quote-cancel">Cancel</a>
                     <button type="button" class="btn btn-quote-submit">Submit Quote</button>
                  </div>
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
            var $parent = $(this).parents('.qq-title');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span>AUD <b>'+number_format($input.val(),2)+'</b></span><a href="javascript:void(0);" class="edit-link">Edit</a>');
               total_sum();
               $parent.addClass('saved');
               $input.remove();
            }
         });
         jQuery('body').on('click','.cancel-link',function () {
            var $input = $(this).closest('.qq-option').find('input');
            var $parent = $(this).parents('.qq-title');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a>');
               $parent.addClass('saved');
               $input.remove();
            }
         });
         jQuery('body').on('click','.edit-link',function () {
            var $input = $(this).closest('.qq-option').find('span b');
            var $parent = $(this).parents('.qq-title');
            if( $input.length>0 ){
               $parent.removeClass('saved');
               $(this).closest('.qq-option').html('<input type="text" class="numbersOnlyD" placeholder="AUD 0.00" value="'+$input.text()+'"><a href="javascript:void(0);" class="save-link">Save</a>|<a href="javascript:void(0);" class="cancel-link">Cancel</a>');
               $input.remove();
            }
         });
         
         jQuery('body').on('click','.save-linkdate',function () {
            var $input = $(this).closest('.qq-option').find('input');
            var $parent = $(this).parents('.qq-title');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span><b>'+$input.val()+'</b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a>');
               $parent.addClass('saved');
               $input.remove();
            }
         });
         jQuery('body').on('click','.cancel-linkdate',function () {
            var $input = $(this).closest('.qq-option').find('input');
            var $parent = $(this).parents('.qq-title');
            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<span><b>DD/MM/YYYY</b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a>');
               $parent.addClass('saved');
               $input.remove();
            }
         });
         jQuery('body').on('click','.edit-linkdate',function () {
            var $input = $(this).closest('.qq-option').find('span b');
            var $parent = $(this).parents('.qq-title');

            if( $input.length>0 ){
               $(this).closest('.qq-option').html('<input type="text" class="datepicker" placeholder="DD/MM/YYYY" value="'+$input.text()+'"><a href="javascript:void(0);" class="save-linkdate">Save</a>|<a href="javascript:void(0);" class="cancel-linkdate">Cancel</a>');
               $parent.removeClass('saved');
               jQuery('.datepicker').datetimepicker({
                  viewMode: 'days',
                  format: 'DD/MM/YYYY'
               });
               $input.remove();
            }
         });
         
      });
      function total_sum() {
            var totalSum = 0;
            $( ".qq-total-sum .qq-title" ).each(function( index ) {
                if( $( this ).find('.qq-option').find('b').length>0 ){
                     totalSum += parseFloat($( this ).find('.qq-option').find('b').text());
                }
            });
            $('.qq-total span b').text(number_format(totalSum,2));
            var discount = 0;
            if($('.qq-title.qq-discount').find('span').find('b').length>0){
                discount = parseFloat($('.qq-title.qq-discount').find('span').find('b').text());
            }
            var subtotal = totalSum - discount;
            $('.qq-subtotal span b').text(number_format(subtotal,2));
      }
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
</body>

</html>