<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">
<!-- begin header -->

<head>

    <meta https-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Custom Fields</title>
    <link href="css/onboarding-fields.css" rel="stylesheet" type="text/css">
    <style>
    #is-required {
        visibility: visible;
    }
    </style>
</head>
<!-- end header -->

<div class="page-content" id="seller-fields">
    <div class="gutter-wrapper">
        <div class="onboarding-backbtnarea">
            <a class="mybtn btn-grey" href="index.php">
                <img src="images/back.svg">
                Back
            </a>
        </div>
        <div class="panel-box border-none">
            <div class="page-content-top">
                <div class="row">
                    <div class="col-sm-8">
                        <h4>
                            Seller onboarding fields
                        </h4>
                        <h5>
                            View and add the field for seller to fill in.
                        </h5>
                    </div>
                    <div class="col-sm-4">
                        <div class="auto pull-right text-right">

                            <button class="btn cmn-btn-clear" id="btn-add-new-steps" type="button">

                                Add new steps

                            </button>
                            <button class="btn cmn-btn-blue" id="btn-add-new-field" type="button">
                                Add new fields
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content-btm-onbrd">


            <div class="panel-box tabular">

                <div class="top-search-menu">

                    <div class="row">

                        <div class="col-md-4">

                            <ul class="nav nav-tabs" role="tablist">


                            </ul>

                        </div>

                        <div class="topnav-right">

                            <div class="col-md-12 hide">

                                <div class="left inline-controls">

                                    <input class="left date-control form-control" placeholder="Search Name or Email"
                                        type="text" name="from-date" id="from-date">

                                </div>

                                <div class="left inline-controls">

                                    <select class="form-control">

                                        <option>All</option>

                                    </select>

                                </div>

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

            <div class="tab-content">

            </div>



        </div>


    </div>

</div>

</div>

<div class="clearfix">

</div>

<div class="popup popup-onbrd-fields" id="OnboardingFields">
    <input type="hidden" id="field-id">
    <input type="hidden" id="field-action">
    <div class="popup-wrapper">
        <div class="pull-right">
            <a class="close-popup" data-dismiss="modal" href="javascript:void(0)">
                <i class="icon icon-close">
                </i>
            </a>
        </div>
        <div class="popup-header">
            <h4>Add/edit field</h4>
        </div>
        <div class="popup-demo-content ">
            <div class="form-group">
                <label>Field Name*</label>
                <input :value="fieldName" type="text" class="form-control required" name="onbrd_field_name"
                    id="onbrd_field_name">
            </div>

            <div class="form-group">
                <label>Field Description*</label>
                <input :value="fieldDescription" type="text" class="form-control required" name="onbrd_field_text"
                    id="onbrd_field_text">
            </div>

            <div class="form-group">
                <label>Field Type*</label>
                <select class="form-control required" name="onbrd_field_type" id="onbrd_field_type" :value="fieldType">
                    <option value="textfield">Textfield</option>
                    <option value="number">Number</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="search">Search</option>
                    <option value="file">File Upload</option>
                </select>
            </div>


            <div class="form-element options cstm-fieldpop-optarea" style="display:none;">
                <label>Options</label>
                <ul class="ui-sortable" id="dropdown-opt-draggble">
                    <li class="maindiv ui-sortable-handle">
                        <div class="virtual-table">
                            <div class="virtual-table-cell"><a href="#" class="cursor-move"><i
                                        class="icon icon-draggble"></i></a></div>
                            <div class="virtual-table-cell"><input type="text" value="" name="checkbox-opt[]"
                                    id="optionName" class="required" class="txt"></div>
                            <div class="virtual-table-cell"><a href="#" class="delete-opt" onclick="delete_opt(this)"><i
                                        class="icon icon-delete"></i></a></div>
                        </div>
                    </li>

                </ul>

                <span class="addOpt"><i class="fa fa-plus"></i>Add Option</span>
            </div>

            <div class="form-group">
                <label>Placeholder</label>
                <input :value="placeholder" type="text" class="form-control" name="onbrd_field_placeholder"
                    id="onbrd_field_placeholder">
            </div>

            <div class="form-group">
                <label>Steps</label>
                <select class="form-control required" name="onbrd_steps" id="onbrd_steps" :value="classification">
                    <option v-for="tab in allTabs" :value=tab.Id>{{tab.tab_name}}</option>
                </select>
            </div>

            <div class="form-group">
                <div class="meta-item-checkbox">

                    <div class="fancy-checkbox checkbox-sm">

                        <input type="checkbox" value="blank_page" class="radio-ccheckbox" name="guest_user"
                            id="is-required">

                        <label for="is-required"><span>
                                <note>Require field</note>
                            </span></label>

                    </div>

                </div>
            </div>


        </div>
        <div class="popup-footer">
            <a class="mybtn btn-grey" data-dismiss="modal" href="javascript:void(0);">Cancel</a>
            <a class="mybtn btn-blue" id="btn-save-onbrdfields" href="javascript:void(0);">Save</a>
        </div>
    </div>
