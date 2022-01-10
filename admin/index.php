<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <!-- begin header -->
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
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
<link href="css/style.css" rel="stylesheet" type="text/css">
</meta>
</head>
<!-- end header -->

   
        <div class="page-content">
            <div class="gutter-wrapper">
                <div class="panel-box border-none">
                    <div class="page-content-top">
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>Manage your jobs</h4>
                                <h5>Monitor and keep track of the list of jobs available in your marketplace</h5>

                                <div class="pull-right">
                                    <a class="blue-btn" href="job_fields.php">Customise Job Fields</a>
                                    <a class="blue-btn" href="seller_details.php">Customise On-boarding Fields</a>
                                </div>
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
                                        <li role="presentation" class="active"><a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">Jobs</a></li>
                                        <li role="presentation"><a href="#approvals" aria-controls="approvals" role="tab" data-toggle="tab">Approvals</a></li>
                                    </ul>
                                </div>
                                <div class="topnav-right">
                                    <div class="col-md-12">
                                        <div class="left inline-controls">
                                            <input class="left date-control form-control" placeholder="Search Name or Email" type="text" name="from-date" id="from-date">
                                        </div>
                                        <div class="left inline-controls">
                                            <select class="form-control">
                                                <option>All</option>
                                            </select>
                                        </div>
                                        <div class="left inline-controls">
                                            <button class="blue-btn">Search</button>
                                        </div>
                                        <div class="left inline-controls">
                                            <button class="clear-btn">Clear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <!-- tab description -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="jobs">
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
                                                    <td data-th="Job ID"><a :href="'job-details.php?jobId=' + job.Id">{{ job.Id }}</a></td>
                                                    <td data-th="Lodged by"><a :href="'job-details.php?jobId=' + job.Id">{{job.buyer_email}}</a></td>
                                                    <td data-th="Job Location"><a :href="'job-details.php?jobId=' + job.Id">{{job.inperson_work_address}}</a></td>
                                                   
                                                    <td data-th="Job Type" v-if="job.job_type_contract=='True' &&  job.job_type_full_time=='True'"><a href="freelancer.html">Contract,Full Time</a></td>
                                                    <td data-th="Job Type" v-else-if="job.job_type_contract=='True'"><a href="">Contract</a></td>
                                                    <td data-th="Job Type" v-else-if="job.job_type_full_time=='True'"><a href="">Full Time</a></td>
                                                    <td data-th="Job Type" v-else="job.job_type_full_time=='False' && job.job_type_contract=='False' "><a href="">--</a></td>
                                                   
                                                    <!-- <td data-th="Payment Type" v-if="job.payment_hourly=='True' && job.payment_fixed=='True" ><a href="freelancer.html">Fixed,Hourly</a></td> -->
                                                    <td data-th="Payment Type" v-if="job.payment_fixed=='True'"><a href="">Fixed</a></td>
                                                    <td data-th="Payment Type" v-if="job.payment_hourly=='True'" ><a href="">Hourly</a></td>
                                                  
                                                    <td data-th="Job to be completed by"><a href=""><span class="text-danger">{{ job.time_frame_timestamp }}</span></a></td>
                                                    <td data-th="Availability"><a href=""><span class="text-danger">{{ job.job_availability}}</span></a></td>
                                                    <td data-th="No.of Quote"><a href="">{{ job.no_of_quotes}}</a></td>
                                                    <td data-th="Status"><a href="">{{ job.status}}</a></td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                </div>
                                <div class="pagination-center pb-20"><nav class="text-center" id="pagination-container-job" aria-label="Page navigation"></nav></div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="approvals">
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
                                                     <th v-for="field in uploadCustomFields"> {{  field['name'] }}</th>

                                                    <th>Approval Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="field in allFreelancers" class="border-hover" >

                                                    <td data-th="Email" nowrap><a :href="'freelancer_details.php?customid=' + field.Id">{{field.email}}</a></td>
                                                    
                                                    <td data-th="Company Name" nowrap><a :href="'freelancer_details.php?customid=' + field.Id">{{field.company_name}}</a></td> 
                                                    <td data-th="Address" nowrap><a :href="'freelancer_details.php?customid=' + field.Id">{{field.full_address}}</a></td>
                                                    
                                                 
                                                    <td data-th="Servicing Area" nowrap><a :href="'freelancer_details.php?customid=' + field.Id">{{field.servicing_area}} <span data-toggle="tooltip" title="AA, BB, CC" class="txt-green">3 More</span></td> 
                                                   
                                                    <td v-for="fields in uploadCustomFields" :data-th="fields.name"><a :href="'freelancer_details.php?customid=' + field.Id"><span class="txt-green">1 File(s)</span></a></td>
                                                   
                                                
                                                    <td v-if="field.status=='Approved'" data-th="Approval Status"><a :href="'freelancer_details.php?customid=' + field.Id"><span class="status-approve" id="status">{{field.status}}</span></a></td>
                                                    <td v-if="field.status=='Rejected'" data-th="Approval Status"><a :href="'freelancer_details.php?customid=' + field.Id"><span class="status-rejected" id="status">{{field.status}}</span></a></td>
                                                    <td v-if="field.status=='Pending'" data-th="Approval Status"><a :href="'freelancer_details.php?customid=' + field.Id"><span class="status-rejected" id="status">{{field.status}}</span></a></td>
                                                   
                                                   
                                                    <td data-th="Action">
                                                        <div class="btn-accept-reject" v-if="field.status=='Pending'">
                                                            <button class="btn blue-btn" id="accept-button" :data-id="field.Id" v-on:click="updateStatus('Approved', $event)">Accept</button>
                                                            <button class="btn gre-btn"id="reject-button" :data-id="field.Id" v-on:click="updateStatus('Rejected', $event)">Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                                <div class="pagination-center pb-20"><nav class="text-center" id="pagination-container-approvals" aria-label="Page navigation"></nav></div>
                            </div>
                        </div>
                        <!-- tab description -->
                    </div>

                </div>
            </div>
    
   
    <div class="clearfix">
    </div>
</div>

<div id="cover"></div>
 <!-- begin footer -->
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

    $('#pagination-container-job').pagination({
        dataSource: [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        //            totalNumber: 5,
        //            pageSize: 10,
        //            locator: 'items',
        callback: function (data, pagination) {
            $('#job-table').html($('#job-table').html());
        }
    });
    $('#pagination-container-approvals').pagination({
        dataSource: [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        //            totalNumber: 5,
        //            pageSize: 10,
        //            locator: 'items',
        callback: function (data, pagination) {
            $('#approvals-table').html($('#approvals-table').html());
        }
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
        jQuery('body').on('click', '#approval-table tbody tr', function () {
            window.location ='freelancer.html';
        });
</script>
<script src="https://bootstrap.arcadier.com/adminportal_pre/js/custom-nicescroll.js" type="text/javascript">
</script>


<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
<script type="text/javascript" src="scripts/manage.js"></script>
<script type="text/javascript" src="scripts/scripts3.js"></script>

         <!-- end footer -->
</body>
</html>
