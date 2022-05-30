<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- begin header -->

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Reverse Marketplace</title>
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
    <link href="css/landing.css" rel="stylesheet" type="text/css">

    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/pager.css" rel="stylesheet" type="text/css">
    </meta>
</head>
<!-- end header -->

<?php 

include 'callAPI.php';

$baseUrl = getMarketplaceBaseUrl();
?>
<div class="page-content">
    <div class="gutter-wrapper">

        <div class="panel-box border-none settings-div panel-remove-margin panel-content-gutter-half">
            <div class="page-content-top">
                <div class="row row-center-flex">
                    <div class="col-sm-5">
                        <a href="job_fields.php?action=none">
                            <h4>Lodging job field</h4>
                        </a>
                        <h5>View and add the field for buyer to fill in during lodging job process</h5>
                    </div>
                    <div class="col-sm-7">
                        <div class="auto pull-right text-right">
                            <button class="btn cmn-btn-clear" id="btn-add-new-steps"
                                onclick="location.href='job_fields.php?action=edit-steps'" type="button">Add/Edit
                                Steps</button>
                            <button class="btn cmn-btn-blue" id="btn-add-new-field"
                                onclick="location.href='job_fields.php?action=add-fields'" type="button">Add new
                                fields</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="panel-box border-none settings-div panel-remove-margin panel-content-gutter-half">
            <div class="page-content-top">
                <div class="row row-center-flex">
                    <div class="col-sm-7"><a href="job_fields.php?action=none">
                            <a href="seller_details.php?action=none">
                                <h4>Merchant onboarding fields</h4>
                            </a>
                            <h5>View and add the field for seller to fill in.</h5>
                    </div>
                    <div class="col-sm-5">
                        <div class="auto pull-right text-right">
                            <button class="btn cmn-btn-clear" id="btn-add-new-steps"
                                onclick="location.href='seller_details.php?action=edit-steps'" type="button">Add new
                                steps</button>
                            <button class="btn cmn-btn-blue" id="btn-add-new-field"
                                onclick="location.href='seller_details.php?action=add-fields'" type="button">Add new
                                fields</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="panel-box border-none panel-remove-margin panel-content-gutter-half">
            <div class="page-content-top">
                <div class="row row-center-flex">
                    <div class="col-sm-7">
                        <h4>Email Template</h4>
                        <h5>Customize the email and html for your notifications sent to your users</h5>
                    </div>
                    <div class="col-sm-5">
                        <div class="auto pull-right text-right">
                            <a href="email-template.php" class="btn cmn-btn-clear" id="" type="button">View Setting</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="panel-box border-none panel-content-gutter-half">
            <div class="page-content-top">

                <div class="row row-center-flex">
                    <div class="col-sm-7">
                        <h4>Payment Settings</h4>
                        <h5>Setup your payment method and customise your fee</h5>
                    </div>
                    <div class="col-sm-5">
                        <div class="auto pull-right text-right">
                            <a href="payment-settings.php" class="btn cmn-btn-clear" id="" type="button">View
                                Setting</a>
                        </div>
                    </div>
                </div>


            </div>
        </div>



        <div class="panel-box border-none mb-0">
            <div class="page-content-top">
                <div class="row">
                    <div class="col-sm-12">
                        <h4>Manage your jobs</h4>
                        <h5>Monitor and keep track of the list of jobs available in your marketplace</h5>

                        <!-- <div class="pull-right">
                            <a class="blue-btn" href="job_fields.php">Customise Job Fields</a>
                            <a class="blue-btn" href="seller_details.php">Customise On-boarding Fields</a>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content-tab-jobs" id="app">


            <div class="panel-box tabular">
                <div class="top-search-menu">
                    <div class="row">
                        <div class="col-md-4">
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active"><a href="#jobs" aria-controls="jobs" role="tab"
                                        data-toggle="tab">Jobs</a></li>
                                <li role="presentation"><a href="#approvals" aria-controls="approvals" role="tab"
                                        data-toggle="tab">Approvals</a></li>
                                <!-- <li role="presentation"><a href="#payments" aria-controls="payments" role="tab"
                                        data-toggle="tab">Payments</a></li>
                                <li role="presentation"><a href="#tab_email" aria-controls="tab_email" role="tab"
                                        data-toggle="tab">Email</a></li> -->
                            </ul>
                        </div>
                        <div class="topnav-right">
                            <div class="col-md-12">
                                <div class="left inline-controls">
                                    <input class="left date-control form-control" placeholder="Search Name or Email"
                                        type="text" name="from-date" id="from-date">
                                </div>
                                <!-- <div class="left inline-controls">
                                    <select class="form-control">
                                        <option>All</option>
                                    </select>
                                </div> -->
                                <div class="left inline-controls">
                                    <button class="blue-btn" onclick="tableSearch(this)">Search</button>
                                </div>
                                <div class="left inline-controls">
                                    <button class="clear-btn" onclick="clearTableSearch(this)">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tab description -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="jobs">
                    <div class="page-topnav secondnary-topnav">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="tiny-list-wrap">
                                    <div class="total-item tiny-list">
                                        <div class="bold-item-title" id="job-count"></div>
                                        <div class="light-item-txt">Results Found</div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="panel-box tabular">

                        <div class="job-tab-table">
                            <div class="scroll-table-container">
                                <table class="scroll-table table" id="job-table">
                                    <thead>
                                        <tr>
                                            <th>Job ID</th>
                                            <th>Lodged by</th>
                                            <th>Job Location</th>
                                            <th>Job Type</th>
                                            <th>Payment Type</th>
                                            <th>Job to be completed by</th>
                                            <th>Availability</th>
                                            <th>No.of Quote</th>
                                            <th>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="job in allJobs" class="border-hover">
                                            <td data-th="Job ID"><a
                                                    :href="'job-details.php?jobId=' + job.Id">{{ job.Id }}</a></td>
                                            <td data-th="Lodged by"><a
                                                    :href="'job-details.php?jobId=' + job.Id">{{job.buyer_email}}</a>
                                            </td>
                                            <td data-th="Job Location"><a
                                                    :href="'job-details.php?jobId=' + job.Id">{{job.in_person_work_address}}</a>
                                            </td>

                                            <td data-th="Job Type"
                                                v-if="job.is_job_type_contract=='True' &&  job.is_job_type_fulltime=='True'">
                                                <a href="">Contract,Full Time</a>
                                            </td>
                                            <td data-th="Job Type" v-else-if="job.is_job_type_contract=='True'"><a
                                                    href="">Contract</a></td>
                                            <td data-th="Job Type" v-else-if="job.is_job_type_fulltime=='True'"><a
                                                    href="">Full Time</a></td>
                                            <td data-th="Job Type"
                                                v-else="job.is_job_type_fulltime=='False' && job.is_job_type_contract=='False' ">
                                                <a href="">--</a>
                                            </td>

                                            <!-- <td data-th="Payment Type"
                                                v-if="job.payment_hourly=='True' && job.payment_fixed=='True"><a
                                                    href="freelancer.html">Fixed,Hourly</a></td> -->
                                            <td data-th="Payment Type" v-if="job.is_payment_fixed=='True'"><a
                                                    href="">Fixed</a></td>
                                            <td data-th="Payment Type" v-if="job.is_payment_hourly=='True'"><a
                                                    href="">Hourly</a></td>

                                            <td data-th="Job to be completed by" v-if="job.time_frame_date != 'False'">
                                                <a href=""><span
                                                        class="text-danger">{{ job.completion_date }}</span></a>
                                            </td>
                                            <td data-th="Job to be completed by"
                                                v-if="job.time_frame_urgent =='True' && job.time_frame_date == 'False'">
                                                <a href=""><span class="text-danger">Urgent</span></a>
                                            </td>
                                            <td data-th="Job to be completed by"
                                                v-if="job.time_frame_nohurry =='True' && job.time_frame_date == 'False' ">
                                                <a href=""><span class="text-danger">No hurry</span></a>
                                            </td>

                                            <td data-th="Availability"><a href=""><span
                                                        class="text-danger">{{ job.job_validity}}</span></a></td>
                                            <td data-th="No.of Quote"><a
                                                    :href="'quote-details.php?jobId=' + job.Id">{{ job.no_of_quotes}}</a>
                                            </td>
                                            <td data-th="Status"><a href="">{{ job.status}}</a></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="pagination-center pb-20">
                        <nav class="text-center" id="pagination-container-job" aria-label="Page navigation">
                            <div class="paginationjs">
                                <div class="paginationjs-pages">
                                    <ul class="page-list">
                                        <li class="paginationjs-prev" value="prev">
                                            <a href="javascript:void(0);">«</a>
                                        </li>

                                        <!-- <div id="plinks1" class="plinks">
                                        </div> -->

                                        <!-- <li v-for="i in paginationcountJobs" v-on:click="fetchDataJobs(i)" :value="i"
                                            :class="{active: i === currentPageJobs}"><a href="#">{{ i }}</a>
                                        </li> -->
                                        <!-- <li class="paginationjs-page J-paginationjs-page active" data-num="1"><a>1</a>
                                        </li>
                                        <li class="paginationjs-page J-paginationjs-page" data-num="2"><a href="">2</a>
                                        </li>
                                        <li class="paginationjs-page J-paginationjs-page" data-num="3"><a href="">3</a>
                                        </li>
                                        <li class="paginationjs-page J-paginationjs-page" data-num="4"><a href="">4</a>
                                        </li>
                                        <li class="paginationjs-page J-paginationjs-page" data-num="5"><a href="">5</a>
                                        </li> -->

                                        <li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"
                                            value="next"><a href="javascript:void(0);">»</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>

                </div>
                <div role="tabpanel" class="tab-pane" id="approvals">
                    <div class="page-topnav secondnary-topnav">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="tiny-list-wrap">
                                    <div class="total-item tiny-list">
                                        <div class="bold-item-title" id="approval-count"></div>
                                        <div class="light-item-txt">Results Found</div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="panel-box tabular">
                        <div class="job-tab-table">
                            <div class="scroll-table-container">
                                <table class="scroll-table table" id="approval-table">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Company Name</th>
                                            <th>Address</th>
                                            <th>Servicing Area</th>
                                            <!-- dynamic file upload headers -->
                                            <!-- <th v-for="field in uploadCustomFields"> {{  field['name'] }}</th> -->
                                            <th>Comment</th>
                                            <th>Approval Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="field in allFreelancers" class="border-hover">

                                            <td data-th="Email" nowrap><a
                                                    :href="'freelancer_details.php?customid=' + field.Id">{{field.email}}</a>
                                            </td>

                                            <td data-th="Company Name" nowrap><a
                                                    :href="'freelancer_details.php?customid=' + field.Id">{{field.company_name}}</a>
                                            </td>
                                            <td data-th="Address" nowrap><a
                                                    :href="'freelancer_details.php?customid=' + field.Id">{{field.full_address}}</a>
                                            </td>


                                            <td data-th="Servicing Area" nowrap><a
                                                    :href="'freelancer_details.php?customid=' + field.Id">{{field.servicing_area}}
                                                    <!-- <span data-toggle="tooltip" title="AA, BB, CC" class="txt-green">3
                                                        More</span></td> -->

                                                    <!-- <td v-for="fields in uploadCustomFields" :data-th="fields.name"><a
                                                    :href="'freelancer_details.php?customid=' + field.Id"><span
                                                        class="txt-green">1 File(s)</span></a></td> -->

                                            <td data-th="Comment">
                                                <a href="javascript:void(0);" onclick="openComment(this);"
                                                    class="onboarding-comment" :data-id="field.Id">
                                                    <i class="icon icon-onboarding-comment"></i>
                                                </a>


                                            </td>

                                            <td v-if="field.status=='Approved'" data-th="Approval Status"><a
                                                    :href="'freelancer_details.php?customid=' + field.Id"><span
                                                        class="status-approve" id="status">{{field.status}}</span></a>
                                            </td>
                                            <td v-if="field.status=='Rejected'" data-th="Approval Status"><a
                                                    :href="'freelancer_details.php?customid=' + field.Id"><span
                                                        class="status-rejected" id="status">{{field.status}}</span></a>
                                            </td>
                                            <td v-if="field.status=='Pending'" data-th="Approval Status"><a
                                                    :href="'freelancer_details.php?customid=' + field.Id"><span
                                                        class="status-rejected" id="status">{{field.status}}</span></a>
                                            </td>


                                            <td data-th="Action">
                                                <div class="btn-accept-reject" v-if="field.status=='Pending'">
                                                    <button class="btn blue-btn" id="accept-button" :data-id="field.Id"
                                                        onclick="onboardingAccept(this);">Accept</button>
                                                    <button class="btn gre-btn" id="reject-button" :data-id="field.Id"
                                                        onclick="onboardingReject(this);">Reject</button>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="pagination-center pb-20">
                        <nav class="text-center" id="pagination-container-approvals" aria-label="Page navigation">
                            <div class="paginationjs">
                                <div class="paginationjs-pages">
                                    <ul class="page-list">
                                        <li class="paginationjs-prev" value="prev">
                                            <a href="javascript:void(0);">«</a>
                                        </li>

                                        <!-- <li v-for="i in paginationcountApproval" v-on:click="fetchDataApprovals(i)"
                                            :value="i" :class="{active: i === currentPageApproval}"><a
                                                href="#">{{ i }}</a>
                                        </li> -->
                                        <!-- <li class="paginationjs-page J-paginationjs-page active" data-num="1"><a>1</a></li><li class="paginationjs-page J-paginationjs-page" data-num="2"><a href="">2</a></li><li class="paginationjs-page J-paginationjs-page" data-num="3"><a href="">3</a></li><li class="paginationjs-page J-paginationjs-page" data-num="4"><a href="">4</a></li><li class="paginationjs-page J-paginationjs-page" data-num="5"><a href="">5</a></li> -->

                                        <li class="paginationjs-next J-paginationjs-next" value="next" data-num="2"
                                            title="Next page"><a href="javascript:void(0);">»</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

                <div role="tabpanel" class="tab-pane" id="payments">
                    <div class="panel--box tabular">


                        <div class="panel-box payment-content">
                            <div class="page-content-btm">
                                <div class="language-selected-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>PAYMENT METHOD</th>
                                                <th>MANDATORY</th>
                                                <th>STATUS</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbLanguageRow">
                                            <tr>
                                                <td>
                                                    <div class="payment-stripe"></div>
                                                </td>
                                                <td>
                                                    <div class="onoffswitch">
                                                        <input type="checkbox" name="onoffswitch"
                                                            class="onoffswitch-checkbox" id="myonoffswitch2p"
                                                            checked="">
                                                        <label class="onoffswitch-label" for="myonoffswitch1"> <span
                                                                class="onoffswitch-inner"></span> <span
                                                                class="onoffswitch-switch"></span> </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="payment-status-color2"></div>
                                                    <div class="payment-status">Active</div>

                                                </td>
                                                <td><a href="stripe.php"><span
                                                            class="btn-payment-link">Settings</span></a>
                                                    <div class="animation-svg"><a href="stripe.php"></a></div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div><b>Cash on delivery*</b></div>
                                                </td>
                                                <td>
                                                    <div class="onoffswitch">
                                                        <input type="checkbox" name="onoffswitch"
                                                            class="onoffswitch-checkbox" id="myonoffswitchcod">
                                                        <label class="onoffswitch-label" for="myonoffswitchcod"> <span
                                                                class="onoffswitch-inner"></span> <span
                                                                class="onoffswitch-switch"></span> </label>
                                                    </div>
                                                </td>
                                                <td>

                                                    <?php 


                                                    ?>
                                                    <div id="payment-cod-indicator" class="payment-status-color2"></div>
                                                    <div class="payment-status-cod">Active</div>
                                                </td>
                                                <td><a href="cod.php"><span class="btn-payment-link">Settings</span></a>
                                                </td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <form class="job_customise">
                            <div class="panel-box panel-remove-margin">
                                <div class="page-content-top">
                                    <h4>Customise your fees</h4>
                                    <p>Money to be charged by the Marketplace Operator and paid to the operator.</p>
                                </div>
                                <div class="page-content-btm">
                                    <h5 class="frame-title">Buyer Setting</h5>
                                    <div class="row">
                                        <div class="col-md-6 ff-sm-panel">
                                            <div class="form-group" v-for="charge in chargesListBuyer"
                                                :charge-type="charge.is_fixed">
                                                <label :for="charge.Id" class="">{{ charge.title }}</label>
                                                <div v-if="charge.is_fixed==0">
                                                    <div class="meta-item-radio radio-style-1">
                                                        <div class="fancy-radio">
                                                            <input type="radio" :checked="charge.type == 'fixed'"
                                                                value="fixed" class="radio-ccheckbox" :name="charge.Id"
                                                                :id="charge.Id + '_fixed'">
                                                            <label :for="charge.Id + '_fixed'">
                                                                <span>Fixed Price</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="meta-item-radio radio-style-1">
                                                        <div class="fancy-radio">
                                                            <input type="radio" :checked="charge.type == 'percentage'"
                                                                value="percentage" class="radio-ccheckbox"
                                                                :name="charge.Id" :id="charge.Id + '_percent'">
                                                            <label :for="charge.Id + '_percent'">
                                                                <span>Percentage</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="charge.is_fixed==0" class="job-fonoffswitch">

                                                    <div class="form-input-prefix doller-prefix">
                                                        <input type="text" class="required form-control input-style-3"
                                                            :id="charge.Id" :value="charge.value">
                                                    </div>

                                                    <div class="onoffswitch">
                                                        <input v-if="charge.status=='False'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'">
                                                        <input v-if="charge.status=='True'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'" checked>
                                                        <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                            <span class="onoffswitch-inner"></span> <span
                                                                class="onoffswitch-switch"></span></label>
                                                    </div>
                                                </div>

                                                <div v-if="charge.is_fixed==1" class="job-fonoffswitch">
                                                    <div v-if="charge.is_fixed==1"
                                                        class="form-input-prefix doller-prefix">
                                                        <input type="text" class="required form-control input-style-3"
                                                            :id="charge.Id" :value="charge.value">
                                                    </div>

                                                    <div class="onoffswitch">
                                                        <input v-if="charge.status=='False'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'">
                                                        <input v-if="charge.status=='True'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'" checked>
                                                        <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                            <span class="onoffswitch-inner"></span> <span
                                                                class="onoffswitch-switch"></span></label>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div class="panel-box">
                                <div class="page-content-btm">
                                    <h5 class="frame-title">Seller Setting</h5>

                                    <div class="row">
                                        <div class="col-md-6 ff-sm-panel">
                                            <div class="form-group" v-for="charge in chargesListSeller"
                                                :charge-type="charge.is_fixed">
                                                <label :for="charge.Id" class="">{{ charge.title }}</label>
                                                <div v-if="charge.is_fixed==0">
                                                    <div class="meta-item-radio radio-style-1">
                                                        <div class="fancy-radio">
                                                            <input type="radio" :checked="charge.type == 'fixed'" value="
                                                                fixed" class="radio-ccheckbox" :name="charge.Id"
                                                                :id="charge.Id + '_fixed'">
                                                            <label :for="charge.Id + '_fixed'">
                                                                <span>Fixed Price</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="meta-item-radio radio-style-1">
                                                        <div class="fancy-radio">
                                                            <input type="radio" :checked="charge.type == 'percentage'"
                                                                value="percentage" class="radio-ccheckbox"
                                                                :name="charge.Id" :id="charge.Id + '_percent'">
                                                            <label :for="charge.Id + '_percent'">
                                                                <span>Percentage</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="charge.is_fixed==0" class="job-fonoffswitch">

                                                    <div class="form-input-prefix doller-prefix">
                                                        <input type="text" class="required form-control input-style-3"
                                                            :id="charge.Id" :value="charge.value">
                                                    </div>

                                                    <div class="onoffswitch">
                                                        <input v-if="charge.status=='False'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'">
                                                        <input v-if="charge.status=='True'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'" checked>

                                                        <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                            <span class="onoffswitch-inner"></span> <span
                                                                class="onoffswitch-switch"></span></label>
                                                    </div>
                                                </div>

                                                <div v-if="charge.is_fixed==1" class="job-fonoffswitch">
                                                    <div v-if="charge.is_fixed==1"
                                                        class="form-input-prefix doller-prefix">
                                                        <input type="text" class="required form-control input-style-3"
                                                            :id="charge.Id" :value="charge.value">
                                                    </div>

                                                    <div class="onoffswitch">
                                                        <input v-if="charge.status=='False'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'">
                                                        <input v-if="charge.status=='True'" type="checkbox"
                                                            name="onoffswitch" class="onoffswitch-checkbox"
                                                            :id="charge.Id + '_toggle'" checked>
                                                        <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                            <span class="onoffswitch-inner"></span> <span
                                                                class="onoffswitch-switch"></span></label>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                        <div class="btn-area">
                                            <button onclick="job_customise();" class="btn cmn-btn-blue"
                                                id="btn-save-charges" type="button">Save</button>
                                        </div>

                                    </div>
                                </div>
                        </form>


                    </div>
                </div>


            </div>

            <!-- tab description -->
            <div role="tabpanel" class="tab-pane" id="tab_email">

                <div class="panel-box panel-style-ab">
                    <div class="panel-box-title">
                        <h3>Merchant / Consumer</h3>
                        <div class="pull-right"><a class="panel-toggle" href="javascript:void(0);"><i
                                    class="icon icon-toggle"></i></a></div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="panel-box-content">
                        <ul>
                            <ul>
                                <li>
                                    <h5> New Merchant Registration</h5>
                                    <p>Sent to Admin for every new Merchant sign up.</p> <a
                                        href="<?php echo $baseUrl ?>/admin/plugins/ed0f2131-3ef2-4ef1-9fb8-e20224eb1887/edit_content.php?pageid=9a733374-1e37-47e1-9d96-128eb4bfb15f"
                                        id="9a733374-1e37-47e1-9d96-128eb4bfb15f" class="action-edit-template"
                                        target="_blank">Edit</a>
                                </li>


                                <li>
                                    <h5> Merchant / Applicant Registration approved</h5>
                                    <p>Sent to applicants once their application has been approved.</p>
                                    <a href="<?php echo $baseUrl ?>/admin/plugins/ed0f2131-3ef2-4ef1-9fb8-e20224eb1887/edit_content.php?pageid=bd61f087-b718-4396-b947-534ab382f3c0"
                                        id="bd61f087-b718-4396-b947-534ab382f3c0" class="action-edit-template"
                                        target="_blank">Edit</a>
                                </li>

                                <li>
                                    <h5> Merchant / Applicant Registration rejected</h5>
                                    <p>Sent to applicants once their application has been rejected.</p> <a
                                        href="<?php echo $baseUrl ?>/admin/plugins/ed0f2131-3ef2-4ef1-9fb8-e20224eb1887/edit_content.php?pageid=0f3e3f4b-80f6-423f-b8c4-d3b16f3afae7"
                                        id="0f3e3f4b-80f6-423f-b8c4-d3b16f3afae7" class="action-edit-template"
                                        target="_blank">Edit</a>
                                </li>


                                <li>
                                    <h5> New Job Lodged</h5>
                                    <p>Sent to merchants once a new job has been added.</p> <a
                                        href=" <?php echo $baseUrl ?>/admin/plugins/ed0f2131-3ef2-4ef1-9fb8-e20224eb1887/edit_content.php?pageid=267348f3-9a39-4f36-9091-0854179cb682"
                                        id="267348f3-9a39-4f36-9091-0854179cb682" class="action-edit-template"
                                        target="_blank">Edit</a>
                                </li>


                                <li>
                                    <h5> Quotation Accepted</h5>
                                    <p>Sent to merchant once the buyer accepted the quotation.</p> <a
                                        href="<?php echo $baseUrl ?>/admin/plugins/ed0f2131-3ef2-4ef1-9fb8-e20224eb1887/edit_content.php?pageid=4bcfd5ae-712f-434d-83a3-377756e82f41"
                                        id="4bcfd5ae-712f-434d-83a3-377756e82f41" class="action-edit-template"
                                        target="_blank">Edit</a>
                                </li>
                                <li>
                                    <h5> Quotation Rejected</h5>
                                    <p>Sent to merchant once the buyer rejected the quotation.</p> <a
                                        href="<?php echo $baseUrl ?>/admin/plugins/ed0f2131-3ef2-4ef1-9fb8-e20224eb1887/edit_content.php?pageid=ac8c6077-2078-4045-ad71-4ea95c3ca4db"
                                        id="ac8c6077-2078-4045-ad71-4ea95c3ca4db" class="action-edit-template"
                                        target="_blank">Edit</a>
                                </li>

                            </ul>
                        </ul>
                    </div>
                </div>

                <!-- <div class="panel-box panel-style-ab">
                    <div class="panel-box-title">
                        <h3>User Account</h3>
                        <div class="pull-right"><a class="panel-toggle" href="javascript:void(0);"><i
                                    class="icon icon-toggle"></i></a></div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="panel-box-content">
                        <ul>

                        </ul>
                    </div>
                </div> -->
                <!-- <div class="panel-box panel-style-ab">
                    <div class="panel-box-title">
                        <h3>Bookings</h3>
                        <div class="pull-right"><a class="panel-toggle" href="javascript:void(0);"><i
                                    class="icon icon-toggle"></i></a></div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="panel-box-content">
                        <ul>

                          
                        </ul>
                    </div>
                </div> -->



            </div>
        </div>

    </div>
