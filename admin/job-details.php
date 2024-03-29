
<?php 
include 'jobs.php';
$job_id = $_GET['jobId'];
$user_id = $_GET['userId'];

$jobDetails = getContent($job_id);
$jobFiles = getFiles($job_id);
$userDetails = getFreelancerDetails($user_id);

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

    $job_type = "<p>Full Time</span></p>
    <p>Contract</span> </p>";

}else if ($jobDetails['Records'][0]['job_type_contract'] == 'False' && $jobDetails['Records'][0]['job_type_full_time'] == 'True' )

    $job_type  = "<p>Full Time</span></p>";
else if  ($jobDetails['Records'][0]['job_type_contract'] == 'True' && $jobDetails['Records'][0]['job_type_full_time'] == 'False' )

    $job_type  = "<p></span><span class='title'>Contract</span><p>";

else {
    $job_type = '';
}
?>
   

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1" name="viewport">
<title>Job Details</title>
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
<link href="css/job-details.css" rel="stylesheet" type="text/css">

</meta>
</head>

<!-- <div class="col-sm-9 main-content" id="main"> -->
    <div class="page-header">
        <div class="pull-left">
            <div class="wrapper">
                <div class="mb-0 navigation-bar page-topnav">
                    <a href="index.php" class="mybtn btn-back"><img src="images/back.svg" alt="Back">Back</a>
                </div>
            </div>
        </div>
        <div class="clearfix">
        </div>
    </div>
    
    <div class="page-content">
               
                
      <div class="row wrap-panel">


          <div class="col-sm-12 col-md-12">

              <!-- <div class="w-panel-box panel-height-auto">
                  <ul class="w-list-items">
                  <li>
                      <label>Accounting Firm Info</label>
                      <div>
                          <p>Sample Company Name One</p>
                          <p>company@gmail.com</p>
                          <p>99999999</p>
                      </div>
                  </li>
              </ul>
              </div> -->

          </div>
          <div class="clearfix"></div>
      </div>
      
<div class="row wrap-panel row-flex">
<div class="col-sm-6 col-md-6">
<!-- <div class="w-panel-box panel-height-auto">
  <ul class="w-list-items">
      <li>
          <label>Date</label>
          <p></p>
      </li>
      <li>
          <label>Amount</label>
          <p>$1500</p>
      </li>
      <li>
          <label>Availability</label>
          <p>DD/MM/YYYY</p>
      </li>
      <li>
          <label>Status</label>
          <p>Valid to DD/MM/YYYY</p>
      </li>
  </ul>
</div> -->
</div>
<!--
<div class="col-sm-6 col-md-6">
<div class="w-panel-box panel-height-auto">
  <ul class="w-list-items">
      <li>
          <label>Deposit required</label>
          <p>7 Days, AUD $0.00</p>
      </li>

      <li>
          <label>Date Payment Method</label>
          <p>- COD</p>
          <p>- Credit Card</p>
          <p>- Paypal</p>
      </li>
      <li class="text-scroll">
          <label>Comments on Payment Terms</label>
          <div class="text-area">
              <p>Estore parum hitias cus quae nosamus esti dolorerum imporro in poremquam, imil ea por re voloreribus maio temqui nate se suntotatiis ut ma sequos nos volupta tatemporrum que aut et omnis voluptas millam aliquam, si dit eiumquid quisitatem exped es eaquas quatemp erestio reperem etus exera quiassite et quia eria non eatur restis eumenda vendant volor magnis re, nonsene vit que doles est aliquuntur audiaes ad quis necupta testestion enem quae il eum invelle catenditibus el molorro mo et eos et exerorum qui utem cus mi, offic tem duciend ellatiunt ex elic tem ium intem ut et andae soluptat</p>
          </div>
          
      </li>
  </ul>
</div>
</div>
-->
<div class="clearfix"></div>
</div>

      <div class="wrap-panel job-summary-sec">
          <div class="custom-user-field-sec">
              <ul class="w-list-items">
                  <li class="job-content-height">
                      <label>Job Summary</label>
                      <?php 
                       foreach(json_decode($jobDetails['Records'][0]['task_type_list'],true) as $task) {
                        echo "<p>-" .  $task . "</p>";
                      //  <div class='qq-title'><span class='dash'></span><span class='title'>$task</span></div>";
                   
                     }

                    ?>

                      <!-- <p>- BAS Agent</p>
                      <p>- Tax</p>
                      <p>- Audit</p>
                      <p>- Book-keeping</p>
                      <p>- Payroll</p>
                      <p>- Finance</p> -->


                      <?php
                               try {
                                foreach(json_decode($jobFiles['Records'][0]['all_tasks'],true) as $custom_task) {
                                    //   echo "<div class='qq-title'><span class='dash'></span><span class='title'>$task</span><div class='qq-option'><input type='text' class='numbersOnlyD' placeholder='AUD 0.00' value=''><a href='javascript:void(0);' class='save-link'>Save</a>|<a href='javascript:void(0);' class='cancel-link'>Cancel</a></div></div>";
                                     
                                    echo "<div class='other-main'>
                                    <p>-" .  $custom_task['task_name'] . "(<a class='hide-show-other-file' href='". substr($custom_task['files'][0]['name'], 36) . "'>View Files</a>)</p> </div>";
                                   
                            
                                    //echo "<div class='qq-title'><span class='dash'></span><span class='title'>" .  $custom_task['task_name'] . "  </span><p>".  substr($custom_task['files'][0]['name'], 36) . "  | <a href=" . $custom_task['files'][0]['URL'] . ">Download File</a></p>  </div>";
                                   }

                               }catch(Exception $e) {
                              //  echo 'Message: ' .$e->getMessage();
                               } ?>
                    
                      
                  </li>
                  <li class="job-content-height">
                      <label>Job to be completed by: <span class="text-danger"><?php echo $job_completion ?></span></label>
                      <p>- Availability: <?php echo $jobDetails['Records'][0]['job_availability'] ?></p>
                      <?php echo $job_type; ?>
                      <p>- Hourly:  <span>AUD <?php echo $jobDetails['Records'][0]['payment_hourly_value'] ?></span></p>
                      <p>- Fixed Price: <span>AUD <?php echo $jobDetails['Records'][0]['payment_fixed_value'] ?></span></p>
                  </li>
                 
                  <li class="text-scroll">
                      <label>Comments on Applicant</label>
                      <div class="text-area">
                          <p><?php echo $jobDetails['Records'][0]['comments'] ?></p>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      
      
  </div>
</div>
<div class="clearfix"></div>
<!-- </div> -->
<div id="cover"></div>

<script type="text/javascript">


$(document).ready(function () {
     $('.hide-show-other-file').click(function () {
         if($(this).text()=='View Files'){
             $(this).text('Hide Files');
             $(this).closest('.other-main').find('.other-file').slideDown();
         }else{
            $(this).closest('.other-main').find('.other-file').slideUp();
             $(this).text('View Files');
         }
     });

});


</script>
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/custom-nicescroll.js" type="text/javascript">
</script>
</body>
</html>
