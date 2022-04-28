<?php 
include 'jobs.php';
$job_id = $_GET['jobId'];
$user_id = $_GET['userId'];

$jobDetails = getContent($job_id);
$jobFiles = getFiles($job_id);
$userDetails = getFreelancerDetails($user_id);

$quoteDetails = getJobQuotes($job_id);

//echo json_encode($quoteDetails);


$job_completion = '';
$job_type = '';

if ($jobDetails['Records'][0]['time_frame_nohurry'] == 'True') {
    $job_completion = 'No hurry';
}else if ($jobDetails['Records'][0]['time_frame_urgent'] == 'True') {
    $job_completion = 'Urgent';
}else {
    $job_completion = $jobDetails['Records'][0]['completion_date'];
}


if ($jobDetails['Records'][0]['is_job_type_contract'] == 'True' && $jobDetails['Records'][0]['is_job_type_fulltime'] == 'True' ) {

    $job_type = "<p>Full Time</span></p>
    <p>Contract</span> </p>";

}else if ($jobDetails['Records'][0]['is_job_type_contract'] == 'False' && $jobDetails['Records'][0]['is_job_type_fulltime'] == 'True' )

    $job_type  = "<p>Full Time</span></p>";
else if  ($jobDetails['Records'][0]['is_job_type_contract'] == 'True' && $jobDetails['Records'][0]['is_job_type_fulltime'] == 'False' )

    $job_type  = "<p></span><span class='title'>Contract</span><p>";

else {
    $job_type = '';
}


 $fixed_amount = $jobDetails['Records'][0]['is_payment_fixed'] == 'True' ? $jobDetails['Records'][0]['payment_amount'] : "";
 $hourly_amount = $jobDetails['Records'][0]['is_payment_hourly'] == 'True' ? $jobDetails['Records'][0]['payment_amount'] : "";
?>


<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
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
    <link href="https://bootstrap.arcadier.com/adminportal_pre/css/html5imageupload.css" rel="stylesheet"
        type="text/css">
    <link href="https://bootstrap.arcadier.com/adminportal_pre/css/switch-btn.css" rel="stylesheet" type="text/css">
    <!-- Pagination style -->
    <link href="https://bootstrap.arcadier.com/adminportal/css/pagination.css" rel="stylesheet" type="text/css">
    <!-- custom style-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"
        type="text/css">
    <link href="https://bootstrap.arcadier.com/adminportal/css/style.css" rel="stylesheet" type="text/css">
    <!-- responsive style-->
    <link href="https://bootstrap.arcadier.com/adminportal/css/responsive.css" rel="stylesheet" type="text/css">
    <link href="css/job-details.css" rel="stylesheet" type="text/css">

    </meta>
</head>

<!-- <div class="col-sm-9 main-content" id="main"> -->
<!-- <div class="page-header">
    <div class="pull-left">
        <div class="wrapper">
            <div class="mb-0 navigation-bar page-topnav">
                <a href="index.php" class="mybtn btn-back"><img src="images/back.svg" alt="Back">Back</a>
            </div>
        </div>
    </div>
    <div class="clearfix">
    </div>
</div> -->

<div class="page-content">


    <div class="gutter-wrapper">
        <div class="navigation-bar page-topnav">
            <a href="index.php" class="mybtn btn-back"><img src="images/back.svg" alt="Back">Back</a>
        </div>

        <div class="panel-box">
            <div class="merchant-commission-table">
                <table class="table scheduler-tbl" id="quotes-table">
                    <thead>
                        <tr>
                            <th>Quoted by</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Availability</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                            <?php  
                             foreach($quoteDetails['Records']  as $quote) {
                             ?>
                             <?php  $userDetails = getFreelancerDetails($quote['freelancer_id']);  ?>
                          <tr class="border-hover"> 
                            <td data-th="Quoted by"><a href="quoted-details.php?jobId=<?php echo $job_id ?> &userId=<?php echo $quote['freelancer_id'] ?>">  <?php echo $userDetails['Records'][0]['company_name'] ?> </a></td>
                            <td data-th="Date"><?php echo $quote['CreatedDateTime'] ?></td>
                            <td data-th="Amount">AUD <?php echo $quote['total'] ?></td>
                            <td data-th="Availability"><?php echo $quote['availability_date'] ?></td>
                            <td data-th="Status">Available until <?php echo $quote['validity_date'] ?> </td>
                        </tr>
                         <?php  } ?>
                    </tbody>

                </table>

            </div>

        </div>



           

    </div>
</div>
<div class="clearfix"></div>
<!-- </div> -->
<div id="cover"></div>

<script type="text/javascript">
$(document).ready(function() {
    $('.hide-show-other-file').click(function() {
        if ($(this).text() == 'View Files') {
            $(this).text('Hide Files');
            $(this).closest('.other-main').find('.other-file').slideDown();
        } else {
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