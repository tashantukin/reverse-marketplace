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

 $fixed_amount = $jobDetails['Records'][0]['is_payment_fixed'] == 'True' ? number_format((float)$jobDetails['Records'][0]['payment_amount'],2) : "";
 $hourly_amount = $jobDetails['Records'][0]['is_payment_hourly'] == 'True' ? number_format((float)$jobDetails['Records'][0]['payment_amount'],2) : "";

$style = "";
if ($quotedDetails['Records'][0]['status'] != 'Quoted') {
    $style =  "style='display:none'";
}



?>

<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Market Place :: Applicant's Quote</title>
    <!-- core js -->
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery-min.js"></script>
    <!-- bootstrap js -->
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/moment.min.js"></script>
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap-datetimepicker.min.js">
    </script>
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
    <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap-datetimepicker.min.css" rel="stylesheet"
        type="text/css">
    <link href="https://bootstrap.arcadier.com/spacetime/css/fancy-radio.css" rel="stylesheet" type="text/css">
    <link href="https://bootstrap.arcadier.com/spacetime/css/pagination.css" rel="stylesheet" type="text/css">

    <!-- custom style-->


    <!-- responsive style-->
    <link href="https://bootstrap.arcadier.com/spacetime/css/responsive.css" rel="stylesheet" type="text/css">
    <link href="css/custom.css" rel="stylesheet" type="text/css">
    <!-- modal style-->
    <link href="https://bootstrap.arcadier.com/spacetime/css/modal.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/style.css" />
    <link href="https://bootstrap.arcadier.com/package/reverse/css/custom.css" rel="stylesheet" type="text/css">
    <link href="https://bootstrap.arcadier.com/spacetime/css/style.css" rel="stylesheet" type="text/css">

    <style>
    .my-btn {
        padding: 0px;

    }

    .btn-red {
        padding: 0px;
    }
    </style>
</head>

<?php
//include 'jobs.php';
// $user_id = $_GET['userId'];
// $userDetails = getFreelancerDetails($user_id);

?>

