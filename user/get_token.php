<?php
include 'admin_token.php';
include 'callAPI.php';

$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();

$url = $baseUrl . '/api/v2/users/';
$result = callAPI("GET", $admin_token['access_token'], $url, false);
$admin_id = $result['ID'];


echo json_encode(['token' => $admin_token, 'id' => $admin_id]);

?>