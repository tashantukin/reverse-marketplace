<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

$custom_code = $content['code'];

$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();

$url = $baseUrl . '/api/v2/users/';
$result = callAPI("GET", $admin_token['access_token'], $url, false);
$userId = $result['ID'];

$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", null, $url, false);

$url = $baseUrl . '/api/v2/admins/' . $userId . '/custom-field-definitions';
$result = callAPI("GET", $admin_token['access_token'], $url, false);
$custom_result = [];
foreach ($result['Records'] as $customfield) {

    if ($customfield['Code'] == $custom_code) {
        $custom_name =  $customfield['Name'];
        $custom_type = $customfield['DataInputType'];
        $custom_options = $custom_type == 'dropdown' || $custom_type == 'checkbox' ?  $customfield['Options'] : null;

        echo json_encode(['result' => array('Code' => $customfield['Code'], 'Name' => $custom_name, 'Type' => $custom_type, 'Options' => $custom_options)]);

        break;
    }
}
