<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

$action = $content['action'];
$custom_name = $content['custom_name'];
$type = $content['type'];
$options = $content['options'];
$refTable = $content['reference_table'];
$custom_code = $content['code'];
$classification = $content['classification'];
$custom_text = $content['text'];
$placeholder = $content['placeholder'];
$field_id = $content['field-id'];

$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();

$url = $baseUrl . '/api/v2/users/';
$result = callAPI("GET", $admin_token['access_token'], $url, false);
$userId = $result['ID'];

if ($type == 'number') {
    $data_field_type = 'decimal';
} else {
    $type !== 'checkbox' && $type !== 'dropdown' ?  $data_field_type = 'string' : $data_field_type = "list";
}


//save on freelance_form custom table

if ($action == 'add'){
    if ($refTable == 'Users') {

        $form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'text' => $custom_text, 'placeholder' => $placeholder, 'values' => $type !== 'textfield' || $type !== 'number' || $type !== 'search'? $options : null );
        $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_form/rows';
        $result =  callAPI("POST",$admin_token['access_token'], $url, $form_details);
        
        }else {
            $form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'text' => $custom_text, 'placeholder' => $placeholder,  'values' => $type !== 'textfield' || $type !== 'number' || $type !== 'search' ? $options : null );
        $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_form/rows';
        $result =  callAPI("POST",$admin_token['access_token'], $url, $form_details);
        }
}else {
    //edit
    if ($refTable == 'Users') {

        $form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'text' => $custom_text, 'placeholder' => $placeholder, 'values' => $type !== 'textfield' || $type !== 'number' || $type !== 'search'? $options : null );
        $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_form/rows/' . $field_id;
        $result =  callAPI("PUT",$admin_token['access_token'], $url, $form_details);
        
    }else {
        $form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'text' => $custom_text, 'placeholder' => $placeholder,  'values' => $type !== 'textfield' || $type !== 'number' || $type !== 'search' ? $options : null );
        $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_form/rows/' . $field_id;
        $result =  callAPI("PUT",$admin_token['access_token'], $url, $form_details);
    }

}