<body class="seller-items">

    <div class="main">
        <div class="content-pages">
            <div class="freelancer-content-main">
                <div class="container">
                    <div class="page-reverse-title">
                        <h1>Applicant's Quote</h1>
                    </div>
                    <div class="quote-question-section">
                        <div class="navtab-flex">
                            <div class="quote-title-design"><?php echo $userDetails['Records'][0]['company_name'] ?>
                                <input type="hidden" id="merchant-key"
                                    value="<?php echo $userDetails['Records'][0]['stripe_key'] ?>" />
                            </div>
                        </div>


                        <div class="quote-question-main rm-quote-bottom">
                            <h4>1. Applicant Details</h4>
                            <div class="quotedtitle-flex">
                                <div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span
                                        class="qdesc"><?php echo $quotedDetails['Records'][0]['quote_by'] ?></span>
                                </div>
                                <div class="job-quotedtitle"><span class="qtitle">Date</span><span
                                        class="qdesc"><?php echo date('d/m/Y H:i', $quotedDetails['Records'][0]['CreatedDateTime']); ?></span>
                                </div>
                                <div class="job-quotedtitle"><span class="qtitle">Amount</span><span
                                        class="qdesc">$<?php echo $quotedDetails['Records'][0]['all_total'] ?></span>
                                </div>
                                <div class="job-quotedtitle"><span class="qtitle">Availability</span><span
                                        class="qdesc"><?php echo $quotedDetails['Records'][0]['availability_date'] ?></span>
                                </div>
                                <div class="job-quotedtitle"><span class="qtitle">Status</span><span
                                        class="qdesc"><?php echo $quotedDetails['Records'][0]['status'] ?></span></div>
                            </div>
                        </div>
                        <!-- <div class="quote-info-message-box">
                                                        <div class="infoflex-area">
                                                            <div class="quote-msg-box">
                                                            <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 39" width="46" height="39"><title>Page 1</title>
                                                            <style>tspan { white-space:pre }.shp0 { fill: none;stroke: #ffffff;stroke-width: 4 } .shp1 { fill: none;stroke: #ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width: 4 } </style>
                                                            <g id="Page 1">
                                                            <path id="Path 75" class="shp0" d="M30.92 2.45L2.98 2.45C2.58 2.45 2.25 2.77 2.25 3.16L2.25 11.42L2.25 19.67L2.25 26.72C2.25 27.01 2.43 27.27 2.7 27.38C2.79 27.42 2.88 27.43 2.98 27.43C3.17 27.43 3.35 27.36 3.49 27.22L10.43 20.39L30.92 20.39C31.32 20.39 31.65 20.07 31.65 19.67L31.65 3.16C31.65 2.77 31.32 2.45 30.92 2.45Z" />
                                                            <path id="Path 76" class="shp1" d="M39.55 14.98L42.54 14.98C42.88 14.98 43.16 15.25 43.16 15.59L43.16 22.62L43.16 29.65L43.16 35.65C43.16 35.9 43.01 36.12 42.78 36.22C42.7 36.25 42.62 36.26 42.54 36.26C42.37 36.26 42.22 36.2 42.1 36.09L36.17 30.26L18.65 30.26C18.31 30.26 18.03 29.99 18.03 29.65L18.03 27.6" />
                                                            </g>
                                                            </svg><span>The applicant will like to ask some questions.</span>
                                                            </div>
                                                            <button type="button" class="btn btn-send-message">Send a Message</button>
                                                        </div>
                                                    </div> -->


                        <div class="quote-question-main">
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="quote-question-section">
                                        <h4>2. Job Summary</h4>


                                        <?php
                               foreach(json_decode($quotedDetails['Records'][0]['job_summary'],true) as $task) {
                                    echo "<div class='qq-title'><span class='dash'></span><span class='title'>" . $task['title'] . "</span><div class='qq-option'><span>AUD <b>" . $task['price'] ." </b></span></div></div>";


                               }
                            ?>
                                        <!-- <div class="qq-title"><span class="dash"></span><span class="title">BAS Agent</span></div>
                        <div class="qq-title"><span class="dash"></span><span class="title">Tax</span><div class="qq-option"><span>AUD <b>0.00</b></span></div></div>
                        <div class="qq-title"><span class="dash"></span><span class="title">Audit</span><div class="qq-option"><span>AUD <b>0.00</b></span></div></div>
                        <div class="qq-title"><span class="dash"></span><span class="title">Book-keeping</span><div class="qq-option"><span>AUD <b>10.00</b></span></div></div>
                        <div class="qq-title"><span class="dash"></span><span class="title">Payroll</span></div>
                        <div class="qq-title"><span class="dash"></span><span class="title">Finance</span></div>
                        <div class="qq-title"><span class="dash"></span><span>Other Jobs 1</span>
                            <p>  File 1 | <a href="#">Download File</a></p>
                        </div>
                        <div class="qq-title"><span class="dash"></span><span>Other Jobs 2</span><p>  File 2 | <a href="#">Download File</a></p>
                        </div> -->
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="info-box">
                                        <p>Email: <?php echo $userDetails['Records'][0]['email'] ?></p>
                                        <p>Name: <?php echo $userDetails['Records'][0]['company_name'] ?></p>
                                        <p>Contact Number: <?php echo $userDetails['Records'][0]['contact_number'] ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="quote-question-section">
                                        <div class="qq-title"><span class="dash"></span><span class="title">Total</span>
                                            <div class="qq-option"><span>AUD
                                                    <b><?php echo $quotedDetails['Records'][0]['total'] ?></b></span>
                                            </div>
                                        </div>
                                        <div class="qq-title"><span class="dash"></span><span class="title">All at once
                                                - Discount</span>
                                            <div class="qq-option"><span>AUD
                                                    <b><?php echo $quotedDetails['Records'][0]['all_discount'] ?></b></span>
                                            </div>
                                        </div>
                                        <div class="qq-title"><span class="dash"></span><span class="title">All at once
                                                - Total</span>
                                            <div class="qq-option"><span>AUD
                                                    <b><?php echo $quotedDetails['Records'][0]['all_total'] ?></b></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="quote-question-section">
                                        <div class="qq-title">Job to be completed by: <span class="danger">
                                                <?php echo $job_completion ?></span></div>
                                        <div class="qq-title"><span class="dash"></span><span
                                                class="title">Availability</span><span><?php echo $quotedDetails['Records'][0]['availability_date'] ?></span>
                                        </div>
                                        <?php echo $job_type ?>
                                        <div class="qq-title"><span class="dash"></span><span
                                                class="title">Hourly</span><span>AUD
                                                <?php echo $hourly_amount ?></span>
                                        </div>
                                        <div class="qq-title"><span class="dash"></span><span class="title">Fixed
                                                Price</span><span>AUD
                                                <?php echo $fixed_amount ?></span>
                                        </div>

                                        <div class="form-group">
                                            <label for="comments">Comments to applicant:</label>
                                            <div class="comment-desc">
                                                <?php echo $jobDetails['Records'][0]['comments'] ?></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="quote-question-main">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="quote-question-section">
                                        <h4>3. Payment</h4>
                                        <div class="qq-title"><span class="title">Deposit Required <span
                                                    class="black-color">(7days)</span></span>
                                            <div class="qq-option"><span>AUD
                                                    <b><?php echo $quotedDetails['Records'][0]['deposit_amount'] ?></b></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="comments">Comments on payment terms:</label>
                                            <div class="comment-desc">
                                                <?php echo $quotedDetails['Records'][0]['comments_on_terms'] ?></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="quote-question-section">
                                        <div class="qq-title">Payment method:</div>
                                        <div class="qq-title"><span class="dash"></span><span class="title">COD</span>
                                        </div>
                                        <div class="qq-title"><span class="dash"></span><span class="title">Credit
                                                Card</span></div>
                                        <div class="qq-title"><span class="dash"></span><span
                                                class="title">PayPal</span></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="navtab-flex">
                            <div class="checkbox-row-flex">
                                <div class="checkbox-width custom-fancyjb">
                                    <div <?php echo $style ?> class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" name="read_and_agreed" id="read_and_agreed">
                                        <label for="read_and_agreed"><span>I have read and agreed to the quote
                                                presented.</span></label>
                                    </div>
                                </div>
                            </div>
                            <div class="navtab-filter">
                                <button <?php echo $style ?>class="btn btn-quote-cancel btnsubmit" id="accept"
                                    data-toggle="modal">Accept</button>
                                <button <?php echo $style ?> class="btn btn-quote-reject btnsubmit" data-toggle="modal"
                                    id="reject">Reject</button>
                                <button <?php echo $style ?> class="btn btn-quote-submit" data-toggle="modal"
                                    data-target="#cancelModal" id="cancel">Cancel</button>

                                <?php 
                                    if ($quotedDetails['Records'][0]['status'] == 'Accepted') {
                                        echo "<button class='btn btn-quote-submit'
                                     data-toggle='modal'data-target='#paymentModalComplete' id='done'>Mark as Complete</button>";
                                }
                                ?>
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
                                <li><a href="#"><img
                                            src="https://bootstrap.arcadier.com/spacetime/images/fb_login.svg"></a>
                                </li>
                                <li><a href="#"><img
                                            src="https://bootstrap.arcadier.com/spacetime/images/goo_login.svg"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button class="modal-close close"></button>
        </div>
    </div>

    <div class="modal fade modal-align-center" id="cancelModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-job-popup">
                        <div class="modal-title">
                            <h4>Would you like to look at it later?</h4>
                        </div>

                        <div class="text-center">
                            <p>You may revisit the quote sent in by the applicant<br>at a later time if you wish to do
                                so.</p>
                        </div>
                        <div class="btn-hbox">
                            <a class="btn btn-block btn-jobform-fill" href="/">Yes</a>
                            <button type="button" class="btn btn-block btn-jobform-outline"
                                data-dismiss="modal">No</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="modal fade modal-align-center" id="acceptModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-job-popup">
                        <div class="modal-title">
                            <h4>Would you like to proceed?</h4>
                        </div>

                        <div class="text-center">
                            <p>After submission of choice, no changes can be <br>made after choosing to proceed.</p>
                        </div>
                        <div class="btn-hbox">
                            <a class="btn btn-block btn-jobform-fill" href="/" id="accept-confirm"
                                job-id="<?php echo $job_id ?>" user-id="<?php echo $user_id ?>"
                                quote-id="<?php echo $quotedDetails['Records'][0]['Id'] ?>">Yes</a>
                            <button type="button" class="btn btn-block btn-jobform-outline"
                                data-dismiss="modal">No</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="modal fade modal-align-center" id="rejectModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-job-popup">
                        <div class="modal-title">
                            <h4>Would you like to proceed?</h4>
                        </div>

                        <div class="text-center">
                            <p>After submission of choice, no changes can be<br>made after choosing to proceed.</p>
                        </div>
                        <div class="btn-hbox">
                            <a class="btn btn-block btn-jobform-fill" href="/" id="reject-confirm"
                                job-id="<?php echo $job_id ?>" user-id="<?php echo $user_id ?>"
                                quote-id="<?php echo $quotedDetails['Records'][0]['Id'] ?>">Yes</a>
                            <button type="button" class="btn btn-block btn-jobform-outline"
                                data-dismiss="modal">No</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade payment-modal" id="paymentModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body">

                    <div id="payment" class="payment-con clearfix">
                        <input type="hidden" id="stripe-pay-id"
                            value=<?php  echo $userDetails['Records'][0]['stripe_payment_id'] ?>>
                        <h3>Payment</h3>
                        <div class="payment-middle-con ">

                            <div class="form-group">
                                <label for="paymentMethod">Payment Method</label>
                                <select class="form-control required" name="payment" id="paymentScheme">
                                    <option value="stripe">Stripe</option>
                                    <option selected value="cod">Cash on Delivery</option>

                                </select>
                            </div>

                            <div class="common-text">
                                <p>You will be charged $<span id="charge-amount"></span> to Accept a Quote</p>
                                <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to
                                    continue with your transaction</p>

                            </div>

                            <div id="card-element"> </div>
                            <!-- Used to display Element errors. -->
                            <div id="card-errors" role="alert"></div>
                            <p id="card-errors"
                                style="margin-bottom: 10px; line-height: inherit; color: #eb1c26; font-weight: bold;">
                            </p>


                        </div>

                        <div class="payment-bottom-con clearfix">
                            <div class="next-tab-area pull-right">
                                <span class="seller-btn"> <a class="my-btn btn-clear" data-dismiss="modal"
                                        href="javascript:void(0);">Cancel</a> </span>
                                <span class="seller-btn"> <a class="my-btn btn-red" id="paynowPackage"
                                        job-id="<?php echo $job_id ?>" user-id="<?php echo $user_id ?>"
                                        quote-id="<?php echo $quotedDetails['Records'][0]['Id'] ?>"
                                        href="javascript:void(0);">Pay
                                        Now</a> </span>
                            </div>
                        </div>



                    </div>




                </div>
            </div>
        </div>
    </div>

    <div class="modal fade payment-modal" id="paymentModalComplete" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body">
                    <input type="hidden" id="merchant-charge"
                        value="<?php echo $quotedDetails['Records'][0]['all_total'] ?>">

                    <div id="payment" class="payment-con clearfix">
                        <input type="hidden" id="stripe-pay-id"
                            value=<?php  echo $userDetails['Records'][0]['stripe_payment_id'] ?>>
                        <h3>Payment</h3>
                        <div class="payment-middle-con ">

                            <div class="form-group">
                                <label for="paymentMethod">Payment Method</label>
                                <select class="form-control required" name="payment" id="paymentSchemeCompleted">
                                    <option value="stripe">Stripe</option>
                                    <option selected value="cod">Cash on Delivery</option>

                                </select>
                            </div>

                            <div class="common-text">
                                <p>You will be charged $<span id="charge-amount-complete"></span> for marking the job
                                    complete
                                    and payment to the freelancer for the completed task.</p>
                                <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to
                                    continue with your transaction</p>
                            </div>

                            <div id="card-element-complete"> </div>
                            <!-- Used to display Element errors. -->
                            <div id="card-errors" role="alert"></div>
                            <p id="card-errors"
                                style="margin-bottom: 10px; line-height: inherit; color: #eb1c26; font-weight: bold;">
                            </p>


                        </div>

                        <div class="payment-bottom-con clearfix">
                            <div class="next-tab-area pull-right">
                                <span class="seller-btn"> <a class="my-btn btn-clear" data-dismiss="modal"
                                        href="javascript:void(0);">Cancel</a> </span>
                                <span class="seller-btn"> <a class="my-btn btn-red" id="paynowPackageComplete"
                                        job-id="<?php echo $job_id ?>" user-id="<?php echo $user_id ?>"
                                        quote-id="<?php echo $quotedDetails['Records'][0]['Id'] ?>"
                                        href="javascript:void(0);">Pay
                                        Now</a> </span>
                            </div>
                        </div>



                    </div>




                </div>
            </div>
        </div>
    </div>









    <!--modal register-->
    <div class="modal-overlay"></div>
    <script type="text/javascript">
    $(function() {
        var ddlData = [{
            text: "EN",
            value: 1,
            imageSrc: "images/gb.svg"
        }, {
            text: "CN",
            value: 2,
            imageSrc: "images/cn.svg"
        }, {
            text: "FR",
            value: 3,
            imageSrc: "images/fr.svg"
        }];
        $('.language-list').ddslick({
            data: ddlData,
            width: 100,
            imagePosition: "left",
            onSelected: function(selectedData) {}
        });
    });

    jQuery(document).ready(function() {

        jQuery('.datepicker').datetimepicker({
            viewMode: 'days',
            format: 'DD/MM/YYYY'
        });

        jQuery("#mobi-search").click(function() {
            jQuery(".search-bar").slideToggle();
            if (jQuery("#mobile-menu").is(":visible")) {
                jQuery("#mobile-menu").hide();
            }
            if (jQuery(".category-menu").is(":visible")) {
                jQuery(".category-menu").hide();
            }
        });

        /*nice scroll */
        jQuery("#mobile-menu > ul").niceScroll({
            cursorcolor: "#000",
            cursorwidth: "6px",
            cursorborderradius: "5px",
            cursorborder: "1px solid transparent",
            touchbehavior: true
        });

        jQuery("#menu-toggle").click(function() {
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
        jQuerymodal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            if (jQuerymodal.hasClass('state-leave')) {
                jQuerymodal.removeClass('state-leave');
            }
        });
        jQuery('.close').on('click', function() {
            jQueryoverlay.removeClass('state-show');
            jQuerymodal.removeClass('state-appear').addClass('state-leave');
            jQuery('body').removeClass('modal-open')
        });
        jQuery('#register-modal').on('click', function() {
            jQueryoverlay.addClass('state-show');
            jQuerymodal.removeClass('state-leave').addClass('state-appear');
            jQuery('html, body').animate({
                scrollTop: 0
            }, 0);
            jQuery('body').addClass('modal-open');

        });
        jQuery('body').on('click', '.btnsubmit', function() {
            var validate = 0
            if (!jQuery("#read_and_agreed").prop("checked")) {
                validate = 1;
                jQuery("#read_and_agreed").addClass('error-con');
            }
            if (!validate) {
                setTimeout(function() {
                    //window.location.href = "home-logged.html";
                }, 500);
            }
        });

        jQuery('body').on('click', '.save-link', function() {
            var $input = $(this).closest('.qq-option').find('input');
            if ($input.length > 0) {
                $(this).closest('.qq-option').html('<span>AUD <b>' + number_format($input.val(), 2) +
                    '</b></span><a href="javascript:void(0);" class="edit-link">Edit</a>');
                $input.remove();
            }
        });
        jQuery('body').on('click', '.cancel-link', function() {
            var $input = $(this).closest('.qq-option').find('input');
            if ($input.length > 0) {
                $(this).closest('.qq-option').html(
                    '<span>AUD <b>0.00</b></span><a href="javascript:void(0);" class="edit-link">Edit</a>'
                );
                $input.remove();
            }
        });
        jQuery('body').on('click', '.edit-link', function() {
            var $input = $(this).closest('.qq-option').find('span b');
            if ($input.length > 0) {
                $(this).closest('.qq-option').html(
                    '<input type="text" class="numbersOnlyD" placeholder="AUD 0.00" value="' +
                    $input.text() +
                    '"><a href="javascript:void(0);" class="save-link">Save</a>|<a href="javascript:void(0);" class="cancel-link">Cancel</a>'
                );
                $input.remove();
            }
        });

        jQuery('body').on('click', '.save-linkdate', function() {
            var $input = $(this).closest('.qq-option').find('input');
            if ($input.length > 0) {
                $(this).closest('.qq-option').html('<span><b>' + $input.val() +
                    '</b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a>');
                $input.remove();
            }
        });
        jQuery('body').on('click', '.cancel-linkdate', function() {
            var $input = $(this).closest('.qq-option').find('input');
            if ($input.length > 0) {
                $(this).closest('.qq-option').html(
                    '<span><b>DD/MM/YYYY</b></span><a href="javascript:void(0);" class="edit-linkdate">Edit</a>'
                );
                $input.remove();
            }
        });
        jQuery('body').on('click', '.edit-linkdate', function() {
            var $input = $(this).closest('.qq-option').find('span b');
            if ($input.length > 0) {
                $(this).closest('.qq-option').html(
                    '<input type="text" class="datepicker" placeholder="DD/MM/YYYY" value="' +
                    $input.text() +
                    '"><a href="javascript:void(0);" class="save-linkdate">Save</a>|<a href="javascript:void(0);" class="cancel-linkdate">Cancel</a>'
                );
                jQuery('.datepicker').datetimepicker({
                    viewMode: 'days',
                    format: 'DD/MM/YYYY'
                });
                $input.remove();
            }
        });

    });

    function number_format(number, decimals, dec_point, thousands_sep) {
        number = number * 1; //makes sure `number` is numeric value
        var str = number.toFixed(decimals ? decimals : 0).toString().split('.');
        var parts = [];
        for (var i = str[0].length; i > 0; i -= 3) {
            parts.unshift(str[0].substring(Math.max(0, i - 3), i));
        }
        str[0] = parts.join(thousands_sep ? thousands_sep : ',');
        return str.join(dec_point ? dec_point : '.');
    }

    function lockView(x) {
        jQuery('#paymentModal').modal('show');
    }
    </script>
</body>

</html>