</div>


<div class="clearfix">
</div>
</div>

<div id="onboardingComment" class="modal modal-text-area fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <input type="hidden" id="comment-id">
            <!-- <div class="modal-header">
             <div class="pull-left">
                <h5 class="modal-title"></h5>
             </div>
             <div class="pull-right">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
             </div>
             <div class="clearfix"></div>
          </div> -->
            <div class="modal-body">

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-element">
                            <label>Send a comment to the merchant</label>
                            <textarea class="form-control required" id="comment-content"></textarea>
                            <!-- <input type="text" name="url" id="url" class="form-control required" value=""> -->
                        </div>
                        <!-- <div class="form-element">
                         <label for="ip-address">IP Address</label>
                         <input type="text" name="ip-address" id="ip-address" class="form-control" value="">
                     </div> -->
                    </div>
                </div>

            </div>
            <div class="modal-footer btn-area">
                <div><a href="#" class="gre-btn" data-dismiss="modal">Cancel</a></div>
                <div><a data-dismiss="modal" href="javascript:void(0)" class="mybtn btn-blue"
                        id="save-comment-list">Send</a></div>
            </div>
        </div>
    </div>
</div>


<div id="onboardingAccept" class="modal modal-text-area confirmation fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <div class="pull-left">
                    <h5 class="modal-title">Confirmation!</h5>
                </div>
                <!-- <div class="pull-right">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
             </div> -->
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-element">
                            <label>Are you sure you want to <strong>Accept</strong> this merchant?</label>

                        </div>
                        <!-- <div class="form-element">
                         <label for="ip-address">IP Address</label>
                         <input type="text" name="ip-address" id="ip-address" class="form-control" value="">
                     </div> -->
                    </div>
                </div>

            </div>
            <div class="modal-footer btn-area">
                <div><a href="#" class="gre-btn" onclick="onboardingModalCancel()" data-dismiss="modal">Cancel</a></div>
                <div><a data-dismiss="modal" href="javascript:void(0)" class="mybtn btn-blue accept-confirm"
                        v-on:click="updateStatus('Approved', $event)">Accept</a></div>
            </div>
        </div>
    </div>