</div>

<div class="popup popup-onbrd-fields" id="OnboardingSteps">

    <div class="popup-wrapper">

        <div class="pull-right">

            <a class="close-popup" data-dismiss="modal" href="javascript:void(0)">

                <i class="icon icon-close">

                </i>

            </a>

        </div>

        <div class="popup-header">

            <h4>Edit steps in onboarding process</h4>

        </div>

        <div class="popup-demo-content ">

            <div class="form-group">

                <label>Add new steps</label>

                <div class="form-input-button-combo">
                    <input type="text" class="form-control required" name="onbrd_tab_name" id="onbrd_tab_name">
                    <a href="#" v-on:click="saveNewTab('POST', $event)" class="blue-btn pull-right">Add</a>
                </div>


            </div>

            <div class="form-group">

                <label>Steps</label>

                <ul class="ui-sortable sortable-list">
                    <li data-parent="1" class="has-subitems ui-sortable-handle">
                        <div class="row-wrapper main-sub">
                            <div class="row-details pull-left">
                                <div>
                                    <i class="icon icon-arrange-icon"></i>

                                </div>
                                <!-- added cursor for demo -->
                                <!-- end -->
                                <div class="name-area"><span class="item-name">Registration</span></div>

                            </div>
                            <div class="row-action pull-right">
                                <div>
                                    <!-- <a href="javascript:void(0)" id="cat_edit"><i class="icon icon-edit-2"></i></a> -->
                                </div>
                                <div><a class="delete-cat" href="javascript:void(0)" onclick="deleteSteps(this)"
                                        id="cat_delete"><i class="icon icon-delete-btn-user"></i></a></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>

                    </li>


                </ul>

            </div>





        </div>

        <div class="popup-footer">

            <a class="mybtn btn-grey" data-dismiss="modal" onclick="stepCloseMenu()"
                href="javascript:void(0);">Close</a>



        </div>

    </div>

</div>
</div>































<div id="cover"></div>

<div id="removecatok" class="popup popup-removecat">
    <div class="popup-wrapper">
        <div class="popup-body">Are you sure you want to delete this?</div>
        <div class="popup-footer">
            <input onclick="popup_close(this);" class="mybtn btn-grey" type="button" value="Cancel" name="cancel">
            <input class="mybtn btn-blue" type="button" value="Okay" name="cancel" id="seller-delete">
        </div>
        <a href="javascript:void(0)" class="close-popup" onclick="popup_close(this)"><i class="icon icon-close"></i>
        </a>
    </div>
</div>

