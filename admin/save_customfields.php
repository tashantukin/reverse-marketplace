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

// $data = array(
//     "Code" => $custom_code,
//     "Name" => $custom_name,
//     "IsMandatory" => true,
//     "SortOrder" => 0,
//     "DataInputType" => $type,
//     "DataRegex" => "string",
//     "MinValue" => 0,
//     "MaxValue" =>  0,
//     "ReferenceTable" => $refTable,
//     "DataFieldType" =>  $data_field_type,
//     "IsSearchable" => true,
//     "IsSensitive" => true,
//     "Active" => true,
//     "Options" =>
//     $type !== 'textfield' || $type !== 'number' ? $options : null

// );

// echo json_encode(['data' => $data]);

// if ($action != 'update') {
//     $url = $baseUrl . '/api/v2/admins/' . $userId . '/custom-field-definitions';
//     $result = callAPI("POST", $admin_token['access_token'], $url, $data);
//     echo json_encode(['result' => $result]);
// } else {
//     $url = $baseUrl . '/api/v2/admins/' . $userId . '/custom-field-definitions/' . $custom_code;
//     $result = callAPI("PUT", $admin_token['access_token'], $url, $data);
//     echo json_encode(['result' => $result]);
// }


//save on freelance_form custom table

if ($refTable == 'Users') {

$form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'values' => $type !== 'textfield' || $type !== 'number' ? $options : null );
$url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_form/rows';
$result =  callAPI("POST",$admin_token['access_token'], $url, $form_details);

}else {
    $form_details = array('name' => $custom_name, 'type_of_field' => $type, 'classification' => $classification, 'values' => $type !== 'textfield' || $type !== 'number' ? $options : null );
$url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_form/rows';
$result =  callAPI("POST",$admin_token['access_token'], $url, $form_details);
}

