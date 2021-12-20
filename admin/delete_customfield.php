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

$url = $baseUrl . '/api/v2/admins/' . $userId . '/custom-field-definitions/' . $custom_code;
$result = callAPI("DELETE", $admin_token['access_token'], $url, false);
echo json_encode(['result' => $result]);
