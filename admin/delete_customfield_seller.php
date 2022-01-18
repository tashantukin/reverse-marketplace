<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);


$field_id = $content['code'];

$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();

$url = $baseUrl . '/api/v2/users/';
$result = callAPI("GET", $admin_token['access_token'], $url, false);
$userId = $result['ID'];


    //edit
    // if ($refTable == 'Users') {

    //     $form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'text' => $custom_text, 'placeholder' => $placeholder, 'values' => $type !== 'textfield' || $type !== 'number' || $type !== 'search'? $options : null );
    //     $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_form/rows';
    //     $result =  callAPI("POST",$admin_token['access_token'], $url, $form_details);
        
    // }else {
        //$form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'text' => $custom_text, 'placeholder' => $placeholder,  'values' => $type !== 'textfield' || $type !== 'number' || $type !== 'search' ? $options : null );
        $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_form/rows/' . $field_id;;
        $result =  callAPI("DELETE", $admin_token['access_token'], $url);
    // }

// }