<!-- begin footer -->
<script type="text/javascript">
var tr_row_update = 0;
jQuery(document).ready(function() {
    jQuery(window).bind('scroll', function() {
        jQuery(".sidebar").getNiceScroll().resize();

    });
    jQuery(".mobi-header .navbar-toggle").click(function(e) {
        e.preventDefault();
        jQuery("body").toggleClass("sidebar-toggled");
    });
    jQuery(".navbar-back").click(function() {
        jQuery(".mobi-header .navbar-toggle").trigger('click');
    });

    jQuery('body').on('click', '#btn-add-new-field', function() {
        jQuery('#onbrd_field_name').val('');
        jQuery('#onbrd_field_type').val('Textfield');
        jQuery('#onbrd_steps').val('1. Registration');
        jQuery('#OnboardingFields').modal('show');
    });

    jQuery('body').on('click', '.btn-edit-onbrdfields', function() {

        var fn = jQuery(this).closest('.added-description').find('.user-field-name-onbrd')
            .text();
        var ft = jQuery(this).closest('.added-description').find('.user-field-type-onbrd')
            .text();
        var st = jQuery(this).closest('.added-description').find('.user-field-consumer-onbrd')
            .text();

        jQuery('#onbrd_field_name').val(fn);
        jQuery('#onbrd_field_type').val(ft);
        jQuery('#onbrd_steps').val(st);

        jQuery('#OnboardingFields').modal('show');

        tr_row_update = jQuery(this).closest('.added-description');

    });

    jQuery('body').on('click', '#btn-save-onbrdfields', function() {

        var tv_fn = jQuery('#onbrd_field_name').val();
        var tv_ft = jQuery('#onbrd_field_type').val();
        var tv_st = jQuery('#onbrd_steps').val();
        jQuery('.popup-demo-content .required').removeClass('error-con');

        var er = 0;
        jQuery('.popup-demo-content .required').each(function() {
            var tv = jQuery(this).val();
            if (tv == '') {
                jQuery(this).addClass('error-con');
                er = 1;
            }
        });

        if (er) {
            return false;
        }


        if (tr_row_update) {
            jQuery(tr_row_update).find('.user-field-name-onbrd').text(tv_fn);
            jQuery(tr_row_update).find('.user-field-type-onbrd').text(tv_ft);
            jQuery(tr_row_update).find('.user-field-consumer-onbrd').text(tv_st);

            tr_row_update = 0;
            jQuery('#OnboardingFields').modal('hide');
            return false;
        }

        var row = '';
        row = `<li class="all-cat added-description">
                    <div class="custom-list-box-onbrd">
                        <div class="cursor-sec cursor-repositioning-onbrd">
                            <div class="repositioning-icon-onbrd">
                                <div class="pull-left">
                                    <a class="panel-toggle" href="javascript:void(0);">
                                        <i class="icon icon-toggle arrow-up">
                                        </i>
                                    </a>
                                </div>
                                <div class="pull-left">
                                    <a class="panel-toggle" href="javascript:void(0);">
                                        <i class="icon icon-toggle arrow-down">
                                        </i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="user-field-name-onbrd">` + tv_fn + `</div>
                        <div class="user-field-type-onbrd">` + tv_ft + `</div>
                        <div class="user-field-consumer-onbrd">` + tv_st + `</div>
                        <div class="user-field-action-onbrd">
                            <div class="row-action">
                                <a href="javascript:void(0);" class="btn-edit-onbrdfields"><i class="icon icon-edit-2"></i></a>
                                <a class="delete-cat" href="javascript:void(0)" onclick="delete_opt(id,this)"><i class="icon icon-delete-btn-user"></i></a>
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>
                </li>`;

        jQuery('.custom-listing-table-onbrd').append(row);
        jQuery('#OnboardingFields').modal('hide');

    });


    jQuery('body').on('click', '#btn-add-new-steps', function() {



        jQuery('#onbrd_tab_name').val('');

        jQuery('#onbrd_field_type').val('Textfield');

        jQuery('#onbrd_steps').val('1. Registration');

        jQuery('#OnboardingSteps').modal('show');

    });



});


function popup_close(ele) {
    var that = jQuery(ele);
    that.parents('.popup').fadeOut();
    jQuery("#cover").fadeOut();

}

function delete_opt(id, ele) {
    var that = jQuery(ele);
    var row = that.closest('li');
    var id = that.attr('data-id');
    $('#field-id').val(id);
    console.log({
        id
    })
    jQuery("#removecatok").fadeIn();
    jQuery("#cover").fadeIn();
    jQuery("#removecatok .btn-blue").click(function() {
        row.remove();
        jQuery("#removecatok").fadeOut();
        jQuery("#cover").fadeOut();
    });
}

