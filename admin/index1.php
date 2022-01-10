<?php
include 'callAPI.php';
include 'admin_token.php';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">
<!-- begin header -->

<head>

    <meta https-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Custom Fields</title>
    <link href="css/adminstyle.css" rel="stylesheet" type="text/css">
    <link href="css/user-custom-fields.css" rel="stylesheet" type="text/css">
    <link href="css/checkbox.css" rel="stylesheet" type="text/css">
    <link href="css/tempo.css" rel="stylesheet" type="text/css">
    <style type="text/css">
        .consumer-box {
            padding-top: 20px;
            border-top: 1px solid #d9d9d9;
            margin-top: 15px;
        }
    </style>
</head>
<!-- end header -->

<body>
    <div class="page-merchant page-user-custom-fields">
        <div class="mobi-header visible-xs">
            <div class="container">
                <div class="pull-left">
                    <div class="brand-logo"><a href="#"><img alt="logo" src="https://bootstrap.arcadier.com/adminportal/images/brand-logo.png"></a></div>
                </div>
                <div class="pull-right">
                    <button type="button" class="navbar-toggle"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="main">

            <div class="col-sm main-content">

                <div class="page-content page-layout">
                    <div class="gutter-wrapper">
                        <div class="page-topnav" style="height: 5px;">
                            <div class="float">
                                <a class="btn-info-plug-in" href="" target="_blank">How to use this Plug-In?</a>
                            </div>
                        </div>
                        <div class="panel-box ">
                            <div class="page-content-top field-icon">
                                <div><i class="icon icon-3x field-icon-big"></i></div>
                                <div>
                                    <p>Define the fields for Freelancer's registration.</p>
                                </div>

                                <div class="form-element custom-code">
                                    <a href="#" class="blue-btn al-middle" data-toggle="modal" data-target="#customfields">Add new field</a>
                                </div>

                            </div>
                            <div class="panel-box ">
                                <div class="custom-field-infos">
                                    <!-- <h2>Custom field details<i class="icon icon-3x field-arrow-icon-big"></i></h2> -->
                                    <h2>Input fields details<span class="up"><img src="./images/chevron_black_up.svg" alt="" title=""></span></h2>
                                    <div class="custom-field-control">
                                        <div class="custom-field-containers">
                                            <label class="custom-field-title">Text:</label>
                                            <span class="custom-field-description">Users will be able to enter free form
                                                information
                                            </span>
                                        </div>
                                        <div class="custom-field-containers">
                                            <label class="custom-field-title">Number:</label>
                                            <span class="custom-field-description">Users will be able to enter numbers
                                            </span>
                                        </div>
                                        <div class="custom-field-containers">
                                            <label class="custom-field-title">Checkbox:</label>
                                            <span class="custom-field-description">User will be able to check this field
                                                before continuing
                                            </span>
                                        </div>
                                        <div class="custom-field-containers">
                                            <label class="custom-field-title">Dropdown:</label>
                                            <span class="custom-field-description">User will be able to select a value
                                                from a dropdown list. <br><br>
                                            </span>
                                        </div>
                                        <div class="custom-field-containers">
                                            <!-- <label class="custom-field-title" style="color:red;">Under
                                                Enhancement:</label> -->
                                            <!-- <span class="custom-field-description">Disable to remove a profile input
                                                field. In the next update, a “delete” option will be available.</span> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                        <div class="panel-box ">
                            <div class="page-content-pagination-page">
                                <table class="table" id="customfieldslist">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody id="user-custom-field">
                                        <tr>
                                            <?php
                                            $baseUrl = getMarketplaceBaseUrl();
                                            $admin_token = getAdminToken();
                                            $customFieldPrefix = getCustomFieldPrefix();

                                            $url = $baseUrl . '/api/v2/users/';
                                            $result = callAPI("GET", $admin_token['access_token'], $url, false);
                                            $userId = $result['ID'];

                                            $url = $baseUrl . '/api/v2/admins/' . $userId . '/custom-field-definitions';
                                            $customfields = callAPI("GET", $admin_token['access_token'], $url, false);
                                            foreach ($customfields['Records'] as $customfield) {
                                                $customcode =  $customfield['Code'];
                                                $customcode  =  explode("-", $customcode);
                                                if ($customcode[7] == 'REV_INPUT') {

                                                    $customfield_code = $customfield['Code'];
                                                    $customfield_name =  $customfield['Name'];
                                                    $customfield_type = $customfield['DataInputType'];

                                                    echo  "<td>" .  $customfield_name  . "</td>";

                                                    echo "<td>" .  ucfirst($customfield_type) . " </td>";
                                                    echo "<td>";
                                            ?>
                                                    <a href="#" data-toggle="modal" dir="<?php echo $customfield_code; ?>" data-target="#customfields" id="edit"><i class="icon icon-edit"></i></a>
                                                    <a href="#" dir="<?php echo $customfield_code; ?>" class="btn_delete_act" id="del"><i class="icon icon-delete"></i></a>
                                                    </td>
                                        </tr>
                                <?php
                                                }
                                            }

                                ?>
                                    </tbody>
                                </table>
                            </div>
                            <div class="clearfix"></div>
                        </div>

                        <div class="popup  popup-area popup-delete-confirm " id="DeleteCustomMethod">

                            <div class="wrapper"> <a href="javascript:;" class="close-popup"><img src="images/cross-icon.svg"></a>

                                <div class="content-area">

                                    <p>Are you sure you want to delete this?</p>

                                </div>

                                <div class="btn-area text-center smaller">

                                    <input type="button" value="Cancel" class="btn-black-mdx " id="popup_btncancel">

                                    <input id="popup_btnconfirm" type="button" value="Okay" class="my-btn btn-blue" onclick="deleteField()">

                                    <div class="clearfix"></div>

                                </div>

                            </div>

                        </div>

                        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="customfields" id="customfields">

                            <input type="hidden" class="custom_id" value="" dir="">


                            <div class="modal-dialog modal-cm" role="document">
                                <div class="modal-content">
                                    <form class="needs-validation" id="createcampaign2" novalidate>
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><img src="images/cross-icon.svg"></button>
                                            <h4 class="modal-title" id="gridSystemModalLabel">Custom Field Details</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="form-element">
                                                        <label>Custom Field Name</label>
                                                        <input type="text" name="" class="w-100 " id="custom_name" required="required" />
                                                    </div>
                                                </div>
                                                <div class="col-sm-12" id="customtypediv">
                                                    <div class="form-element">
                                                        <label>Type</label>
                                                        <div class="form-element">
                                                            <select class='select-table-style' id='customType'>
                                                                <option value='textfield'>Text</option>
                                                                <option value='number'>Number</option>
                                                                <option value='checkbox'>Checkbox</option>
                                                                <option value='dropdown'>Dropdown</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- classification of form details -->
                                                <div class="col-sm-12" id="classificationdiv">
                                                    <div class="form-element">
                                                        <label>Form Details Classification</label>
                                                        <div class="form-element">
                                                            <select class='select-table-style' id='classification'>
                                                                <option value='registration'>Registration</option>
                                                                <option value='verification_details'>Verification Details</option>
                                                                <option value='verification'>Verification</option>
                                                                <option value='approval'>Approval</option>
                                                                <option value='start'>Start</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>


                                                

                                                <div class="form-element options cstm-fieldpop-optarea" style="display:none;">
                                                    <label>Options</label>
                                                    <ul class="ui-sortable" id="dropdown-opt-draggble">
                                                        <li class="maindiv ui-sortable-handle">
                                                            <div class="virtual-table">
                                                                <div class="virtual-table-cell"><a href="#" class="cursor-move"><i class="icon icon-draggble"></i></a></div>
                                                                <div class="virtual-table-cell"><input type="text" value="" name="checkbox-opt[]" id="optionName" class="required" class="txt"></div>
                                                                <div class="virtual-table-cell"><a href="#" class="delete-opt" onclick="delete_opt(this)"><i class="icon icon-delete"></i></a></div>
                                                            </div>
                                                        </li>

                                                    </ul>

                                                    <span class="addOpt"><i class="fa fa-plus"></i>Add Option</span>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="modal-footer text-left">
                                            <input type="button" class="blue-btn" value="Save changes" id="saveCustomDetails">
                                            <!-- data-dismiss="modal" -->
                                        </div>
                                    </form>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                        </div><!-- /.modal -->


                        <div id="cover"></div>
                        <div id="coverdark"></div>
                    </div>

                </div>
            </div>
            <!-- begin footer -->

            <script type="text/javascript"></script>
            <script type="text/javascript">
                $(window).load(function() {
                    dynmic_align();

                    $('.custom-field-infos h2').click(function(e) {
                        $('.custom-field-infos h2 span').toggleClass('up');
                        if (!$('.custom-field-infos h2 span').hasClass('up')) {
                            $('.custom-field-infos h2 span').removeClass('up');
                            $(".custom-field-infos h2 span img").attr("src", "./images/chevron_black_down.svg");
                            $('.custom-field-control').css({
                                display: "none"
                            });
                        } else {
                            $('.custom-field-infos h2 span').addClass('up');
                            $(".custom-field-infos h2 span img").attr("src", "./images/chevron_black_up.svg");
                            $('.custom-field-control').css({
                                display: "block"
                            });
                        };
                        e.preventDefault();
                    });






                    $('#popup_btncancel,.close-popup').click(function() {

                        $('#DeleteCustomMethod').hide();

                        $('#cover').hide();
                        jQuery("#customField").fadeOut();
                        jQuery('.option-list .option-box:gt(0)').remove();
                        jQuery('.option-list .option-box').find('input[type="text"]').val('');
                    });








                    $(window).resize(function() {
                        dynmic_align();
                    });
                });

                function dynmic_align() {
                    $(".list_row .added_range").each(function() {
                        var reporting = $(this).height();
                        var height = $(".delivery-options .boxed_layout .item-actions").height();
                        var padAmount = (reporting / 2) - (height / 2);
                        $(this).next(".delivery-options .boxed_layout .item-actions").css('padding-top', padAmount);
                    });
                }
                $(function() {
                    $("#dropdown-opt-draggble").sortable();
                    $("#dropdown-opt-draggble").disableSelection();
                });
            </script>

            <script type="text/javascript" src="scripts/scripts3.js"></script>
            <!-- end footer -->
        </div>
</body>

</html>