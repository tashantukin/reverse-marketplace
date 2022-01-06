<?php 
include 'freelancers.php';
$custom_id = $_GET['customid'];

$customContent = getContent($custom_id);

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1" name="viewport">
<title>Freelancer Detail</title>
<!-- core js -->
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery-1.11.3.min.js" type="text/javascript">
</script>
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery.js" type="text/javascript">
</script>
<!-- bootstrap js -->
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/bootstrap.min.js" type="text/javascript">
</script>
<!-- nicescroll js -->
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery.nicescroll.min.js" type="text/javascript">
</script>
<!-- bootbox js -->
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/bootbox.min.js" type="text/javascript">
</script>
<!-- tablesorter js -->
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery.tablesorter.js" type="text/javascript">
</script>
<!-- html5upload js -->
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/html5imageupload.min.js" type="text/javascript">
</script>
<!-- Pagination js -->
<script src="https://bootstrap.arcadier.com/adminportal/js/pagination.min.js" type="text/javascript">
</script>
<!-- custom js -->
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/custom.js" type="text/javascript">
</script>
<!-- bootstrap style -->
<link href="https://bootstrap.arcadier.com/adminportal_pre/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="https://bootstrap.arcadier.com/adminportal_pre/css/jquery-ui.min.css" rel="stylesheet" type="text/css">
<link href="https://bootstrap.arcadier.com/adminportal_pre/css/html5imageupload.css" rel="stylesheet" type="text/css">
<link href="https://bootstrap.arcadier.com/adminportal_pre/css/switch-btn.css" rel="stylesheet" type="text/css">
<!-- Pagination style -->
<link href="https://bootstrap.arcadier.com/adminportal/css/pagination.css" rel="stylesheet" type="text/css">
<!-- custom style-->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" type="text/css">
<link href="https://bootstrap.arcadier.com/adminportal/css/style.css" rel="stylesheet" type="text/css">
<!-- responsive style-->
<link href="https://bootstrap.arcadier.com/adminportal/css/responsive.css" rel="stylesheet" type="text/css">
<link href="css/onboarding-fields.css" rel="stylesheet" type="text/css">

</meta>
</head>
<body class="page-freelancer-detail">
<div class="mobi-header visible-xs">

</div>
<div class="main template-sidebar dashboard-admin-pg">

    <div class="page-content">
        <div class="row wrap-panel">
            <div class="col-sm-12 col-md-12">
                <div class="w-panel-box panel-height-auto">
                    <ul class="w-list-items">
                    <li>
                        <label>Accounting Firm Info</label>
                        <div>
                            <p><?php echo $customContent['Records'][0]['company_name']; ?></p>
                            <p><?php echo $customContent['Records'][0]['email']; ?></p>
                            <p><?php echo $customContent['Records'][0]['company_name']; ?></p>
                        </div>
                    </li>
                </ul>
               </div>
            </div>
    </div> 

        <div class="page-content">
            <div class="row wrap-panel">
                <div class="col-sm-12 col-md-12">
                    <div class="w-panel-box panel-height-auto">
                        <div class="job-summary-sec">
                            <ul class="w-list-items ">
                                <li>
                                    <div>Servicing Area</div>
                                    <div><?php echo $customContent['Records'][0]['servicing_area']; ?></div>
                                </li>

                                 <?php
                                 foreach(json_decode($customContent['Records'][0]['attached_files'],true) as $file) {
                                     echo " <p>" . $file['name'] . "</p>";
                                  foreach($file['files'] as $fileinfo) {
                                    echo "<p>" . "<a href='javascript:void(0);'>" . "<img src='images/pdf-icon.svg'>" .  $fileinfo['name'] ."</a>" . "</p>";
                                  }
                                   


                                 }


                                 
                                 ?>



                                <!-- <li v-for="file in ">
                                    <p>Certificate of Currency</p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                </li>



                                <li>
                                    <p>Driver's License of Directory</p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                    <p><a href="javascript:void(0);"><img src="images/pdf-icon.svg"> Download sample.pdf</a></p>
                                </li> -->
                            </ul>
                            
                        </div>
                   </div>
                </div>
                <div class="clearfix"></div>
            </div>

   
</div>
<div class="clearfix">
</div>
</div>

<div id="cover"></div>

<script type="text/javascript">
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        template: '<div class="tooltip tooltip-custom-1" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });
});

jQuery('body').on('click', '.btn-edit-onbrdfields', function () {

    var fn = jQuery(this).closest('.added-description').find('.user-field-name-onbrd').text();
    var ft = jQuery(this).closest('.added-description').find('.user-field-type-onbrd').text();
    var st = jQuery(this).closest('.added-description').find('.user-field-consumer-onbrd').text();

    jQuery('#onbrd_field_name').val(fn);
    jQuery('#onbrd_field_type').val(ft);
    jQuery('#onbrd_steps').val(st);

    jQuery('#OnboardingFields').modal('show');

    tr_row_update = jQuery(this).closest('.added-description');

});

jQuery('body').on('click', '.icon.icon-toggle.arrow-up', function () {
    var current = $(this).closest(".custom-list-box-onbrd").parent('li');
    current.prev(".added-description").before(current);
});
jQuery('body').on('click', '.icon.icon-toggle.arrow-down', function () {
    var current = $(this).closest(".custom-list-box-onbrd").parent('li');
    current.next(".added-description").after(current);
});

    jQuery('body').on('click', '#job-table tbody tr', function () {
        window.location ='freelancer.html';
    });
</script>
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/custom-nicescroll.js" type="text/javascript">
</script>
</body>
</html>