function addSteps(x) {

    var that = jQuery(x);
    var randomListId = Math.random().toString(36).slice(2);
    var stepsName = that.parents(".form-input-button-combo").find("input").val();

    $("#OnboardingSteps .ui-sortable").append(`
                        <li data-parent="` + randomListId + `" class="has-subitems">
                                <div class="row-wrapper main-sub">
                                    <div class="row-details pull-left">
                                        <div>
                                            <i class="icon icon-arrange-icon"></i>
                                            
                                        </div>
                                        <!-- added cursor for demo -->
                                        <!-- end -->
                                        <div class="name-area">
                                            <span class="item-name">` + stepsName + `</span>
                                            <input type="text" class="form-control hide" name="onbrd_tab_name" id="onbrd_tab_name" />
                                        </div>
                                        
                                    </div>
                                    <div class="row-action pull-right">
                                        <div><a href="javascript:void(0)" onclick="editNameSteps(this)" id="cat_edit"><i class="icon icon-edit-2"></i></a></div>
                                        <div>
                                            <a class="delete-cat" href="javascript:void(0)" onclick="deleteSteps(this)" id="cat_delete"><i class="icon icon-delete-btn-user"></i></a>
                                            <a href="javascript:void(0)" onclick="saveNameSteps(this)" class="blue-btn pull-right hide">Save</a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                
                    </li>
        
        `);

    $('[role="tablist"]').append(`<li role="presentation"><a href="#` + stepsName + `" aria-controls="` +
        stepsName +
        `" role="tab" data-toggle="tab">` + stepsName + `</a></li>`);

    $(".tab-content").append(`
        <div role="tabpanel" class="tab-pane" id="` + stepsName + `">
                                    <div class="panel-box tabular">
                                        <div class="custom-list-box-heading-onbrd white">

                                            <div class="cursor-sec cursor-repositioning-onbrd">
            
                                            </div>
            
                                            <div class="user-field-name-onbrd">
            
                                                Field Name
            
                                            </div>
            
                                            <div class="user-field-type-onbrd">
            
                                                Field Type
            
                                            </div>
            
                                            <div class="user-field-consumer-onbrd">
            
                                                <!-- Steps in lodging process -->
            
                                            </div>
            
                                            <div class="user-field-action-onbrd">
            
                                            </div>
            
                                            <div class="clearfix">
            
                                            </div>
            
                                        </div>

                                        <div class="custom_list_wrapper">

                                            <ul class="custom-listing-table-onbrd row-height-50">
            
                                                <li class="all-cat">
            
                                                    <div class="custom-list-box-onbrd">
            
                                                        <div class="cursor-sec cursor-repositioning-onbrd">
            
                                                            <div class="repositioning-icon-onbrd  ">
            
                                                                
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="user-field-name-onbrd">
            
                                                            Email
            
                                                        </div>
            
                                                        <div class="user-field-type-onbrd">
            
                                                            email
            
                                                        </div>
            
                                                        <div class="user-field-consumer-onbrd">
            
                                                            <!-- 1.Registration -->
            
                                                        </div>
            
                                                        <div class="user-field-action-onbrd">
            
                                                            
            
                                                        </div>
            
                                                        <div class="clearfix">
            
                                                        </div>
            
                                                    </div>
            
                                                </li>
            
                                                <li class="all-cat added-description">
            
                                                    <div class="custom-list-box-onbrd">
            
                                                        <div class="cursor-sec cursor-repositioning-onbrd">
            
                                                            <div class="repositioning-icon-onbrd  ">
            
                                                                
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="user-field-name-onbrd">
            
                                                            Password
            
                                                        </div>
            
                                                        <div class="user-field-type-onbrd">
            
                                                            password
            
                                                        </div>
            
                                                        <div class="user-field-consumer-onbrd">
            
                                                            <!-- 1.Registration -->
            
                                                        </div>
            
                                                        <div class="user-field-action-onbrd">
            
                                                            <div class="row-action">
            
                                                                
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="clearfix">
            
                                                        </div>
            
                                                    </div>
            
                                                </li>
            
                                                <li class="all-cat added-description">
            
                                                    <div class="custom-list-box-onbrd">
            
                                                        <div class="cursor-sec cursor-repositioning-onbrd">
            
                                                            <div class="repositioning-icon-onbrd  ">
            
                                                                <div class="pull-left">
            
                                                                    <a class="panel-toggle" href="javascript:void(0);">
            
                                                                        <i class="icon icon-toggle arrow-up">
            
                                                                        </i>
            
                                                                    </a>
            
                                                                </div>
            
                                                                <div class="pull-left">
            
                                                                    <a class="panel-toggle" href="javascript:void(0);">
            
                                                                        <i class="icon icon-toggle arrow-down">
            
                                                                        </i>
            
                                                                    </a>
            
                                                                </div>
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="user-field-name-onbrd">Company Name</div>
            
                                                        <div class="user-field-type-onbrd">text field</div>
            
                                                        <div class="user-field-consumer-onbrd">
                                                            <!-- 2. Verification Details -->
            
                                                        </div>
            
                                                        <div class="user-field-action-onbrd">
            
                                                            <div class="row-action">
            
                                                                <a href="javascript:void(0);" class="btn-edit-onbrdfields">
            
                                                                    <i class="icon icon-edit-2">
            
                                                                    </i>
            
                                                                </a>
            
                                                                <a class="delete-cat" href="javascript:void(0)" onclick="delete_opt(id,this)">
            
                                                                    <i class="icon icon-delete-btn-user">
            
                                                                    </i>
            
                                                                </a>
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="clearfix">
            
                                                        </div>
            
                                                    </div>
            
                                                </li>
            
                                                <li class="all-cat added-description">
            
                                                    <div class="custom-list-box-onbrd">
            
                                                        <div class="cursor-sec cursor-repositioning-onbrd">
            
                                                            <div class="repositioning-icon-onbrd  ">
            
                                                                <div class="pull-left">
            
                                                                    <a class="panel-toggle" href="javascript:void(0);">
            
                                                                        <i class="icon icon-toggle arrow-up">
            
                                                                        </i>
            
                                                                    </a>
            
                                                                </div>
            
                                                                <div class="pull-left">
            
                                                                    <a class="panel-toggle" href="javascript:void(0);">
            
                                                                        <i class="icon icon-toggle arrow-down">
            
                                                                        </i>
            
                                                                    </a>
            
                                                                </div>
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="user-field-name-onbrd">Address</div>
            
                                                        <div class="user-field-type-onbrd">address box</div>
            
                                                        <div class="user-field-consumer-onbrd">
                                                            <!-- 2. Verification Details -->
                                                        </div>
            
                                                        <div class="user-field-action-onbrd">
            
                                                            <div class="row-action">
            
                                                                <a href="javascript:void(0);" class="btn-edit-onbrdfields">
            
                                                                    <i class="icon icon-edit-2">
            
                                                                    </i>
            
                                                                </a>
            
                                                                <a class="delete-cat" href="javascript:void(0)" onclick="delete_opt(id,this)">
            
                                                                    <i class="icon icon-delete-btn-user">
            
                                                                    </i>
            
                                                                </a>
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="clearfix">
            
                                                        </div>
            
                                                    </div>
            
                                                </li>
            
                                            </ul>
            
                                        </div>


                                    </div>
                                </div>
        
        `);

}