</div>


<div id="onboardingReject" class="modal modal-text-area confirmation fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <div class="pull-left">
                    <h5 class="modal-title">Confirmation!</h5>
                </div>
                <!-- <div class="pull-right">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
             </div> -->
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-element">
                            <label>Are you sure you want to <strong>Reject</strong> this merchant?</label>

                        </div>
                        <!-- <div class="form-element">
                         <label for="ip-address">IP Address</label>
                         <input type="text" name="ip-address" id="ip-address" class="form-control" value="">
                     </div> -->
                    </div>
                </div>

            </div>
            <div class="modal-footer btn-area">
                <div><a href="#" class="gre-btn" data-dismiss="modal">Cancel</a></div>
                <div><a data-dismiss="modal" href="javascript:void(0)" class="mybtn btn-blue accept-confirm"
                        v-on:click="updateStatus('Rejected', $event)">Reject</a></div>
            </div>
        </div>
    </div>
</div>







<div id="cover"></div>
<!-- begin footer -->
<script type="text/javascript">
function openComment(x) {
    jQuery("#onboardingComment").modal('show');
    var id = $(x).attr('data-id')
    $('#comment-id').val(id);



}

function onboardingAccept(x) {
    $(x).addClass("active");
    var id = $(x).attr('data-id');
    $('.accept-confirm').attr('data-id', id);
    jQuery("#onboardingAccept").modal('show');
    if ($(".modal-backdrop").length) {
        $(".modal-backdrop").on("click", function() {
            $(".btn-accept-reject.active").removeClass("active");
        });
    }


}

function onboardingReject(x) {
    $(x).addClass("active");
    var id = $(x).attr('data-id');
    $('.accept-confirm').attr('data-id', id);
    jQuery("#onboardingReject").modal('show');
    if ($(".modal-backdrop").length) {
        $(".modal-backdrop").on("click", function() {
            $(".btn-accept-reject.active").removeClass("active");
        });
    }
}




function onboardingModalCancel() {
    $(".btn-accept-reject .btn.blue-btn.active").removeClass("active");
    $(".btn-accept-reject .btn.gre-btn.active").removeClass("active");
}



function tableSearch(x) {

    var value = $(x).parents(".top-search-menu").find('[placeholder="Search Name or Email"]').val().toLowerCase();
    if ($(x).parents(".top-search-menu").find('[role="presentation"] [href="#jobs"]').parent().hasClass("active")) {
        $("#jobs tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    } else if ($(x).parents(".top-search-menu").find('[role="presentation"] [href="#approvals"]').parent().hasClass(
            "active")) {
        $("#approvals tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    }



}

function clearTableSearch(x) {

    $(x).parents(".top-search-menu").find('[placeholder="Search Name or Email"]').val("");
    $('[onclick="tableSearch(this)"]').click();

}


// var NumPages, RecsPerPage, els1 = document.getElementById("pager1").elements,
//     els2 = document.getElementById("pager2").elements,
//     plinks1 = document.getElementById("plinks1"),
//     plinks2 = document.getElementById("plinks2");


// function setupClick() {
//     var el, n, r;
//     el = document.getElementById("NumPages");
//     el.className = ((n = (el.value >>> 0)) ? "" : "err");
//     el = document.getElementById("RecsPerPage");
//     el.className = ((r = (el.value >>> 0)) ? "" : "err");
//     if (n && r) {
//         NumPages = n;
//         RecsPerPage = r;
//         setupServerPage();
//     }
// }


// This function sets up what would normally be part of the server's HTML output.
// function setupServerPage() {
//     var totRecs = NumPages * RecsPerPage,
//         tbdy = document.getElementById("job-table").tBodies[0],
//         l = tbdy.rows.length;
//     document.getElementById("plength1").innerHTML = document.getElementById("plength2").innerHTML = totRecs +
//         " record" + ((totRecs === 1) ? "" : "s") + "<br>" + NumPages + " page" + ((NumPages === 1) ? "" : "s");
//     els1["pcount"].value = els2["pcount"].value = NumPages;
//     while (l > RecsPerPage) tbdy.deleteRow(--l);
//     while (l < RecsPerPage) tbdy.insertRow(l++).insertCell(0).innerHTML = "Some data...";
//     pageNavigate(1);
// }


// // This would be handled by a return trip to the server, if not using AJAX.
// function pageClick(e) {
//     e = e || window.event;
//     var s = e.target || e.srcElement,
//         n, p, el;
//     if (s.tagName === "A") {
//         n = (p = s.href).lastIndexOf("=") + 1;
//         pageNavigate(p.substring(n) >>> 0);
//         return false;
//     } else if ((s.tagName !== "INPUT") || (s.type !== "submit")) return;
//     if (!(n = s.name)) {
//         p = ((el = this.elements["p"]).value >>> 0);
//         if ((p <= 0) || (p > NumPages)) {
//             el.className = "err";
//             return false;
//         }
//     } else if (n === "p1") p = 1;
//     else if (n === "pprev") p = (this.elements["pcurr"].value >>> 0) - 1;
//     else if (n === "pnext") p = (this.elements["pcurr"].value >>> 0) + 1;
//     else if (n === "plast") p = (this.elements["pcount"].value >>> 0);
//     pageNavigate(p);
//     return false;
// }


// // This would also be handled by a return trip to the server, or else data records could be retrieved via AJAX.
// function pageNavigate(p) {
//     els1["p"].className = els2["p"].className = els1["p"].value = els2["p"].value = "";
//     if (p < 1) p = 1;
//     else if (p > NumPages) p = NumPages;
//     els1["p1"].disabled = els2["p1"].disabled = els1["pprev"].disabled = els2["pprev"].disabled = (p === 1);
//     els1["pnext"].disabled = els2["pnext"].disabled = els1["plast"].disabled = els2["plast"].disabled = (p ===
//         NumPages);
//     els1["pcurr"].value = els2["pcurr"].value = p;
//     // if the server is handling this, insert NON-logarithmic page links here (can be just first, current, and last page).
//     plinks1.innerHTML = plinks2.innerHTML = logarithmicPaginationLinks(NumPages, p, "?p=");
// }


// // This function produces the logarithmic pagination links.
// function logarithmicPaginationLinks(lastPage, matchPage, linkURL) {
//     function pageLink(p, page) {
//         return ((p === page) ? "<b>" + p + "</b>" : '<a href="' + linkURL + p + '">' + p + "</a>");
//     }

//     function pageGap(x) {
//         if (x === 0) return "";
//         if (x === 1) return " ";
//         if (x <= 10) return " . ";
//         if (x <= 100) return " .. ";
//         return " ... ";
//     }

//     var page = (matchPage ? matchPage : 1),
//         LINKS_PER_STEP = 5,
//         lastp1 = 1,
//         lastp2 = page,
//         p1 = 1,
//         p2 = page,
//         c1 = LINKS_PER_STEP + 1,
//         c2 = LINKS_PER_STEP + 1,
//         s1 = "",
//         s2 = "",
//         step = 1,
//         linkHTML = "";

//     while (true) {
//         if (c1 >= c2) {
//             s1 += pageGap(p1 - lastp1) + pageLink(p1, matchPage);
//             lastp1 = p1;
//             p1 += step;
//             c1--;
//         } else {
//             s2 = pageLink(p2, matchPage) + pageGap(lastp2 - p2) + s2;
//             lastp2 = p2;
//             p2 -= step;
//             c2--;
//         }
//         if (c2 === 0) {
//             step *= 10;
//             p1 += step - 1; // Round UP to nearest multiple of step
//             p1 -= (p1 % step);
//             p2 -= (p2 % step); // Round DOWN to nearest multiple of step
//             c1 = LINKS_PER_STEP;
//             c2 = LINKS_PER_STEP;
//         }
//         if (p1 > p2) {
//             linkHTML += s1 + pageGap(lastp2 - lastp1) + s2;
//             if ((lastp2 > page) || (page >= lastPage)) break;
//             lastp1 = page;
//             lastp2 = lastPage;
//             p1 = page + 1;
//             p2 = lastPage;
//             c1 = LINKS_PER_STEP;
//             c2 = LINKS_PER_STEP + 1;
//             s1 = '';
//             s2 = '';
//             step = 1;
//         }
//     }
//     return linkHTML;
// }


// document.getElementById("pager1").onclick = document.getElementById("pager2").onclick = pageClick;
// (document.getElementById("setupDiv").lastChild.onclick = setupClick)();

















$(document).ready(function() {


    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    $('[data-toggle="tooltip"]').tooltip({
        template: '<div class="tooltip tooltip-custom-1" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // charge configurations radio btt for % and fixed price

    jQuery('body').on('change', '.radio-style-1 input[type=radio]', function() {
        var value = $(this).val()
        console.log({
            value
        })
        if (value == 'fixed') {
            $(this).closest('.form-group').find('.form-input-prefix').removeClass('percentage-prefix');
            $(this).closest('.form-group').find('.form-input-prefix').addClass('fixed-prefix');
        } else {
            $(this).closest('.form-group').find('.form-input-prefix').addClass('percentage-prefix');
            $(this).closest('.form-group').find('.form-input-prefix').removeClass('fixed-prefix');
        }
    })


    $('body').on('change', '.job-fonoffswitch input[type=checkbox]', function() {
        console.log('toogle on off')
        if ($(this).prop('checked') == false) {
            $(this).closest('.job-fonoffswitch').find('input[type=text]').attr('disabled', true);
        } else {
            $(this).closest('.job-fonoffswitch').find('input[type=text]').attr('disabled', false);
        }
    });





    jQuery('body').on('click', '.btn-edit-onbrdfields', function() {

        var fn = jQuery(this).closest('.added-description').find('.user-field-name-onbrd').text();
        var ft = jQuery(this).closest('.added-description').find('.user-field-type-onbrd').text();
        var st = jQuery(this).closest('.added-description').find('.user-field-consumer-onbrd').text();

        jQuery('#onbrd_field_name').val(fn);
        jQuery('#onbrd_field_type').val(ft);
        jQuery('#onbrd_steps').val(st);

        jQuery('#OnboardingFields').modal('show');

        tr_row_update = jQuery(this).closest('.added-description');

    });

    // $('#pagination-container-job').pagination({
    //     dataSource: [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 4, 4
    //     ],
    //     //            totalNumber: 5,
    //     //            pageSize: 10,
    //     //            locator: 'items',
    //     callback: function(data, pagination) {
    //         $('#job-table').html($('#job-table').html());
    //     }
    // });
    // $('#pagination-container-approvals').pagination({
    //     dataSource: [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    //         4, 4, 4, 4,
    //         4, 4, 4, 4, 4, 4
    //     ],
    //     //            totalNumber: 5,
    //     //            pageSize: 10,
    //     //            locator: 'items',
    //     callback: function(data, pagination) {
    //         $('#approvals-table').html($('#approvals-table').html());
    //     }
    // });

    jQuery('body').on('click', '.icon.icon-toggle.arrow-up', function() {
        var current = $(this).closest(".custom-list-box-onbrd").parent('li');
        current.prev(".added-description").before(current);
    });
    jQuery('body').on('click', '.icon.icon-toggle.arrow-down', function() {
        var current = $(this).closest(".custom-list-box-onbrd").parent('li');
        current.next(".added-description").after(current);
    });

    jQuery('body').on('click', '#job-table tbody tr', function() {
        window.location = 'freelancer.html';
    });
    jQuery('body').on('click', '#approval-table tbody tr', function() {
        // window.location = 'freelancer.html';
    });

});
</script>
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/custom-nicescroll.js" type="text/javascript">
</script>


<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
<script type="text/javascript" src="scripts/manage.js"></script>
<script type="text/javascript" src="scripts/scripts3.js"></script>
<script type="text/javascript" src="scripts/payments.js"></script>

<!-- end footer -->
</body>

</html>