function editNameSteps(x) {
    var that = jQuery(x);
    var stepsName = that.parents("li").attr('steps-id');
    that.parents("body").find(`[aria-controls="` + stepsName + `"]`).addClass("step-name-edit");
    that.parents("body").find(`#` + stepsName).addClass("step-name-edit-tab");
    that.parents("li").find(".name-area .item-name").addClass("hide");
    that.parents("li").find(".name-area input").removeClass("hide");
    that.parents("li").find(".name-area input").val(that.parents("li").find(".name-area .item-name")
        .text());
    that.parents("li").find(".row-action #cat_edit").addClass("hide");
    that.parents("li").find(".row-action .delete-cat").addClass("hide");
    that.parents("li").find(".row-action .blue-btn").removeClass("hide");

}

function saveNameSteps(x) {
    var that = jQuery(x);
    var stepsName = that.parents("li").find(".name-area input").val();
    that.parents("body").find(`.step-name-edit`).attr("href", "#" + stepsName);
    that.parents("body").find(`.step-name-edit`).attr("aria-controls", stepsName);
    that.parents("body").find(`.step-name-edit`).text(stepsName);
    that.parents("body").find(`.step-name-edit`).removeClass('step-name-edit');
    that.parents("body").find(`.step-name-edit-tab`).attr("id", stepsName);
    that.parents("body").find(`.step-name-edit-tab`).removeClass('step-name-edit-tab');
    that.parents("li").find(".name-area .item-name").text(stepsName);
    that.parents("li").find(".name-area .item-name").removeClass("hide");
    that.parents("li").find(".name-area input").addClass("hide");
    that.parents("li").find(".row-action #cat_edit").removeClass("hide");
    that.parents("li").find(".row-action .delete-cat").removeClass("hide");
    that.parents("li").find(".row-action .blue-btn").addClass("hide");


}

function deleteSteps(x) {
    var that = jQuery(x);
    var stepsName = that.parents("li").find(".name-area .item-name").text();
    that.parents("body").find(`[aria-controls="` + stepsName + `"]`).parent("li").remove();
    that.parents("body").find(`#` + stepsName).remove();
    that.parents("li").remove();



}

function stepCloseMenu() {
    $('body').find(`.step-name-edit`).removeClass('step-name-edit');
    $("body").find(`.step-name-edit-tab`).removeClass('step-name-edit-tab');
    $('body').find(".name-area .item-name").removeClass("hide");
    $('body').find(".name-area input").addClass("hide");
    $('body').find(".row-action #cat_edit").removeClass("hide");
    $('body').find(".row-action .delete-cat").removeClass("hide");
    $('body').find(".row-action .blue-btn").addClass("hide");


}




jQuery(function() {
    jQuery(".sortable-list").sortable();


    jQuery('input[name="bannerimg_on_cat"]').change(function() {
        if (jQuery('input[name="bannerimg_on_cat"]:checked').val() == 'Yes') {
            jQuery('.addcategory-banner-area').show();
        } else {
            jQuery('.addcategory-banner-area').hide();
        }
    });
});
</script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
<script type="text/javascript" src="scripts/scripts3.js"></script>
<script type="text/javascript" src="scripts/seller.js"></script>
<script type="text/javascript" src="scripts/onboard_tabs.js"></script>

<!-- end footer -->